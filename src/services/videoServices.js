import sequelize, { Sequelize } from "sequelize";
import database from "../database/models";
import date from "../helpers/date";
import resCountry from "../helpers/resCountry";

const op = sequelize.Op;

// will be changed to adapt a very good search algorithm
// videos are also called movies
class videoService {
  static async getVideoById(videoId, isDisabledAllowed = true) {
    const searchData = {
      videoId,
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const video = await database.videos.findOne({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      where: searchData,
    });
    if (video) {
      return video;
    }
    return null;
  }

  static async getNewVideos(
    limitValue,
    offsetValue,
    type,
    country,
    isDisabledAllowed = true
  ) {
    const searchData = {
      [op.and]: [
        {
          type,
          videoSuspensionState: "0",
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const videos = await database.videos.findAll({
      offset: Number(offsetValue),
      limit: Number(limitValue),
      where: searchData,
      order: [["creationTime", "DESC"]],
    });
    if (videos) {
      const results = resCountry(videos, country);
      return results;
    }
    return null;
  }

  static async getVideosByType(clientId, type, isDisabledAllowed = true) {
    const searchData = {
      [op.and]: [
        {
          type,
          videoClientId: clientId,
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const videos = await database.videos.findAll({
      where: searchData,
    });
    if (videos) {
      return videos;
    }
    return null;
  }

  static async getTrendingVideos(
    offsetValue,
    limit,
    type,
    country,
    isDisabledAllowed = true
  ) {
    const searchData = {
      [op.and]: [
        {
          videoWatchCount: {
            [op.gte]: process.env.TRENDING_WATCH_COUNT,
          },
          creationTime: {
            [op.gte]: date.removeDays(365),
          },
          type,
          videoSuspensionState: "0",
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const videos = await database.videos.findAll({
      offset: Number(offsetValue),
      limit: Number(limit),
      where: searchData,
    });
    if (videos) {
      const results = resCountry(videos, country);
      return results;
    }
    return null;
  }

  static async search(query, offset, country, isDisabledAllowed = true) {
    const searchData = {
      [op.and]: [
        {
          [op.col]: Sequelize.where(
            Sequelize.fn("lower", Sequelize.col("videoName")),
            {
              [op.like]: `%${query}%`,
            }
          ),
          videoSuspensionState: "0",
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }

    const data = await database.videos.findAll({
      order: [["id", "DESC"]],
      offset: Number(offset),
      limit: 20,
      where: searchData,
    });
    if (data) {
      const results = resCountry(data, country);
      return results;
    }
    return null;
  }

  static async incrementWatchCountService(videoId) {
    const data = await database.videos.increment("videoWatchCount", {
      where: {
        videoId,
      },
    });
    if (data) {
      return data;
    }
    return null;
  }

  static async getPopularVideos(
    offSetValue,
    limitValue,
    type,
    country,
    isDisabledAllowed = true
  ) {
    const searchData = {
      [op.and]: [
        {
          videoWatchCount: {
            [op.gte]: process.env.TRENDING_WATCH_COUNT,
          },
          type,
          videoSuspensionState: "0",
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const data = await database.videos.findAll({
      offset: Number(offSetValue),
      limit: Number(limitValue),
      where: searchData,
    });

    if (data) {
      const results = resCountry(data, country);
      return results;
    }
    return null;
  }

  static async getVideosByCategory(
    category,
    country,
    isDisabledAllowed = true
  ) {
    const searchData = {
      category,
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const data = await database.videos.findAll({
      where: searchData,
    });
    if (data) {
      const results = resCountry(data, country);
      return results;
    }
    return null;
  }

  static async createNewVideo(video) {
    return database.videos.create(video);
  }

  static async updateVideo(videoId, newVideo) {
    return database.videos.update(newVideo, {
      where: {
        videoId,
      },
    });
  }

  static async resetFeaturedVideo(featureType, isFeatured, type) {
    return database.videos.update(
      { isFeatured: false },
      {
        returning: true,
        where: {
          [op.and]: [{ featureType }, { isFeatured }, { type }],
        },
      }
    );
  }

  static async deleteVideo(videoId) {
    return database.videos.destroy({
      returning: true,
      where: {
        videoId,
      },
    });
  }

  static async getAllVideos(videoClientId, isDisabledAllowed = true) {
    const searchData = {
      videoClientId,
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }

    return database.videos.findAll({
      attributes: {
        exclude: [
          "videoLink",
          "createdAt",
          "updatedAt",
          "videoCast",
          "videoSynopsis",
          "isFeatured",
          "videoIdVimeo",
          "videoClientId",
          "featureType",
          "category",
          "rate",
        ],
      },
      where: searchData,
      order: [["id", "DESC"]],
    });
  }

  static async getAllVideosByType(
    videoClientId,
    type,
    isDisabledAllowed = true
  ) {
    const searchData = {
      [op.and]: [{ videoClientId }, { type }],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }

    return database.videos.findAll({
      attributes: {
        exclude: [
          "videoLink",
          "createdAt",
          "updatedAt",
          "videoCast",
          "videoSynopsis",
          "isFeatured",
          "videoIdVimeo",
          "videoClientId",
          "featureType",
          "category",
        ],
      },
      where: searchData,
      order: [["id", "DESC"]],
    });
  }

  static async getAllVideosForAdmin() {
    return database.videos.findAll({
      attributes: {
        exclude: [
          "videoLink",
          "createdAt",
          "updatedAt",
          "videoCast",
          "videoSynopsis",
          "isFeatured",
          "videoIdVimeo",
          "videoClientId",
          "featureType",
          "category",
        ],
      },
      order: [["id", "DESC"]],
    });
  }

  static async getMainFeaturedVideo(type, country, isDisabledAllowed = true) {
    const searchData = {
      [op.and]: [
        {
          isFeatured: true,
          type,
          featureType: 0,
          videoSuspensionState: "0",
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const videos = await database.videos.findAll({
      order: [["id", "DESC"]],
      limit: 1,
      attributes: {
        exclude: [
          "creationTime",
          "videoWatchCount",
          "videoSuspensionState",
          "createdAt",
          "updatedAt",
          "isFeatured",
          "videoIdVimeo",
          "videoClientId",
          "featureType",
        ],
      },
      where: searchData,
    });
    if (videos) {
      const results = resCountry(videos, country);
      return results;
    }
    return null;
  }

  static async getSecondFeaturedVideo(type, country, isDisabledAllowed = true) {
    const searchData = {
      [op.and]: [
        {
          isFeatured: true,
          type,
          featureType: 1,
          videoSuspensionState: "0",
        },
      ],
    };
    if (!isDisabledAllowed) {
      searchData.disabled = false;
    }
    const videos = await database.videos.findAll({
      order: [["id", "DESC"]],
      limit: 1,
      attributes: {
        exclude: [
          "creationTime",
          "videoWatchCount",
          "videoSuspensionState",
          "createdAt",
          "updatedAt",
          "isFeatured",
          "videoIdVimeo",
          "videoClientId",
          "featureType",
        ],
      },
      where: searchData,
    });
    if (videos) {
      const results = resCountry(videos, country);
      return results;
    }
    return null;
  }
}
export default videoService;
