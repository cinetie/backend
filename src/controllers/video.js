 
 
 
import fetch from "node-fetch";
import { config } from "dotenv";
import response from "../helpers/response";
import Util from "../helpers/utilities";
import jwt from "../helpers/jwt";
import trailerServices from "../services/trailerService";
import tempService from "../services/tempVideoServices";
import watchedMovieServices from "../services/watchedMovieServices";
import { getObject, deleteObject, copyObjects } from "../helpers/aws";
import { getAttachedThumbsMultiple } from "../helpers/video";
import videoService from "../services/videoServices";
import serieService from "../services/serieServices";
import viewingSessions from "../services/viewingSessionsServices";
import userService from "../services/userServices";
import { set, get } from "../helpers/redis";

config();

const util = new Util();
class Video {
  static async addVideo(req, res) {
    try {
      const tempVideo = await tempService.getParticularVideo(
        Number(req.query.id)
      );
      const decoded = jwt.jwtVerify(tempVideo.videoUri, process.env.SECRET);
      const data = decoded;
      if (data.type === "movie") {
        data.videoClientId = decoded.clientId;
        data.videoSuspensionState = false;
        data.size = decoded.size;
        const copyFile = await copyObjects(
          process.env.TEMP_BUCKET_MOVIE,
          process.env.PERMANENT_BUCKET_MOVIE,
          decoded.videoUri
        );
        if (!copyFile) {
          util.setErrorResponse(
            res,
            "something went wrong while uploading",
            503
          );
        } else {
          // copy back the same key from the temp bucket
          // delete the object in temp
          data.videoClientId = decoded.clientId;
          data.videoKey = decoded.videoUri;
          data.videoIdVimeo = "0000";
          const updatedVideo = await videoService.updateVideo(
            decoded.videoId,
            data
          );
          const deleted = await tempService.deleteVideos(req.query.id);
          const deleteAWS = await deleteObject(
            process.env.TEMP_BUCKET_MOVIE,
            decoded.videoUri
          );
          if (!updatedVideo[0] || !deleted || !deleteAWS) {
            util.setErrorResponse(
              res,
              "something went wrong while approving video",
              503
            );
          } else {
            util.setSuccessResponse(res, "Video uploaded", 201, updatedVideo);
          }
        }
      } else {
        const deleted = await tempService.deleteVideos(req.query.id);
        const updatedVideo = await videoService.updateVideo(decoded.videoId, {
          videoSuspensionState: false,
          videoClientId: decoded.clientId,
        });
        if (!updatedVideo[0] || !deleted) {
          util.setErrorResponse(
            res,
            "Something went wrong approving video",
            503
          );
        } else {
          util.setSuccessResponse(res, "Video approved", 201, updatedVideo);
        }
      }
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something went wrong : ${error.message}`,
        500
      );
    }
  }

  static async deleteAvideo(req, res) {
    try {
      const returned = await videoService.getVideoById(req.query.id);
      if (returned) {
        const deletedVideo = await videoService.deleteVideo(req.query.id);
        if (returned.videoLink) {
          const results = await deleteObject(
            process.env.PERMANENT_BUCKET_MOVIE,
            returned.videoLink
          );
          if (deletedVideo || Object.values(results).length === 0) {
            return response.successResponse(
              res,
              200,
              "Video successfully deleted!",
              deletedVideo
            );
          }
          return response.errorResponse(
            res,
            500,
            "Video could not be deleted",
            "SERVER_ERROR"
          );
        }
        if (deletedVideo) {
          return response.successResponse(
            res,
            200,
            "Video successfully deleted!",
            deletedVideo
          );
        }
        return response.errorResponse(
          res,
          500,
          "Video could not be deleted",
          "SERVER_ERROR"
        );
      }
      return response.errorResponse(
        res,
        400,
        "Video was not found or access to it was denied",
        "BAD_REQUEST"
      );
    } catch (error) {
      return response.errorResponse(
        res,
        500,
        "Something went wrong",
        error.message
      );
    }
  }

  static async getVideosByPopularity(req, res) {
    try {
      const { type, offset, limit } = req.query;
      const { country } = req.headers;
      console.log(`pop-${type}-${country}-${offset}-${limit}`);
      const cachedVideos = await get(
        `pop-${type}-${country}-${offset}-${limit}`
      );
      if (cachedVideos) {
        return util.setSuccessResponse(res, "videos found", 200, cachedVideos);
      }
      const videos = await videoService.getPopularVideos(
        offset,
        limit,
        type,
        country
      );
      getAttachedThumbsMultiple(videos);

      if (Object.values(videos).length > 0) {
        await set(`pop-${type}-${country}-${offset}-${limit}`, videos);
        return util.setSuccessResponse(res, "videos found", 200, videos);
      }
      return util.setErrorResponse(res, "Data not found", 404);
    } catch (error) {
      return util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getVideosByTrend(req, res) {
    try {
      const { type, offset, limit } = req.query;
      const { country } = req.headers;
      const cached = await get(`trend-${type}-${country}-${offset}-${limit}`);
      if (cached) {
        return util.setSuccessResponse(res, "videos found", 200, cached);
      }
      const videos = await videoService.getTrendingVideos(
        req.query.offset,
        req.query.limit,
        type,
        country
      );
      getAttachedThumbsMultiple(videos);

      if (Object.values(videos).length > 0) {
        await set(`trend-${type}-${country}-${offset}-${limit}`, videos);
        return util.setSuccessResponse(res, "videos found", 200, videos);
      }
      return util.setErrorResponse(res, "Data not found", 404);
    } catch (error) {
      return util.setErrorResponse(res, error.message, 500);
    }
  }

  static async getVideosByCategory(req, res) {
    try {
      const { country } = req.headers;
      const { q } = req.query;
      const cached = await get(`cat-${q}-${country}`);
      if (cached) {
        return util.setSuccessResponse(
          res,
          `${req.query.q} videos found`,
          200,
          cached
        );
      }
      const videos = await videoService.getVideosByCategory(
        req.query.q,
        country
      );
      getAttachedThumbsMultiple(videos);
      if (Object.values(videos).length > 0) {
        await set(`cat-${q}-${country}`);
        return util.setSuccessResponse(
          res,
          `${req.query.q} videos found`,
          200,
          videos
        );
      }
      return util.setErrorResponse(res, "Data not found", 404);
    } catch (error) {
      return util.setErrorResponse(res, error.message, 500);
    }
  }

  static async search(req, res) {
    try {
      const { q, offset } = req.query;
      const { country } = req.headers;
      const cached = await get(`search-${q}-${country}-${offset}`);
      if (cached) {
        util.setSuccessResponse(res, "Videos found", 200, cached);
      }
      const videos = await videoService.search(q, offset, country);
      getAttachedThumbsMultiple(videos);
      console.log(videos);
      if (Object.values(videos).length > 0) {
        await set(`search-${q}-${country}-${offset}`);
        util.setSuccessResponse(res, "Videos found", 200, videos);
      } else {
        util.setErrorResponse(res, "Data not found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `somethin went wrong : ${error.message}`, 503);
    }
  }

  static async getAllVideosLocal(req, res) {
    const videos = await videoService.getAllVideosForAdmin();
    getAttachedThumbsMultiple(videos);
    if (Object.values(videos).length > 0) {
      util.setSuccessResponse(res, "Data found", 200, videos);
    } else {
      util.setErrorResponse(res, "Data not found", 404);
    }
  }

  static getAttachedThumbsMultiple(videos) {
    for (let i = 0; i < videos.length; i++) {
      videos[i].videoThumbnailLink = Video.attachThumbnails(
        videos[i].videoThumbnailLink,
        process.env.THUMBNAIL_BUCKET
      );
      videos[i].tallThumbNailLink = Video.attachThumbnails(
        videos[i].tallThumbNailLink,
        process.env.THUMBNAIL_BUCKET
      );
      videos[i].nameTagThumbNailLink = Video.attachThumbnails(
        videos[i].nameTagThumbNailLink,
        process.env.THUMBNAIL_BUCKET
      );
    }
  }

  static async getMainFeaturedFilm(req, res) {
    try {
      const { type } = req.query;
      const video = await videoService.getMainFeaturedVideo(type);
      if (!video.length) {
        return util.setErrorResponse(res, "Video can't be found", 404);
      }
      getAttachedThumbsMultiple(video);
      const trailer = await trailerServices.getAllTrailers(video[0].videoId);
      if (trailer.length > 0) {
        const data = {
          video,
          trailer: Video.attachThumbnails(
            trailer[0].trailerLink,
            process.env.TRAILERS_BUCKET
          ),
        };
        util.setSuccessResponse(res, "Video Found", 200, data);
      } else {
        util.setErrorResponse(res, "Video can't be found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getSecondFeaturedFilm(req, res) {
    try {
      const { type } = req.query;
      const video = await videoService.getSecondFeaturedVideo(type);
      if (!video.length) {
        return util.setErrorResponse(res, "Video can't be found", 404);
      }
      getAttachedThumbsMultiple(video);
      const trailer = await trailerServices.getAllTrailers(video[0].videoId);
      if (!trailer[0])
        return util.setErrorResponse(res, "Video can't be found", 404);
      const data = {
        video,
        trailer: Video.attachThumbnails(
          trailer[0].trailerLink,
          process.env.TRAILERS_BUCKET
        ),
      };
      if (data) {
        util.setSuccessResponse(res, "videos Found", 200, data);
      } else {
        util.setErrorResponse(res, "Video can't be found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getAllNewVideos(req, res) {
    try {
      const videos = await videoService.getNewVideos(
        req.query.limit,
        req.query.offset,
        req.query.type
      );
      getAttachedThumbsMultiple(videos);
      if (Object.values(videos).length >= 1) {
        util.setSuccessResponse(res, "videos Found", 200, videos);
      } else {
        util.setErrorResponse(res, "Video can't be found", 404);
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
      getAttachedThumbsMultiple(videos);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, "Videos Found", 200, videos);
      } else {
        util.setErrorResponse(res, "videos can't be found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async getVideoById(req, res) {
    try {
      const video = await videoService.getVideoById(req.query.id);
      if (video) {
        if (video.EnSubt) {
          video.EnSubt = await getObject(
            process.env.SUBTITLE_BUCKET,
            video.EnSubt,
            20
          );
        }
        if (video.FrSubt) {
          video.FrSubt = await getObject(
            process.env.SUBTITLE_BUCKET,
            video.FrSubt,
            20
          );
        }
        util.setSuccessResponse(res, "videos Found", 200, video);
      } else {
        util.setErrorResponse(res, "Video can't be found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

  static async SharableVideo(req, res) {
    try {
      const video = await videoService.getVideoById(req.params.id);
      if (video) {
        video.videoLink = "";
        video.videoKey = "";
        util.setSuccessResponse(res, "videos Found", 200, video);
      } else {
        util.setErrorResponse(res, "Video can't be found", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something went wrong ${error.message}`, 503);
    }
  }

   
  static async updateVideos(req, res) {
    try {
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) {
        return response.errorResponse(res, 404, "Video not updated");
      }
      const toUpdate = req.body;
      const updated = await videoService.updateVideo(req.query.id, toUpdate);
      return response.successResponse(
        res,
        200,
        "Video successfully updated!",
        updated
      );
    } catch (error) {
      response.errorResponse(res, 500, "Something went wrong", error.message);
    }
  }

   
  static async featureVideo(req, res) {
    try {
      const { featureType, isFeatured, type } = req.body;
      const returned = await videoService.getVideoById(req.query.id);
      if (!returned) {
        return response.errorResponse(res, 404, "Video not updated");
      }
      const resetFeatured = await videoService.resetFeaturedVideo(
        featureType,
        isFeatured,
        type
      );
      if (resetFeatured[0] === 0) {
        return response.errorResponse(
          res,
          500,
          "Something went wrong resetting featured ",
          undefined
        );
      }
      const updated = await videoService.updateVideo(req.query.id, req.body);
      return response.successResponse(
        res,
        200,
        "Video successfully updated!",
        updated
      );
    } catch (error) {
      response.errorResponse(res, 500, "Something went wrong", error.message);
    }
  }

  static attachThumbnails(key, bucket) {
    try {
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
      throw error;
    }
  }

   
  static async createNewWatchCount(req, res) {
    try {
      const { ip } = req.headers;
      const { id } = req.query;
      const videoId = id;
      const videoData = await videoService.getVideoById(videoId);
      const token = req.headers.authorization.slice(7);
      if (!ip || !videoId === null) {
        return response.errorResponse(
          res,
          400,
          "Something went wrong",
          "missingParameterError"
        );
      }
      if (!videoData) {
        return response.errorResponse(
          res,
          404,
          "Can't find the video you're looking for",
          "NotFoundError"
        );
      }
      const decoded = jwt.jwtVerify(token, process.env.SECRET);

      const data = req.body;
      data.sessionState = "Active";
      data.userId = decoded.email;
      data.time = new Date().getTime();
      const locationServiceData = await fetch(
        `http://api.ipstack.com/${ip}?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`
      );
      const JsonlocationData = await locationServiceData.json();
      // check if there is an exact session before same like the provided one
      const sessions = await viewingSessions.getSesssionPerVideoUser(
        decoded.email,
        videoId
      );
      const user = await userService.getUserByMail(decoded.email);
      if (Object.values(sessions).length >= 1 || user.isOnTrial === true) {
        util.setErrorResponse(
          res,
          "user already watched video or trial is still active",
          400
        );
      } else {
        const results = await viewingSessions.registerViewingSessions({
          sessionState: "Active",
          userId: decoded.email,
          time: new Date().getTime(),
          location: JsonlocationData.country_name,
          ip,
          clientId: videoData.videoClientId,
          videoId,
        });
        const updates = await videoService.incrementWatchCountService(videoId);
        if (results && updates) {
          util.setSuccessResponse(res, "Registered the watch session", 201, {
            status: "done",
          });
        } else {
          return response.errorResponse(
            res,
            400,
            "something went wrong",
            "Can't get location"
          );
        }
      }
    } catch (error) {
      return response.errorResponse(
        res,
        500,
        "Something went wrong",
        error.message
      );
    }
  }

  static async saveWatchedTime(req, res) {
    try {
      const { type, watchedTime, episodeId } = req.body;
      const { id } = req.fullUser;
      const { videoId } = req.query;
      if (!episodeId && type === "serie") {
        return util.setErrorResponse(
          res,
          "episodeId is required to save an episode",
          400
        );
      }
      if (episodeId && type === "serie") {
        const episode = await serieService.getSingleEpisode(episodeId);
        if (!episode) {
          return util.setErrorResponse(res, "episode not found", 404);
        }
      }
      const video = await videoService.getVideoById(videoId);
      if (!video) {
        return util.setErrorResponse(res, "video not found", 404);
      }
      const watchedTimeEntry = await watchedMovieServices.findWatchedTime(
        videoId,
        id
      );
      let episodeWatchedTimeEntry;
      if (type === "serie") {
        episodeWatchedTimeEntry = await watchedMovieServices.findWatchedTime(
          episodeId,
          id
        );
      }
      let result;
      if (!watchedTimeEntry) {
        result = await watchedMovieServices.add({
          videoId,
          type,
          watchedTime,
          userId: id,
        });
        if (type === "serie") {
          await watchedMovieServices.add({
            videoId: episodeId,
            type: "episode",
            watchedTime,
            userId: id,
          });
        }
      } else {
        result = await watchedMovieServices.update(
          watchedTime,
          watchedTimeEntry.id
        );
        if (episodeWatchedTimeEntry && type === "serie") {
          await watchedMovieServices.update(
            watchedTime,
            episodeWatchedTimeEntry.id
          );
        } else {
          await watchedMovieServices.add({
            videoId: episodeId,
            type: "episode",
            watchedTime,
            userId: id,
          });
        }
      }
      util.setSuccessResponse(res, "time saved successfully", 201, {
        status: "done",
      });
    } catch (error) {
      return response.errorResponse(
        res,
        500,
        "Something went wrong",
        error.message
      );
    }
  }

  static async getWatchedTime(req, res) {
    try {
      const { id } = req.fullUser;
      const { videoId } = req.query;
      const result = await watchedMovieServices.findWatchedTime(videoId, id);
      if (!result) {
        return util.setErrorResponse(
          res,
          "The video has not been watched yet",
          404
        );
      }
      util.setSuccessResponse(
        res,
        "watch session retrieved successfully",
        200,
        result
      );
    } catch (error) {
      return response.errorResponse(
        res,
        500,
        "Something went wrong",
        error.message
      );
    }
  }
}

export default Video;
