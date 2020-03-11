import { v2 as cloudinary } from 'cloudinary';
import helpers from '../helpers/utilities';
import services from '../services/tempSerieService';
import jwt from '../helpers/jwt';
import cloudinaryHelper from '../helpers/cloudinary';
import series from '../services/serieServices';
import videoServices from '../services/videoServices';

const util = new helpers();

class tempSerieController {
  static async createSerie(req, res) {
    try {
      const data = req.body;
      const thumb = await cloudinaryHelper.upload(req.files.thumb.tempFilePath, 'image');
      cloudinary.uploader.upload(req.files.video.tempFilePath, {
        overwrite: true,
        resource_type: 'video'
      }, async (err, result) => {
        data.size *= 1e+6;
        data.thumbNailUrl = thumb.url;
        const newserie = await series.createNewEpisode(data);
        data.uri = jwt.jwtSign({ uri: result.url, id: newserie.id }, process.env.SECRET);
        const tempVideo = await services.createNewSeries(data);
        if (!tempVideo || !newserie) {
          util.setErrorResponse(res, 'Can\'t upload tv serie', 422);
        } else {
          util.setSuccessResponse(res, 'Successfully uploaded', 201, newserie);
        }
      });
    } catch (error) {
      util.setErrorResponse(res, `Something wrong happened ${error.message}`, 500);
    }
  }

  static async getAllSeries(req, res) {
    try {
      const episodes = await services.getAllSeries();
      if (episodes) {
        for (let i = 0; i < Object.values(episodes).length; i++) {
          const video = await videoServices.getVideoById(episodes[i].videoId);
          const decoded = jwt.jwtVerify(episodes[i].uri, process.env.SECRET);

          if (video) {
            episodes[i].videoId = video.videoName;
          } else {
            episodes[i].videoId = 'default';
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
