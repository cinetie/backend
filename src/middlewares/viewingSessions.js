/* eslint-disable consistent-return */
/* eslint-disable no-useless-catch */
import fetch from 'node-fetch';
import viewingSessions from '../services/viewingSessionsServices';
import videoService from '../services/videoServices';
import response from '../helpers/response';
import jwt from '../helpers/jwt';

class viewingSession {
  static async createNewWatchCount(req, res, next) {
    try {
      const { ip } = req.headers;
      const { id } = req.query;
      const videoId = id;
      const videoData = await videoService.getVideoById(videoId);
      const token = req.headers.authorization.slice(7);
      if (!ip || !videoId === null) return response.errorResponse(res, 400, 'Something went wrong', 'missingParameterError');
      if (!videoData) return response.errorResponse(res, 404, 'Can\'t find the video you\'re looking for', 'NotFoundError');
      const decoded = jwt.jwtVerify(token, process.env.SECRET);
      const data = req.body;
      data.sessionState = 'Active';
      data.userId = decoded.email;
      data.time = new Date().getTime();
      const locationServiceData = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IP_STACK_ACCESS_TOKEN}`);
      const JsonlocationData = await locationServiceData.json();
      // check if there is an exact session before same like the provided one
      const sessions = await viewingSessions.getSesssionPerVideoUser(decoded.email, videoId);
      if (Object.values(sessions).length >= 1) {
        next();
      } else {
        const results = await viewingSessions.registerViewingSessions({
          sessionState: 'Active',
          userId: decoded.email,
          time: new Date().getTime(),
          location: JsonlocationData.country_name,
          ip,
          clientId: videoData.videoClientId,
          videoId
        });
        const updates = await videoService.incrementWatchCountService(videoId);
        if (results && updates) {
          next();
        } else {
          return response.errorResponse(res, 400, 'something went wrong', 'Can\'t get location');
        }
      }
    } catch (error) {
      return response.errorResponse(res, 500, 'Something went wrong', error.message);
    }
  }
}
export default viewingSession;
