/* eslint-disable quotes */
import services from '../services/serieServices';
import Util from '../helpers/utilities';
import temp from '../services/tempSerieService';
import jwt from '../helpers/jwt';
import vimeo from '../helpers/vimeo';

const util = new Util();

class serieController {
  static async create(req, res) {
    try {
      // get id for temp video
      const { id } = req.query;
      const tempVideo = await temp.getParticularVideo(id);
      const decoded = jwt.jwtVerify(tempVideo.uri, process.env.SECRET);
      // set details for vimeo upload
      const data = {
        size: tempVideo.size,
        videoUrl: decoded.uri

      };
      // get url after a successful upload to vimeo
      const url = await vimeo.viemoUpload(data);
      // patch serie object to fit suspensionSate and video url
      console.log(url);
      const createdSerie = await services.update(decoded.id, {
        suspensionState: false,
        episode: url
      });
      const deleted = await temp.deleteSeries(id);
      if (createdSerie && deleted) {
        util.setErrorResponse(res, 'Created successfully', 201);
      } else {
        util.setErrorResponse(res, 'Can\'t upload', 400);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getSingleEpisode(req, res) {
    try {
      const episode = await services.getSingleEpisode(req.query.id);
      if (!episode) util.setErrorResponse(res, `Can't find what you requested`, 400);
      util.setSuccessResponse(res, 'Retrieved successfully', 200, episode);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getSingleSeason(req, res) {
    try {
      const season = await services.getSingleSeason(req.query.videoId, req.query.s);
      if (!season) {
        util.setErrorResponse(res, `Can't find what you requested`, 400);
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
      if (!seasons) util.setErrorResponse(res, `Can't find what you requested`, 400);
      util.setSuccessResponse(res, 'Retrieved successfully', 200, seasons);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async updateSerie(req, res) {
    try {
      const updated = await services.update(req.body.id, req.body);
      if (!updated) util.setErrorResponse(res, `Can't updated what you requested`, 400);
      util.setSuccessResponse(res, 'Updated easily', 201, updated);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async delete(req, res) {
    try {
      const deleted = await services.deleteEpisode(req.body.id);
      if (!deleted) util.setErrorResponse(res, `Can't find what you requested`, 400);
      util.setSuccessResponse(res, `deleted easily`, 200, deleted);
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }
}
export default serieController;
