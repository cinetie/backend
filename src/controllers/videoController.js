/* eslint-disable consistent-return */
/* eslint-disable quotes */
import fetch from 'node-fetch';
import response from '../helpers/response';
import videoService from '../services/videoServices';
import Util from '../helpers/utilities';
import axios from '../helpers/axios';
import jwt from '../helpers/jwt';
import vimeoHelper from '../helpers/vimeo';
import trailerServices from '../services/trailerService';
import tempService from '../services/tempVideoServices';

const util = new Util();
// const Vimeo = require('vimeo').Vimeo
class videoController {
  static async addVideo(req, res) {
    try {
      const tempVideo = await tempService.getParticularVideo(req.query.id);
      const decoded = jwt.jwtVerify(tempVideo.videoUri, process.env.SECRET);
      const data = decoded;
      data.videoUrl = decoded.videoUri;
      data.videoClientId = decoded.clientId;
      data.videoSuspensionState = false;
      data.size = decoded.size;
      const uri = await vimeoHelper.viemoUpload(data);
      if (!uri) {
        util.setErrorResponse(res, 'something went wrong while uploading', 503);
      } else {
        // console.log(uri);
        data.videoLink = uri;
        data.videoIdVimeo = uri.slice(8);
        const newVideo = await videoService.updateVideo(decoded.videoId, data);
        const deleted = await tempService.deleteVideos(req.query.id);
        if (!newVideo || !deleted) {
          util.setErrorResponse(res, 'something went wrong while uploading', 503);
        } else {
          util.setSuccessResponse(res, 'Video uploaded', 201, newVideo);
        }
      }
    } catch (error) {
      util.setErrorResponse(res, `Something went wrong : ${error.message}`, 503);
    }
  }

  static async deleteAvideo(req, res) {
    try {
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) response.errorResponse(res, 404, 'Video not found');
      const deletedVideo = await videoService.deleteVideo(req.query.id);
      return response.successResponse(res, 200, 'Video successfully deleted!', deletedVideo);
    } catch (error) {
      return response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }

  static async getParticularVideo(req, res) {
    try {
      const id = req.query.videoId;
      // eslint-disable-next-line quotes
      // eslint-disable-next-line no-undef
      const data = fetch(`https://api.vimeo.com/videos/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.error_code) {
            util.setErrorResponse(res, response.developer_message, 400);
          } else {
            util.setSuccessResponse(res, "Data", 200, response.uri);
          }
        });
    } catch (error) {
      return response.errorResponse(res, 500, `Something went wrong ${error}`, error);
    }
  }

  static async getAllVideo(req, res) {
    try {
      const headers = {
        Authorization: `Bearer${process.env.VIMEO_ACCESS_TOKEN}`
      };
      const data = await fetch(`https://api.vimeo.com/users/${process.env.VIMEO_USER_ID}/videos`, headers);
      const JsonData = await data.json();
      if (JsonData) {
        util.setSuccessResponse(res, 'Data found', 200, data);
      } else {
        util.setErrorResponse(res, 'Data not found', 404);
      }
    } catch (error) {
      return response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }

  static async getVideosByPopularity(req, res) {
    try {
      const { type } = req.query;
      const videos = await videoService.getPopularVideos(req.query.offset, req.query.limit, type);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, 'videos found', 200, videos);
      } else {
        util.setErrorResponse(res, 'Data not found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getVideosByTrend(req, res) {
    try {
      const { type } = req.query;
      const videos = await videoService.getTrendingVideos(req.query.offset, req.query.limit, type);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, 'videos found', 200, videos);
      } else {
        util.setErrorResponse(res, 'Data not found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getVideosByCategory(req, res) {
    try {
      const videos = await videoService.getVideosByCategory(req.query.q);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, `${req.query.q} videos found`, 200, videos);
      } else {
        util.setErrorResponse(res, 'Data not found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getAllVideoByUser(req, res) {
    try {
      const query = req.query.userId;
      const data = axios.get(`https://api.vimeo.com/videos/${query}`);
      if (Object.values(data).length > 0) util.setSuccessResponse(res, 'Data found', 200, data);
      util.setErrorResponse(res, 'Data not found', 404);
    } catch (error) {
      response.errorResponse(res, 500, 'Something went wrong', error);
    }
  }

  static async search(req, res) {
    try {
      const { q } = req.query;

      const videos = await videoService.search(q);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, 'Videos found', 200, videos);
      } else {
        util.setErrorResponse(res, 'Data not found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `somethin went wrong : ${error.message}`, 503);
    }
  }

  static async getAllVideosLocal(req, res) {
    const videos = await videoService.getAllVideosForAdmin();
    if (videos) {
      util.setSuccessResponse(res, 'Data found', 200, videos);
    } else {
      util.setErrorResponse(res, 'Data not found', 400);
    }
  }

  static async getMainFeaturedFilm(req, res) {
    try {
      const { type } = req.query;
      const video = await videoService.getMainFeaturedVideo(type);
      const trailer = await trailerServices.getAllTrailers(video[0].videoId);
      const data = {
        video,
        trailer: trailer[0].trailerLink
      };
      if (data) {
        util.setSuccessResponse(res, 'videos Found', 200, data);
      } else {
        util.setErrorResponse(res, 'Video can\'t be found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getSecondFeaturedFilm(req, res) {
    try {
      const { type } = req.query;
      const video = await videoService.getSecondFeaturedVideo(type);
      const trailer = await trailerServices.getAllTrailers(video[0].videoId);
      const data = {
        video,
        trailer: trailer[0].trailerLink
      };
      if (data) {
        util.setSuccessResponse(res, 'videos Found', 200, data);
      } else {
        util.setErrorResponse(res, 'Video can\'t be found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getAllNewVideos(req, res) {
    try {
      const video = await videoService.getNewVideos(req.query.limit, req.query.offset, req.query.type);
      if (video) {
        util.setSuccessResponse(res, 'videos Found', 200, video);
      } else {
        util.setErrorResponse(res, 'Video can\'t be found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getAllVideosByType(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const { type } = req.query;
      const { clientId } = jwt.jwtVerify(token, process.env.SECRET);
      const videos = await videoService.getVideosByType(clientId, type);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, 'Videos Found', 200, videos);
      } else {
        util.setErrorResponse(res, 'videos can\'t be found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getVideoById(req, res) {
    try {
      const video = await videoService.getVideoById(req.query.id);
      if (video) {
        util.setSuccessResponse(res, 'videos Found', 200, video);
      } else {
        util.setErrorResponse(res, 'Video can\'t be found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async updateVideos(req, res) {
    try {
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) response.errorResponse(res, 404, 'Video not updated');
      const toUpdate = req.body;
      const updated = await videoService.updateVideo(req.query.id, toUpdate);
      response.successResponse(res, 200, 'Video successfully updated!', updated);
    } catch (error) {
      response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }
}

export default videoController;
