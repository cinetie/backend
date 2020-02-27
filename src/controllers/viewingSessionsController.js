/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
import viewingSessions from '../services/viewingSessionsServices';
import response from '../helpers/response';
import Util from '../helpers/utilities';

const util = new Util();
class viewingSessionController {
  static async getSpecificSessions(req, res) {
    try {
      const {
        videoId
      } = req.query;
      const raw = await viewingSessions.getSessionsPerVideo(videoId);
      const cities = [];
      for (let i = 0; i < raw.length; i++) {
        let count = 0;
        for (let j = 0; j < raw.length; j++) {
          var { location } = raw[i];
          if (raw[i].location == raw[j].location) {
            count += 1;
          }
        }
        const obj = {
          city: location,
          count
        };
        cities.push(obj);
      }
      const formattedArray = util.getUnique(cities, 'city');

      if (Object.values(raw).length > 0) {
        return response.successResponse(res, 200, 'Found details', { formattedData: formattedArray, totalCount: cities.length });
      }

      return response.errorResponse(res, 404, 'something went wrong', 'NotFoundError ');
    } catch (error) {
      return response.errorResponse(res, 503, 'something went wrong', 'ServerError');
    }
  }

  static async getAllSessionsPerUser(req, res) {
    try {
      const {
        userId
      } = req.query;
      const data = await viewingSessions.getSessionsPerUser(userId);
      if (data) {
        return response.successResponse(res, 200, 'Found Data', data);
      }
      return response.errorResponse(res, 404, 'Data was not found', 'NotFoundError');
    } catch (error) {
      return response.errorResponse(res, 404, 'Data was not found', 'NotFoundError');
    }
  }
}
export default viewingSessionController;
