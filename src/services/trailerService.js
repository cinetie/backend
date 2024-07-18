/* eslint-disable no-useless-catch */
import database from "../database/models";

class trailerServices {
  static async createNewTrailers(data) {
    try {
      const newTrailer = await database.trailers.create(data);
      if (newTrailer) {
        return newTrailer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getParticularTrailer(id) {
    try {
      const video = await database.trailers.findOne({
        where: { id },
      });
      if (video) {
        return video;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTrailers(videoId) {
    try {
      const videos = await database.trailers.findAll({
        where: { videoId },
      });
      if (videos) {
        return videos;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTrailers(id) {
    try {
      const result = await database.trailers.destroy({
        returning: true,
        where: { id },
      });
      if (result) {
        return result;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async updateTrailers(id, data) {
    try {
      const result = await database.trailers.update(data, {
        where: { id },
      });
      if (result) {
        return result;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
export default trailerServices;
