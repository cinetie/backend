import viewingSessions from '../services/viewingSessionsServices';
import response from '../helpers/response';
import ipServices from '../helpers/iplocation';

class viewingSessions {

    static async createNewWatchCount(req, res, next) {
        try {
            const ip = req.headers['x-forwarded-for'];
            const data = req.body;
            data.sessionState = "Active"
            data.location = ipServices.getSendersIp(ip).country
            data.ip = ip;
            const status = await viewingSessions.getSesssionPerVideoUser(data.userId, data.videoId);
            if (status) {
                return next();
            } else {
                const data = await viewingSessions.registerViewingSessions(data);
                (data) ? next(): response.errorResponse(res, 400, "something went wrong", "Can't get location")
            }
        } catch (error) {
            throw error;
        }
    }
}
export default viewingSessions;
