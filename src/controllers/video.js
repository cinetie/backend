/* eslint-disable max-len */
import response from '../helpers/response';
import videoService from '../services/videoServices';
import Util from '../helpers/utilities';
import jwt from '../helpers/jwt';
import trailerServices from '../services/trailerService';
import tempService from '../services/tempVideoServices';
import cloudinary from '../helpers/cloudinary';
import { upload, getObject } from '../helpers/aws';

const util = new Util();
class videoController {
  static async addVideo(req, res) {
    try {
      const tempVideo = await tempService.getParticularVideo(Number(req.query.id));
      const decoded = jwt.jwtVerify(tempVideo.videoUri, process.env.SECRET);
      const data = decoded;
      if (data.type === 'movie') {
        data.videoClientId = decoded.clientId;
        data.videoSuspensionState = false;
        data.size = decoded.size;
        const uri = await upload('movies-cinetie', req.files.video);
        if (!uri) {
          util.setErrorResponse(res, 'something went wrong while uploading', 503);
        } else {
          data.videoLink = uri.data.Key;
          data.videoIdVimeo = '0000';
          const updatedVideo = await videoService.updateVideo(decoded.videoId, data);
          const deleted = await tempService.deleteVideos(req.query.id);
          const publicId = decoded.videoUri.slice(60);
          console.log(publicId);
          const cloudinaryDeletionStatus = await cloudinary.destroy(publicId.split('.')[0], 'video');
          if (!updatedVideo || !deleted || !cloudinaryDeletionStatus) {
            util.setErrorResponse(res, 'something went wrong while approving video', 503);
          } else {
            util.setSuccessResponse(res, 'Video uploaded', 201, updatedVideo);
          }
        }
      } else {
        const deleted = await tempService.deleteVideos(req.query.id);
        const updatedVideo = await videoService.updateVideo(decoded.videoId, { videoSuspensionState: false, videoClientId: decoded.clientId });
        if (!updatedVideo || !deleted) {
          util.setErrorResponse(res, 'Something went wrong approving video', 503);
        } else {
          util.setSuccessResponse(res, 'Video approved', 201, updatedVideo);
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

  static async search(req, res) {
    try {
      const { q, offset } = req.query;
      const videos = await videoService.search(q, offset);
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
    if (Object.values(videos).length > 0) {
      util.setSuccessResponse(res, 'Data found', 200, videos);
    } else {
      util.setErrorResponse(res, 'Data not found', 404);
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
      if (video.type === 'serie') {
        util.setSuccessResponse(res, 'videos Found', 200, video);
      } else {
        const uri = await getObject('movies-cinetie', video.videoLink, 20000);
        video.videoLink = uri;
        if (uri) {
          util.setSuccessResponse(res, 'videos Found', 200, video);
        } else {
          util.setErrorResponse(res, 'Video can\'t be found', 404);
        }
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async updateVideos(req, res) {
    try {
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) {
        return response.errorResponse(res, 404, 'Video not updated');
      }
      const toUpdate = req.body;
      const updated = await videoService.updateVideo(req.query.id, toUpdate);
      return response.successResponse(res, 200, 'Video successfully updated!', updated);
    } catch (error) {
      response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }

  static async featureVideo(req, res) {
    try {
      const { featureType, isFeatured, type } = req.body;
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) {
        return response.errorResponse(res, 404, 'Video not updated');
      }
      const resetFeatured = await videoService.resetFeaturedVideo(featureType, isFeatured, type);
      // if (resetFeatured[0] === 0) {
      //   return response.errorResponse(res, 500, 'Something went wrong resetting featured ', undefined);
      // }
      const updated = await videoService.updateVideo(req.query.id, req.body);
      return response.successResponse(res, 200, 'Video successfully updated!', updated);
    } catch (error) {
      response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }
}

export default videoController;
