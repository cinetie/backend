/* eslint-disable quotes */
import sequelize from "sequelize";
import database from "../database/models";

const op = sequelize.Op;
class serieServices {
  static async createNewEpisode(newSerie) {
    const createdSerie = await database.series.create(newSerie);
    if (createdSerie) {
      return createdSerie;
    }
    return null;
  }

  static async getSingleEpisode(id) {
    const episode = await database.series.findOne({
      where: { id },
    });
    if (episode) {
      return episode;
    }
    return null;
  }

  static async getEpisodesByClientId(clientId) {
    const episode = await database.series.findAll({
      where: { clientId },
    });
    if (episode) {
      return episode;
    }
    return null;
  }

  static async getSingleSeason(
    videoId,
    season,
    limit,
    offset,
    isDisabledAllowed = true
  ) {
    const searchData = {
      [op.and]: [
        { videoId },
        { season: Number(season) },
        { suspensionState: false },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }

    const data = await database.series.findAll({
      limit: Number(limit),
      offset: Number(offset),
      where: searchData,
      order: [["episodeNumber", "ASC"]],
    });
    if (Object.values(data).length > 0) {
      return data;
    }
    return null;
  }

  static async getAllSeasons(videoId, isDisabledAllowed = true) {
    const searchData = { [op.and]: [{ videoId }, { suspensionState: false }] };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const data = await database.series.findAll({
      attributes: [[sequelize.fn("max", sequelize.col("season")), "seasons"]],
      where: searchData,
      order: [["id", "DESC"]],
      group: ["id", "season"],
    });
    if (Object.values(data).length > 0) {
      return data;
    }
    return null;
  }

  static async update(id, updates) {
    const updated = await database.series.update(updates, {
      where: { id },
    });
    if (updated) {
      return updated;
    }
    return null;
  }

  static async deleteEpisode(id) {
    const deleted = await database.series.destroy({
      returning: true,
      where: { id },
    });
    if (deleted) {
      return deleted;
    }
    return null;
  }
}

export default serieServices;
