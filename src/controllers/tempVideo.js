/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import services from '../services/tempVideoServices';
import videoService from '../services/videoServices';
import cpService from '../services/cpServices';
import Helpers from '../helpers/utilities';
import uuid from '../helpers/uuid';
import jwt from '../helpers/jwt';
import { getSignedUrl, getObject } from '../helpers/aws';

const util = new Helpers();

class tempVideoController {
  static async createVideoController(req, res) {
    try {
      // get token
      const data = req.body;
      data.tallThumbNailLink = data.portrait;
      data.nameTagThumbNailLink = data.nameTag;
      data.videoThumbnailLink = data.landscape;
      // suspend video for verification
      data.videoSuspensionState = true;
      // generate video parameters
      data.creationTime = new Date().getTime();
      data.videoId = uuid.generator();
      data.clientId = req.headers.cpid;
      console.log(req.headers.cpid);
      data.type = req.body.type;
      if (data.type === 'movie') {
        data.videoUri = jwt.jwtSign({
          videoUri: data.video, size: data.size, clientId: req.headers.cpid, videoId: data.videoId, type: 'movie'
        }, process.env.SECRET);
        // register to both temp server and real server
        data.videoUrl = data.videoUri;
        const uploadedVideo = await services.createNewVideos(data);
        const newVideo = await videoService.createNewVideo(data);
        if (!uploadedVideo && newVideo) util.setErrorResponse(res, 'Video can\'t be saved', 401);
        util.setSuccessResponse(res, 'video uploaded successfully', 201, { status: 'upload success' });
      } else {
        // set to serie since this video represents an entire serie
        data.videoUri = jwt.jwtSign({
          videoUri: null, type: 'serie', videoId: data.videoId, clientId: req.headers.cpid
        }, process.env.SECRET);
        const uploadedVideo = await services.createNewVideos(data);
        const newVideo = await videoService.createNewVideo(data);
        if ((newVideo && uploadedVideo) === (null || undefined)) util.setErrorResponse(res, 'Video can\'t be saved', 401);
        util.setSuccessResponse(res, 'video uploaded successfully', 201, { status: 'upload success' });
      }
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
        util.setErrorResponse(res, 'No videos available', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }

  static async getParticularVideoController(req, res) {
    try {
      const videos = await services.getParticularVideo(req.query.id);
      if (!videos) {
        util.setErrorResponse(res, 'No video available', 404);
      } else {
        const decoded = jwt.jwtVerify(videos.videoUri, process.env.SECRET);
        const uri = await getObject('cinetie-temp-movies', decoded.videoUri, 60000);
        videos.videoUri = uri;
        if (uri) {
          util.setSuccessResponse(res, 'Video found', 200, videos);
        } else {
          util.setErrorResponse(res, 'No video available', 401);
        }
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 503);
    }
  }

  static async deleteParticularVideoController(req, res) {
    try {
      const video = await services.getParticularVideo(req.query.id);
      const videos = await services.deleteVideos(req.query.id);
      const decoded = jwt.jwtVerify(video.videoUri, process.env.SECRET);
      const deleteTitle = await videoService.deleteVideo(decoded.videoId);
      if (videos && deleteTitle) {
        util.setSuccessResponse(res, 'Video deleted', 200, { videos, deleteTitle });
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

  static async getSignedUrlTempVideos(req, res) {
    try {
      const { type, extension } = req.query;
      const portrait = await getSignedUrl('cinetie-thumbnails', 'image/*', 'jpg');
      const landscape = await getSignedUrl('cinetie-thumbnails', 'image/*', 'jpg');
      const nameTag = await getSignedUrl('cinetie-thumbnails', 'image/*', 'png');
      const video = (type === 'movie') ? await getSignedUrl('cinetie-temp-movies', 'video/*', extension) : null;
      util.setSuccessResponse(res, 'Temporary urls', 200, {
        portrait,
        landscape,
        nameTag,
        video
      });
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }
}
export default tempVideoController;
