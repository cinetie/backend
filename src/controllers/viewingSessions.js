/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
import viewingSessions from "../services/viewingSessionsServices";
import response from "../helpers/response";
import Util from "../helpers/utilities";

const util = new Util();
class viewingSessionController {
  static async getSpecificSessions(req, res) {
    try {
      const viewsUpdate = [];
      const { videoId } = req.query;
      const views = await viewingSessions.getSessionsPerVideo(videoId);

      if (Object.values(views).length > 0) {
        // For Grouping Views by moths and year they created from

        for (let i = 0; i < views.length; i++) {
          const date = new Date(Number(views[i].dataValues.time));

          const dateFormat = new Intl.DateTimeFormat("nl-BE", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          });

          if (Number(views[i].dataValues.time)) {
            views[i].dataValues.time = dateFormat.format(date);
            viewsUpdate.push(views[i].dataValues);
          }
        }

        const resp = {};
        const fn = (year, month, o = resp, array = viewsUpdate) => {
          o[year][month] = {
            [month]: array.filter(({ time: d }) => {
              return (
                `${month}/${year}` === `${d.slice(0, 2)}/${d.slice(6, 10)}`
              );
            }),
          };
        };

        for (const { time } of viewsUpdate) {
          const [month, day, year] = time.match(/\d+/g);
          if (!resp[year]) resp[year] = {};

          fn(year, month);
        }

        for (var key in resp) {
          if (resp.hasOwnProperty(key)) {
            for (var key1 in resp[key]) {
              resp[key][key1].sum = 0;
              for (let i = 0; i < resp[key][key1][key1].length; i++) {
                resp[key][key1].sum++;
              }
            }
          }
        }

        for (var key in resp) {
          if (resp.hasOwnProperty(key)) {
            for (var key1 in resp[key]) {
              if (!resp[key].sumYear) {
                resp[key].sumYear = 0;
              }
              resp[key].sumYear += resp[key][key1].sum;
            }
          }
        }
        for (var key in resp) {
          if (!resp.sumTotal) {
            resp.sumTotal = 0;
          }
          if (resp.hasOwnProperty(key)) {
            resp.sumTotal += resp[key].sumYear;
          }
        }

        for (var key in resp) {
          if (resp.hasOwnProperty(key)) {
            for (var key1 in resp[key]) {
              delete resp[key][key1][key1];
            }
          }
        }

        const cities = [];
        for (let i = 0; i < views.length; i++) {
          let count = 0;
          for (let j = 0; j < views.length; j++) {
            var { location } = views[i];
            if (views[i].location == views[j].location) {
              count += 1;
            }
          }
          const obj = {
            city: location,
            views: count,
          };
          cities.push(obj);
        }
        const byCity = util.getUnique(cities, "city");
        return res.status(200).json({
          status: 200,
          message: "Found details",
          data: resp,
          city: byCity,
        });
      }
      return response.errorResponse(
        res,
        404,
        "something went wrong",
        "NotFoundError "
      );
    } catch (error) {
      return response.errorResponse(
        res,
        503,
        "something went wrong",
        "ServerError"
      );
    }
  }

  static async getAllSessionsPerUser(req, res) {
    try {
      const { userId } = req.query;
      const data = await viewingSessions.getSessionsPerUser(userId);
      if (data) {
        return response.successResponse(res, 200, "Found Data", data);
      }
      return response.errorResponse(
        res,
        404,
        "Data was not found",
        "NotFoundError"
      );
    } catch (error) {
      return response.errorResponse(
        res,
        404,
        "Data was not found",
        "NotFoundError"
      );
    }
  }
}
export default viewingSessionController;
