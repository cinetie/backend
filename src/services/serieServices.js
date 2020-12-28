/* eslint-disable quotes */
import sequelize from 'sequelize';
import database from '../database/models';

const op = sequelize.Op;
class serieServices {
  static async createNewEpisode(newSerie) {
    try {
      const createdSerie = await database.series.create(newSerie);
      if (createdSerie) {
        return createdSerie;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSingleEpisode(id) {
    try {
      const episode = await database.series.findOne({
        where: { id }
      });
      if (episode) {
        return episode;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getEpisodesByClientId(clientId) {
    const episode = await database.series.findAll({
      where: { clientId }
    });
    if (episode) {
      return episode;
    }
    return null;
  }

  static async getSingleSeason(videoId, season, limit, offset) {
    try {
      const data = await database.series.findAll({
        limit: Number(limit),
        offset: Number(offset),
        where: {
          [op.and]: [
            { videoId },
            { season: Number(season) },
            { suspensionState: false }
          ]
        }
      });
      if (Object.values(data).length > 0) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSeasons(videoId) {
    try {
      const data = await database.series.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('season')), 'seasons']],
        where: { [op.and]: [{ videoId }, { suspensionState: false }] },
        order: [
          ['id', 'DESC']
        ],
        group: ['id', 'season']
      });
      if (Object.values(data).length > 0) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const updated = await database.series.update(updates, {
        where: { id }
      });
      if (updated) {
        return updated;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async deleteEpisode(id) {
    try {
      const deleted = await database.series.destroy({
        returning: true,
        where: { id }
      });
      if (deleted) {
        return deleted;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default serieServices;
