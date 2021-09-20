/* eslint-disable no-useless-catch */
import sequelize from "sequelize";
import database from "../database/models";

class WatchedMovieservices {
  static async add(data) {
    try {
      const added = await database.WatchedVideo.create(data);
      if (added) {
        return added;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findWatchedTime(videoId, userId) {
    try {
      const added = await database.WatchedVideo.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          videoId,
          userId,
        },
      });
      if (added) {
        return added;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async update(watchedTime, id) {
    try {
      const updated = await database.WatchedVideo.update(
        { watchedTime },
        {
          returning: true,
          where: {
            id,
          },
        }
      );
      if (updated[1]) {
        return updated;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default WatchedMovieservices;
