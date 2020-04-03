import services from '../services/serieServices';
import Util from '../helpers/utilities';
import temp from '../services/tempSerieService';
import jwt from '../helpers/jwt';
import cloudinary from '../helpers/cloudinary';
import { upload, getObject } from '../helpers/aws';

const util = new Util();

class serieController {
  static async create(req, res) {
    try {
      const { id } = req.query;
      const tempVideo = await temp.getParticularVideo(id);
      const decoded = jwt.jwtVerify(tempVideo.uri, process.env.SECRET);
      const url = await upload('series-cinetie', req.files.episode);
      const createdSerie = await services.update(decoded.id, {
        suspensionState: false,
        episode: url.data.Key
      });
      const deleted = await temp.deleteSeries(id);
      const publicId = decoded.uri.slice(59);
      const deletionStatusCloudinary = await cloudinary.destroy(publicId.split('.')[0], 'video');
      if (createdSerie && deleted && deletionStatusCloudinary) {
        util.setSuccessResponse(res, 'Created successfully', 201);
      } else {
        util.setErrorResponse(res, 'Can\'t upload', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getSingleEpisode(req, res) {
    try {
      const episode = await services.getSingleEpisode(req.query.ep);
      const uri = await getObject('series-cinetie', episode.episode, 20000);
      episode.episode = uri;
      if (!episode) util.setErrorResponse(res, 'Can\'t find what you requested', 400);
      util.setSuccessResponse(res, 'Retrieved successfully', 200, episode);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getSingleSeason(req, res) {
    try {
      const {
        id, s, limit, offset
      } = req.query;
      const season = await services.getSingleSeason(id, s, limit, offset);
      if (!season) {
        util.setErrorResponse(res, 'Can\'t find what you requested', 400);
      } else {
        util.setSuccessResponse(res, 'Retrieved successfully', 200, season);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getAllSeasons(req, res) {
    try {
      const seasons = await services.getAllSeasons(req.query.videoId);
      if (!seasons) util.setErrorResponse(res, 'Can\'t find what you requested', 400);
      util.setSuccessResponse(res, 'Retrieved successfully', 200, seasons);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async updateSerie(req, res) {
    try {
      const updated = await services.update(req.body.id, req.body);
      if (!updated) util.setErrorResponse(res, 'Can\'t updated what you requested', 400);
      util.setSuccessResponse(res, 'Updated easily', 201, updated);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await services.deleteEpisode(req.body.id);
      if (!deleted) util.setErrorResponse(res, 'Can\'t find what you requested', 400);
      util.setSuccessResponse(res, 'deleted easily', 200, deleted);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getVideosByClientId(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const { clientId } = jwt.jwtVerify(token, process.env.SECRET);
      const videos = await services.getEpisodesByClientId(clientId);
      if (Object.values(videos).length > 0) {
        util.setSuccessResponse(res, 'Sucess', 200, videos);
      } else {
        util.setErrorResponse(res, 'can\'t find matching episodes', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }
}
export default serieController;
