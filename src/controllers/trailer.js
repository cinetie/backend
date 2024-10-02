 
 
import { config } from "dotenv";
import Util from "../helpers/utilities";
import { deleteObject, getSignedUrl, getObject } from "../helpers/aws";
import trailerServices from "../services/trailerService";

config();

const util = new Util();

class Trailers {
  static async createNewTrailer(req, res) {
    try {
      const data = req.body;
      data.trailerLink = data.trailer;
      const uploadedTrailer = await trailerServices.createNewTrailers(data);
      if (!uploadedTrailer)
        util.setErrorResponse(res, "An error occured during file upload", 422);
      util.setSuccessResponse(
        res,
        "successfully saved the trailer",
        201,
        uploadedTrailer
      );
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something wrong happened${error.message}`,
        500
      );
    }
  }

  static async getAllTrailersPerVideo(req, res) {
    try {
      const { id } = req.query;
      const trailers = await trailerServices.getAllTrailers(id);
      for (let i = 0; i < trailers.length; i++) {
         
        trailers[i].trailerLink = Trailers.attachThumbnails(
          trailers[i].trailerLink,
          process.env.TRAILERS_BUCKET
        );
      }
      if (Object.values(trailers).length > 0) {
        util.setSuccessResponse(res, "Found", 200, trailers);
      } else {
        util.setErrorResponse(res, "No trailers found", 404);
      }
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something wrong happened${error.message}`,
        500
      );
    }
  }

  static async getAllTrailerController(req, res) {
    try {
      const trailers = await trailerServices.getAllTrailers();
      for (let i = 0; i < trailers.length; i++) {
        trailers[i].trailerLink = Trailers.attachThumbnails(
          trailers[i].trailerLink,
          process.env.TRAILERS_BUCKET
        );
      }
      if (trailers) {
        util.setSuccessResponse(res, "Found", 200, trailers);
      } else {
        util.setErrorResponse(res, "No trailers available", 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async getParticularTrailerController(req, res) {
    try {
      const trailers = await trailerServices.getAllTrailers(req.query.videoId);
      for (let i = 0; i < trailers.length; i++) {
        trailers[i].trailerLink = Trailers.attachThumbnails(
          trailers[i].trailerLink,
          process.env.TRAILERS_BUCKET
        );
      }
      if (trailers) {
        util.setSuccessResponse(res, "Found", 200, trailers);
      } else {
        util.setErrorResponse(res, "No trailer available", 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async deleteParticularTrailerController(req, res) {
    try {
      const trailer = await trailerServices.getParticularTrailer(req.query.id);
      const deleteTrailer = await deleteObject(
        process.env.TRAILERS_BUCKET,
        trailer.trailerLink
      );
      const trailers = await trailerServices.deleteTrailers(req.query.id);
      if (trailers && !deleteTrailer.$response.error) {
        util.setSuccessResponse(res, "Trailer deleted", 200, trailers);
      } else {
        util.setErrorResponse(res, "No trailer found", 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async updateParticularTrailerController(req, res) {
    try {
      const trailers = await trailerServices.updateTrailers(
        req.query.id,
        req.body
      );
      if (trailers) {
        util.setSuccessResponse(res, "Trailer updated", 201, trailers);
      } else {
        util.setErrorResponse(res, "No trailer found", 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static attachThumbnails(key, bucket) {
    try {
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
      throw error;
    }
  }

   
  static async getTrailerUploadLink(req, res) {
    try {
      const url = await getSignedUrl(
        process.env.TRAILERS_BUCKET,
        "video/*",
        req.query.extension
      );
      if (!url) {
        util.setErrorResponse(res, "Something went wrong", 400);
      } else {
        util.setSuccessResponse(res, "Upload link created", 201, url);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }
}

export default Trailers;
