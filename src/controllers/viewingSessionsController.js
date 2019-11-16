import viewingSessions from '../services/viewingSessionsServices';
import response from '../helpers/response';

class viewingSessionController {

    static async getSpecificSessions(req, res) {
        const {
            videoId
        } = req.query;
        const data = await viewingSessions.getSessionsPerVideo(videoId);
        if (data) {
            return response.successResponse(res, 200, "Found details", data)
        } else {

            return response.errorResponse(res, 404, "something went wrong", "Not Found");
        }
    }
}
export default viewingSessionController;