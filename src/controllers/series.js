 
import { config } from "dotenv";
import services from "../services/serieServices";
import Util from "../helpers/utilities";
import temp from "../services/tempSerieService";
import jwt from "../helpers/jwt";
import { deleteObject, copyObjects } from "../helpers/aws";

config();

const util = new Util();

class Episodes {
  static async create(req, res) {
    try {
      const { id } = req.query;
      const tempVideo = await temp.getParticularVideo(id);
      if (!tempVideo) {
        return util.setErrorResponse(res, "Serie not found", 404);
      }
      const decoded = jwt.jwtVerify(tempVideo.uri, process.env.SECRET);
      await copyObjects(
        process.env.TEMP_BUCKET_SERIES,
        process.env.PERMANENT_BUCKET_SERIES,
        decoded.uri
      );
      const createdSerie = await services.update(decoded.id, {
        suspensionState: false,
        episodeKey: decoded.uri,
      });
      const deleted = await temp.deleteSeries(id);
      const deletionStatus = await deleteObject(
        process.env.TEMP_BUCKET_SERIES,
        decoded.uri
      );
      if (createdSerie && deleted && deletionStatus) {
        return util.setSuccessResponse(res, "Created successfully", 201);
      }
      return util.setErrorResponse(res, "Can't upload", 400);
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something happened ${error.message}`,
        500
      );
    }
  }

  static async getSingleEpisode(req, res) {
    try {
      const episode = await services.getSingleEpisode(req.query.ep);
      if (!episode) {
        return util.setErrorResponse(res, "Can't find what you requested", 400);
      }
      return util.setSuccessResponse(
        res,
        "Retrieved successfully",
        200,
        episode
      );
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something happened ${error.message}`,
        500
      );
    }
  }

  static async getSingleSeason(req, res) {
    try {
      const { id, s, limit, offset } = req.query;
      const episodes = await services.getSingleSeason(id, s, limit, offset);
      if (!episodes) {
        util.setErrorResponse(res, "Can't find what you requested", 400);
      } else {
        for (let i = 0; i < episodes.length; i++) {
          episodes[i].thumbNailUrl = Episodes.attachThumbnails(
            episodes[i].thumbNailUrl,
            process.env.THUMBNAIL_BUCKET
          );
        }
        util.setSuccessResponse(res, "Retrieved successfully", 200, episodes);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async getAllSeasons(req, res) {
    try {
      const seasons = await services.getAllSeasons(req.query.videoId);
      if (!seasons) {
        util.setErrorResponse(res, "Can't find what you requested", 400);
      } else {
        util.setSuccessResponse(res, "Retrieved successfully", 200, seasons[0]);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something happened ${error.message}`, 500);
    }
  }

  static async updateSerie(req, res) {
    try {
      const updated = await services.update(req.body.id, req.body);
      if (!updated[0])
        return util.setErrorResponse(
          res,
          "Can't updated what you requested",
          400
        );
      return util.setSuccessResponse(res, "Updated easily", 201, updated);
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something happened ${error.message}`,
        500
      );
    }
  }

  static async delete(req, res) {
    try {
      const videoFile = await services.getSingleEpisode(req.params.id);
      if (!videoFile)
        return util.setErrorResponse(res, "Can't find what you requested", 400);
      const results =
        videoFile.episode !== null
          ? await deleteObject(
              process.env.TEMP_BUCKET_SERIES,
              videoFile.episode
            )
          : await deleteObject(
              process.env.TEMP_BUCKET_SERIES,
              videoFile.episodeKey
            );
      const deleted = await services.deleteEpisode(req.params.id);
      if (deleted && Object.values(results).length === 0) {
        return util.setSuccessResponse(res, "deleted easily", 200, deleted);
      }
      return util.setErrorResponse(res, "Can't find what you requested", 400);
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something happened ${error.message}`,
        500
      );
    }
  }

  static async deleteTemp(req, res) {
    try {
      const tempEpisode = await temp.getParticularVideo(req.params.id);
      if (!tempEpisode)
        return util.setErrorResponse(res, "Can't find what you requested", 400);
      const decodeUri = jwt.jwtVerify(tempEpisode.uri, process.env.SECRET);
      const videoFile = await services.getSingleEpisode(decodeUri.id);
      if (!videoFile)
        return util.setErrorResponse(res, "Can't find what you requested", 400);
      const results =
        videoFile.episode !== null
          ? await deleteObject(process.env.TEMP_BUCKET_SERIES, decodeUri.uri)
          : await deleteObject(process.env.TEMP_BUCKET_SERIES, decodeUri.uri);
      const deleted = await services.deleteEpisode(decodeUri.id);
      const tempDelete = await temp.deleteSeries(req.params.id);
      if (deleted && tempDelete && Object.values(results).length === 0) {
        return util.setSuccessResponse(res, "deleted easily", 200, deleted);
      }
      return util.setErrorResponse(res, "Can't find what you requested", 400);
    } catch (error) {
      console.log(error);
      return util.setErrorResponse(
        res,
        `Something happened ${error.message}`,
        500
      );
    }
  }

  static async getVideosByClientId(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const { clientId } = jwt.jwtVerify(token, process.env.SECRET);
      const episodes = await services.getEpisodesByClientId(clientId);
      if (!(episodes.length > 0))
        return util.setErrorResponse(res, "can't find matching episodes", 400);
      for (let i = 0; i < episodes.length; i++) {
        episodes[i].thumbNailUrl = Episodes.attachThumbnails(
          episodes[i].thumbNailUrl,
          process.env.THUMBNAIL_BUCKET
        );
      }
      return util.setSuccessResponse(res, "Sucess", 200, episodes);
    } catch (error) {
      return util.setErrorResponse(
        res,
        `Something happened ${error.message}`,
        500
      );
    }
  }

  static attachThumbnails(key, bucket) {
    return `https://${bucket}.s3.eu-west-1.amazonaws.com/${key}`;
  }
}
export default Episodes;
