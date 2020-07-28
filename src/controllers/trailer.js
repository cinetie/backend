/* eslint-disable no-plusplus */
/* eslint-disable quotes */
import Util from '../helpers/utilities';
import { deleteObject, getSignedUrl } from '../helpers/aws';
import trailerServices from '../services/trailerService';

const util = new Util();

class Trailers {
  static async createNewTrailer(req, res) {
    try {
      const data = req.body;
      data.trailerLink = data.trailer;
      const uploadedTrailer = await trailerServices.createNewTrailers(data);
      if (!uploadedTrailer) util.setErrorResponse(res, 'An error occured during file upload', 422);
      util.setSuccessResponse(res, 'successfully saved the trailer', 201, uploadedTrailer);
    } catch (error) {
      util.setErrorResponse(res, `Something wrong happened${error.message}`, 500);
    }
  }

  static async getAllTrailersPerVideo(req, res) {
    try {
      const { id } = req.query;
      const trailers = await trailerServices.getAllTrailers(id);
      for (let i = 0; i < trailers.length; i++) {
        trailers[i].trailerLink = Trailers.attachThumbnails(trailers[i].trailerLink, 'cinetie-trailers');
      }
      if (Object.values(trailers).length > 0) {
        util.setSuccessResponse(res, 'Found', 200, trailers);
      } else {
        util.setErrorResponse(res, 'No trailers found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `Something wrong happened${error.message}`, 500);
    }
  }

  static async getAllTrailerController(req, res) {
    try {
      const trailers = await trailerServices.getAllTrailers();
      for (let i = 0; i < trailers.length; i++) {
        trailers[i].trailerLink = Trailers.attachThumbnails(trailers[i].trailerLink, 'cinetie-trailers');
      }
      if (trailers) {
        util.setSuccessResponse(res, 'Found', 200, trailers);
      } else {
        util.setErrorResponse(res, 'No trailers available', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async getParticularTrailerController(req, res) {
    try {
      const trailers = await trailerServices.getAllTrailers(req.query.videoId);
      for (let i = 0; i < trailers.length; i++) {
        trailers[i].trailerLink = Trailers.attachThumbnails(trailers[i].trailerLink, 'cinetie-trailers');
      }
      if (trailers) {
        util.setSuccessResponse(res, 'Found', 200, trailers);
      } else {
        util.setErrorResponse(res, 'No trailer available', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async deleteParticularTrailerController(req, res) {
    try {
      const trailer = await trailerServices.getParticularTrailer(req.query.id);
      const deleteTrailer = await deleteObject('cinetie-trailers', trailer.trailerLink);
      const trailers = await trailerServices.deleteTrailers(req.query.id);
      if (trailers && !deleteTrailer.$response.error) {
        util.setSuccessResponse(res, 'Trailer deleted', 200, trailers);
      } else {
        util.setErrorResponse(res, 'No trailer found', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async updateParticularTrailerController(req, res) {
    try {
      const trailers = await trailerServices.updateTrailers(req.query.id, req.body);
      if (trailers) {
        util.setSuccessResponse(res, 'Trailer updated', 201, trailers);
      } else {
        util.setErrorResponse(res, 'No trailer found', 401);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
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
  static async getTrailerUploadLink(req, res) {
    try {
      const url = await getSignedUrl('cinetie-trailers', 'video/*', req.query.extension);
      if (!url) {
        util.setErrorResponse(res, 'Something went wrong', 400);
      } else {
        util.setSuccessResponse(res, 'Upload link created', 201, url);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }
}

export default Trailers;
