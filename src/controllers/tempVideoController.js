/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { v2 as cloudinary } from 'cloudinary';
import helpers from '../helpers/utilities';
import services from '../services/tempVideoServices';
import uuid from '../helpers/uuid';
import jwt from '../helpers/jwt';
import cloudinaryHelper from '../helpers/cloudinary';
// import google from '../helpers/google.cloud.normal'
import videoService from '../services/videoServices';
import cpService from '../services/cpServices';

const util = new helpers();

class tempVideoController {
  static async createVideoController(req, res) {
    try {
      console.log('started');
      // get token
      const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      const data = req.body;
      // register thumbnails
      const smallThumbnail = await cloudinaryHelper.upload(req.files.small.tempFilePath, 'image');
      const nameTagThumbNail = await cloudinaryHelper.upload(req.files.nameTag.tempFilePath, 'image');
      const tallThumbNail = await cloudinaryHelper.upload(req.files.tall.tempFilePath, 'image');
      data.tallThumbNailLink = tallThumbNail.url;
      data.nameTagThumbNailLink = nameTagThumbNail.url;
      data.videoThumbnailLink = smallThumbnail.url;
      // suspend video for verification
      data.videoSuspensionState = true;
      // generate video parameters
      data.creationTime = new Date().getTime();
      data.videoId = uuid.generator();
      const file = req.files.video;
      cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: 'video',
        overwrite: true
      }, async (err, result) => {
        // upload video to temp server i.e cloudinary
        // hash video url
        const size = data.size * 1e+6;
        data.videoUri = jwt.jwtSign({
          videoUri: result.url, size, clientId: decoded.clientId, videoId: data.videoId
        }, process.env.SECRET);
        // register to both temp server and real server
        data.videoUrl = data.videoUri;
        data.clientId = decoded.clientId;
        const uploadedVideo = await services.createNewVideos(data);
        const newVideo = await videoService.createNewVideo(data);
        if (!uploadedVideo && newVideo) util.setErrorResponse(res, 'Video can\'t be saved', 401);
        util.setSuccessResponse(res, 'video uploaded successfully', 201, { status: 'upload success' });
      });
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }

  static async getAllVideosController(req, res) {
    try {
      const videos = await services.getAllVideos();
      for (let i = 0; i < Object.values(videos).length; i++) {
        const cp = await cpService.getCpByClientId(videos[i].clientId);
        if (cp) {
          videos[i].clientId = cp.name;
        } else {
          videos[i].clientId = 'default';
        }
        const decoded = jwt.jwtVerify(videos[i].videoUri, process.env.SECRET);
        videos[i].videoUri = decoded.videoUri;
      }
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, 'Videos found', 200, videos);
      } else {
        util.setErrorResponse(res, 'No videos available', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }

  static async getParticularVideoController(req, res) {
    try {
      const videos = await services.getParticularVideo(req.query.id);
      const decoded = jwt.jwtVerify(videos.videoUri, process.env.SECRET);
      videos.videoUri = decoded.videoUri;
      if (videos) {
        util.setSuccessResponse(res, 'Video found', 200, videos);
      } else {
        util.setErrorResponse(res, 'No video available', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }

  static async deleteParticularVideoController(req, res) {
    try {
      const videos = await services.deleteVideos(req.query.id);
      if (videos) {
        util.setSuccessResponse(res, 'Video deleted', 200, videos);
      } else {
        util.setErrorResponse(res, 'No video found', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }

  static async updateParticularVideoController(req, res) {
    try {
      const videos = await services.updateVideos(req.query.id, req.body);
      if (videos) {
        util.setSuccessResponse(res, 'Video updated', 200, videos);
      } else {
        util.setErrorResponse(res, 'No video found', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }
}
export default tempVideoController;
