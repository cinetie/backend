/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { config } from 'dotenv';
import Helpers from '../helpers/utilities';
import services from '../services/tempSerieService';
import jwt from '../helpers/jwt';
import { getSignedUrl, getObject } from '../helpers/aws';
import series from '../services/serieServices';
import videoServices from '../services/videoServices';

config()

const util = new Helpers();

class tempSerieController {
  static async createSerie(req, res) {
    try {
      const data = req.body;
      data.clientId = req.headers.cpid;
      // data.size = req.files.video.size;
      data.thumbNailUrl = req.body.thumb;
      data.EnSubt = req.body.EnSubt;
      data.FrSubt = req.body.FrSubt;
      const newserie = await series.createNewEpisode(data);
      data.uri = jwt.jwtSign({ uri: data.video, id: newserie.id }, process.env.SECRET);
      const tempVideo = await services.createNewSeries(data);
      if (!tempVideo || !newserie) {
        util.setErrorResponse(res, 'Can\'t upload tv serie', 422);
      } else {
        util.setSuccessResponse(res, 'Successfully uploaded', 201, tempVideo);
      }
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
          const episode = await series.getSingleEpisode(decoded.id);
          if (video) {
            episodes[i].videoId = `${video.videoName} S${episode.season}E${episode.episodeNumber}`;
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

  static async getSignedUrlTempSeries(req, res) {
    try {
      const { extension } = req.query;
      const thumb = await getSignedUrl(process.env.THUMBNAIL_BUCKET, 'image/*', 'jpg');
      const video = await getSignedUrl(process.env.TEMP_BUCKET_SERIES, 'video/*', extension);
      const EnSubt = await getSignedUrl(process.env.SUBTITLE_BUCKET, 'text/plain', 'srt');
      const FrSubt = await getSignedUrl(process.env.SUBTITLE_BUCKET, 'text/plain', 'srt');
      util.setSuccessResponse(res, 'Temporary urls', 200, {
        thumb,
        video,
        EnSubt,
        FrSubt,
      });
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }

  static async generateSignedUrl(req, res) {
    try {
      const episode = await services.getParticularVideo(req.query.id);
      if (episode) {
        const decoded = jwt.jwtVerify(episode.uri, process.env.SECRET);
        episode.uri = await getObject(process.env.TEMP_BUCKET_SERIES, decoded.uri, 6000);
        util.setSuccessResponse(res, 'Episode found', 200, episode);
      } else {
        util.setErrorResponse(res, 'Can not find that episode', 404);
      }
    } catch (error) {
      util.setErrorResponse(res, `something happened ${error.message}`, 500);
    }
  }
}
export default tempSerieController;
