/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import fetch from 'node-fetch';
import response from '../helpers/response';
import Util from '../helpers/utilities';
import jwt from '../helpers/jwt';
import trailerServices from '../services/trailerService';
import tempService from '../services/tempVideoServices';
import { getObject, deleteObject, copyObjects } from '../helpers/aws';
import videoService from '../services/videoServices';
import viewingSessions from '../services/viewingSessionsServices';
import userService from '../services/userServices';

const util = new Util();
class Video {
  static async addVideo(req, res) {
    try {
      const tempVideo = await tempService.getParticularVideo(Number(req.query.id));
      const decoded = jwt.jwtVerify(tempVideo.videoUri, process.env.SECRET);
      const data = decoded;
      if (data.type === 'movie') {
        data.videoClientId = decoded.clientId;
        data.videoSuspensionState = false;
        data.size = decoded.size;
        const copyFile = await copyObjects('cinetie-temp-movies', 'movies-cinetie', decoded.videoUri);
        if (!copyFile) {
          util.setErrorResponse(res, 'something went wrong while uploading', 503);
        } else {
          // copy back the same key from the temp bucket
          // delete the object in temp
          data.videoLink = decoded.videoUri;
          data.videoIdVimeo = '0000';
          const updatedVideo = await videoService.updateVideo(decoded.videoId, data);
          const deleted = await tempService.deleteVideos(req.query.id);
          const deleteAWS = await deleteObject('cinetie-temp-movies', decoded.videoUri);
          if (!updatedVideo || !deleted || !deleteAWS) {
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
      if (returned && returned.videoClientId === req.user) {
        const deletedVideo = await videoService.deleteVideo(req.query.id);
        if (returned.videoLink) {
          const results = await deleteObject('movies-cinetie', returned.videoLink);
          if (deletedVideo || Object.values(results).length === 0) {
            return response.successResponse(res, 200, 'Video successfully deleted!', deletedVideo);
          }
          return response.errorResponse(res, 500, 'Video could not be deleted', 'SERVER_ERROR');
        }
        if (deletedVideo) {
          return response.successResponse(res, 200, 'Video successfully deleted!', deletedVideo);
        }
        return response.errorResponse(res, 500, 'Video could not be deleted', 'SERVER_ERROR');
      }
      return response.errorResponse(res, 400, 'Video was not found or access to it was denied', 'BAD_REQUEST');
    } catch (error) {
      return response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }

  static async getVideosByPopularity(req, res) {
    try {
      const { type } = req.query;
      const { country } = req.headers;
      const videos = await videoService.getPopularVideos(req.query.offset, req.query.limit, type, country);
      Video.getAttachedThumbsMultiple(videos);

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
      Video.getAttachedThumbsMultiple(videos);

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
      Video.getAttachedThumbsMultiple(videos);
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
      Video.getAttachedThumbsMultiple(videos);

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
    Video.getAttachedThumbsMultiple(videos);
    if (Object.values(videos).length > 0) {
      util.setSuccessResponse(res, 'Data found', 200, videos);
    } else {
      util.setErrorResponse(res, 'Data not found', 404);
    }
  }

  static getAttachedThumbsMultiple(videos) {
    for (let i = 0; i < videos.length; i++) {
      videos[i].videoThumbnailLink = Video.attachThumbnails(videos[i].videoThumbnailLink, 'cinetie-thumbnails');
      videos[i].tallThumbNailLink = Video.attachThumbnails(videos[i].tallThumbNailLink, 'cinetie-thumbnails');
      videos[i].nameTagThumbNailLink = Video.attachThumbnails(videos[i].nameTagThumbNailLink, 'cinetie-thumbnails');
    }
  }

  static async getMainFeaturedFilm(req, res) {
    try {
      const { type } = req.query;
      const video = await videoService.getMainFeaturedVideo(type);
      Video.getAttachedThumbsMultiple(video);
      const trailer = await trailerServices.getAllTrailers(video[0].videoId);
      if (trailer.length > 0) {
        const data = {
          video,
          trailer: Video.attachThumbnails(trailer[0].trailerLink, 'cinetie-trailers')
        };
        util.setSuccessResponse(res, 'Video Found', 200, data);
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
      Video.getAttachedThumbsMultiple(video);
      const trailer = await trailerServices.getAllTrailers(video[0].videoId);
      const data = {
        video,
        trailer: Video.attachThumbnails(trailer[0].trailerLink, 'cinetie-trailers')
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

  static getAttachedThumbs(video) {
    video.videoThumbnailLink = Video.attachThumbnails(video[0].videoThumbnailLink, 'cinetie-thumbnails');
    video.tallThumbNailLink = Video.attachThumbnails(video[0].tallThumbNailLink, 'cinetie-thumbnails');
    video.nameTagThumbNailLink = Video.attachThumbnails(video[0].nameTagThumbNailLink, 'cinetie-thumbnails');
  }

  static async getAllNewVideos(req, res) {
    try {
      const videos = await videoService.getNewVideos(req.query.limit, req.query.offset, req.query.type);
      Video.getAttachedThumbsMultiple(videos);
      if (Object.values(videos).length >= 1) {
        util.setSuccessResponse(res, 'videos Found', 200, videos);
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
      Video.getAttachedThumbsMultiple(videos);
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

  // eslint-disable-next-line consistent-return
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

  // eslint-disable-next-line consistent-return
  static async featureVideo(req, res) {
    try {
      const { featureType, isFeatured, type } = req.body;
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) {
        return response.errorResponse(res, 404, 'Video not updated');
      }
      const resetFeatured = await videoService.resetFeaturedVideo(featureType, isFeatured, type);
      if (resetFeatured[0] === 0) {
        return response.errorResponse(res, 500, 'Something went wrong resetting featured ', undefined);
      }
      const updated = await videoService.updateVideo(req.query.id, req.body);
      return response.successResponse(res, 200, 'Video successfully updated!', updated);
    } catch (error) {
      response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }

  static attachThumbnails(key, bucket) {
    try {
      return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line consistent-return
  static async createNewWatchCount(req, res) {
    try {
      const { ip } = req.headers;
      const { id } = req.query;
      const videoId = id;
      const videoData = await videoService.getVideoById(videoId);
      const token = req.headers.authorization.slice(7);
      if (!ip || !videoId === null) return response.errorResponse(res, 400, 'Something went wrong', 'missingParameterError');
      if (!videoData) return response.errorResponse(res, 404, 'Can\'t find the video you\'re looking for', 'NotFoundError');
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const data = req.body;
      data.sessionState = 'Active';
      data.userId = decoded.email;
      data.time = new Date().getTime();
      const locationServiceData = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`);
      const JsonlocationData = await locationServiceData.json();
      // check if there is an exact session before same like the provided one
      const sessions = await viewingSessions.getSesssionPerVideoUser(decoded.email, videoId);
      const user = await userService.getUserByMail(decoded.email);
      if (Object.values(sessions).length >= 1 || user.isOnTrial === true) {
        util.setErrorResponse(res, 'user already watched video or trial is still active', 400);
      } else {
        const results = await viewingSessions.registerViewingSessions({
          sessionState: 'Active',
          userId: decoded.email,
          time: new Date().getTime(),
          location: JsonlocationData.country_name,
          ip,
          clientId: videoData.videoClientId,
          videoId
        });
        const updates = await videoService.incrementWatchCountService(videoId);
        if (results && updates) {
          util.setSuccessResponse(res, 'Registered the watch session', 201, { status: 'done' });
        } else {
          return response.errorResponse(res, 400, 'something went wrong', 'Can\'t get location');
        }
      }
    } catch (error) {
      return response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }
}

export default Video;
