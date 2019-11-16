import response from '../helpers/response';
import videoService from '../services/videoServices';
import Util from '../helpers/utilities';
import uuid from '../helpers/uuid';
import jwt from '../helpers/jwt';

const util = new Util();
class videoController {
    static async addVideo(req, res) {
        try {
            // const authToken = req.query.authToken;
            // const data = jwt.jwtVerify(authToken,process.env.SECRET);
            req.body.videoId = uuid.generator();
            const addedVideo = await videoService.createNewVideo(req.body);
            (addedVideo) ? response.successResponse(res, 201, "Video added", addedVideo): response.errorResponse(res, 400, "Something  went wrong can't update video", "Video upload error");

        } catch (error) {
            util.setErrorResponse(res, 'Something went wrong : ' + error, 503);
        }
    }

    static async deleteAvideo(req, res) {
        try {
            const returned = await videoService.getVideoById(req.query.id);
            if (!returned) response.errorResponse(res, 404, 'Video not found');
            const deletedVideo = await videoService.deleteVideo(req.params.id);
            response.successResponse(res, 200, 'Video successfully deleted!', deletedVideo);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async getParticularVideo(req, res) {
        try {
            const returned = await videoService.getVideoById(req.query.id);
            if (!returned) response.errorResponse(res, 404, 'Video not found');
            response.successResponse(res, 200, 'Video successfully retrieved!', returned);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async getAllVideo(req, res) {
        try {
            const returned = await videoService.getAllVideos();
            response.successResponse(res, 200, 'Videos successfully retrieved!', returned);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async updateVideos(req, res) {
        try {
            const returned = await videoService.getVideoById(req.query.id);
            if (!returned) response.errorResponse(res, 404, 'Video not found');
            const toUpdate = req.body;
            const updated = await videoService.updateVideo(req.query.id, toUpdate);
            response.successResponse(res, 200, 'Video successfully updated!', updated[1][0]);
        } catch (error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }
}

export default videoController;