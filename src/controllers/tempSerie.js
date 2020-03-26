/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { v2 as cloudinary } from 'cloudinary';
import Helpers from '../helpers/utilities';
import services from '../services/tempSerieService';
import jwt from '../helpers/jwt';
import cloudinaryHelper from '../helpers/cloudinary';
import series from '../services/serieServices';
import videoServices from '../services/videoServices';

const util = new Helpers();

class tempSerieController {
  static async createSerie(req, res) {
    try {
      const token = req.headers.authorization.slice(7);
      const { clientId } = jwt.jwtVerify(token, process.env.SECRET);
      console.log(clientId);
      const data = req.body;
      const decoded = jwt.jwtVerify(req.headers.authorization.slice(7), process.env.SECRET);
      data.clientId = decoded.clientId;
      const thumb = await cloudinaryHelper.upload(req.files.thumb.tempFilePath, 'image');
      cloudinary.uploader.upload(req.files.video.tempFilePath, {
        overwrite: true,
        resource_type: 'video'
      }, async (err, result) => {
        data.size = req.files.video.size;
        data.thumbNailUrl = thumb.url;
        const newserie = await series.createNewEpisode(data);
        data.uri = jwt.jwtSign({ uri: result.url, id: newserie.id }, process.env.SECRET);
        const tempVideo = await services.createNewSeries(data);
        if (!tempVideo || !newserie) {
          util.setErrorResponse(res, 'Can\'t upload tv serie', 422);
        } else {
          util.setSuccessResponse(res, 'Successfully uploaded', 201, tempVideo);
        }
      });
    } catch (error) {
      util.setErrorResponse(res, `Something wrong happened ${error.message}`, 500);
    }
  }

  static async getAllSeries(req, res) {
    try {
      const episodes = await services.getAllSeries();
      if (Object.values(episodes).length > 0) {
        for (let i = 0; i < Object.values(episodes).length; i++) {
          const video = await videoServices.getVideoById(episodes[i].videoId);
          const decoded = jwt.jwtVerify(episodes[i].uri, process.env.SECRET);

          if (video !== (null || undefined)) {
            episodes[i].videoId = video.videoName;
            episodes[i].videoClientId = video.videoClientId;
          } else {
            episodes[i].videoName = 'default';
          }
          episodes[i].uri = decoded.uri;
        }
        util.setSuccessResponse(res, 'Data found', 200, episodes);
      } else {
        util.setErrorResponse(res, 'Data Not Found', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `Someting went wrong ${error.message}`, 500);
    }
  }
}
export default tempSerieController;
