/* eslint-disable eqeqeq */
/* eslint-disable vars-on-top */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
import earningService from "../services/earningServices";
import videoService from "../services/videoServices";
import Util from "../helpers/utilities";
import JWT from "../helpers/jwt";
import cry from "../helpers/crypto";
import { getAttachedThumbsMultiple } from "../helpers/video";

const util = new Util();

class adminController {
  static async getEarningsPerClient(req, res) {
    try {
      let sum = 0;
      const { clientId } = req.query;
      const data = await earningService.getEarningsByClientId(clientId);
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          const date = new Date(Number(data[i].monthYear));
          data[i].monthYear = `${date
            .toDateString()
            .slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(data[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          for (let j = 0; j < data.length; j++) {
            var { monthYear } = data[i];
            if (data[i].monthYear == data[j].monthYear) {
              count += Number(data[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: monthYear,
          };
          formattedData.push(obj);
        }
        // remove duplicates
        const uniqueValues = util.getUnique(formattedData, "monthYear");
        return util.setSuccessResponse(res, "Earnings found ", 200, {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues,
        });
      }
      util.setErrorResponse(res, "Data not found", 404);
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async getVideosPerCp(req, res) {
    const { clientId } = req.query;
    const videos = await videoService.getAllVideos(clientId);
    if (!videos) return util.setErrorResponse(res, "videos not found", 400);
    for (let i = 0; i < Object.values(videos).length; i++) {
      const date = new Date(Number(videos[i].creationTime));
      videos[i].creationTime = `${date.toDateString()}`;
    }
    getAttachedThumbsMultiple(videos);
    util.setSuccessResponse(res, "videos found", 200, videos);
  }

  static async getAllVideos(req, res) {
    const videos = await videoService.getAllVideosForAdmin();
    if (!videos) return util.setErrorResponse(res, "videos not found", 400);
    for (let i = 0; i < Object.values(videos).length; i++) {
      const date = new Date(Number(videos[i].creationTime));
      videos[i].creationTime = `${date.toDateString()}`;
    }
    return util.setSuccessResponse(res, "videos found", 200, videos);
  }

  static async getAllEarningsPerVideo(req, res) {
    try {
      let sum = 0;
      const data = await earningService.getEarningsByVideo(req.query.videoId);
      if (Object.values(data).length > 0) {
        for (let i = 0; i < Object.values(data).length; i++) {
          const date = new Date(Number(data[i].monthYear));
          data[i].monthYear = `${date
            .toDateString()
            .slice(4, 7)}/${date.getFullYear()}`;
          sum += Number(data[i].amount);
        }
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
          let count = 0;
          for (let j = 0; j < data.length; j++) {
            var { monthYear } = data[i];
            if (data[i].monthYear == data[j].monthYear) {
              count += Number(data[j].amount);
            }
          }
          const obj = {
            amount: Number(count.toFixed(2)),
            period: monthYear,
          };
          formattedData.push(obj);
        }
        // remove duplicates
        const uniqueValues = util.getUnique(formattedData, "monthYear");
        return util.setSuccessResponse(res, "Earnings found ", 200, {
          sum: Number(sum.toFixed(2)),
          data: uniqueValues,
        });
      }
      util.setErrorResponse(res, "Data not found", 404);
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }

  static async gainAccess(req, res) {
    try {
      const { email, clientId } = req.body;
      const token = JWT.jwtSign(
        { key: cry.crypto(), email, clientId },
        process.env.SECRET,
        "1d"
      );
      if (!token)
        return util.setErrorResponse(res, "something went wrong", 400);
      util.setSuccessResponse(res, "Token generated", 200, token);
    } catch (error) {
      util.setErrorResponse(
        res,
        `Something Went wrong logging in ${error}`,
        500
      );
    }
  }
}

export default adminController;
