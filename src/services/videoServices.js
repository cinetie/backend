/* eslint-disable no-useless-catch */
import sequelize from 'sequelize';
import database from '../database/models';
import date from '../helpers/date';

const op = sequelize.Op;

// will be changed to adapt a very good search algorithm
// videos are also called movies
class videoService {
  static async getVideoById(videoId) {
    try {
      const video = await database.videos.findOne({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: {
          videoId
        }
      });
      if (video) {
        return video;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getNewVideos(limitValue, offsetValue, type) {
    try {
      const videos = await database.videos.findAll({
        offset: Number(offsetValue),
        limit: Number(limitValue),
        where: {
          [op.and]: [{
            creationTime: {
              [op.gte]: date.removeDays(60)
            },
            type
          }]

        }
      });
      if (videos) {
        return videos;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getTrendingVideos(offsetValue, limit, type) {
    try {
      const videos = await database.videos.findAll({
        offset: Number(offsetValue),
        limit: Number(limit),
        where: {
          [op.and]: [{
            videoWatchCount: {
              [op.gte]: process.env.TRENDING_WATCH_COUNT
            },
            creationTime: {
              [op.gte]: date.removeDays(180)
            },
            type
          }]
        }
      });
      if (videos) {
        return videos;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async search(query) {
    try {
      const data = await database.videos.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 20,
        where: {
          [op.or]: [
            { videoName: { [op.iLike]: `%${query}%` } },
            { category: { [op.iLike]: `%${query}%` } }
          ]
        }
      });
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async incrementWatchCountService(videoId) {
    try {
      const data = await database.videos.increment('videoWatchCount', {
        where: { videoId }
      });
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getPopularVideos(offSetValue, limitValue, type) {
    try {
      const data = await database.videos.findAll({
        offset: Number(offSetValue),
        limit: Number(limitValue),
        where: {
          [op.and]: [{
            videoWatchCount: {
              [op.gte]: process.env.TRENDING_WATCH_COUNT
            },
            type
          }]
        }
      });
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getVideosByCategory(category) {
    try {
      const data = await database.videos.findAll({
        where: {
          category
        }
      });
      if (data) {
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async createNewVideo(video) {
    try {
      return await database.videos.create(video);
    } catch (error) {
      throw error;
    }
  }

  static async updateVideo(videoId, newVideo) {
    try {
      return await database.videos.update(newVideo, {
        where: {
          videoId
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteVideo(videoId) {
    try {
      return await database.videos.destroy({
        returning: true,
        where: {
          videoId
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllVideos(videoClientId) {
    try {
      return await database.videos.findAll({
        attributes: {
          exclude: ['videoLink', 'createdAt', 'updatedAt', 'videoCast', 'videoSynopsis', 'nameTagThumbNailLink', 'isFeatured', 'tallThumbNailLink', 'videoIdVimeo', 'videoClientId', 'featureType', 'category']
        },
        where: { videoClientId },
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllVideosForAdmin() {
    try {
      return await database.videos.findAll({
        attributes: {
          exclude: ['videoLink', 'createdAt', 'updatedAt', 'videoCast', 'videoSynopsis', 'nameTagThumbNailLink', 'isFeatured', 'tallThumbNailLink', 'videoIdVimeo', 'videoClientId', 'featureType', 'category']
        },
        order: [
          ['id', 'DESC']
        ]
      });
    } catch (error) {
      throw error;
    }
  }

  static async getMainFeaturedVideo(type) {
    try {
      const videos = await database.videos.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        attributes: {
          exclude: ['videoLink', 'creationTime', 'videoWatchCount', 'videoSuspensionState', 'createdAt', 'updatedAt', 'isFeatured', 'tallThumbNailLink', 'videoIdVimeo', 'videoClientId', 'featureType', ]
        },
        where: {
          [op.and]: [
            // { isFeatured: true },
            // { featureType: 1 }
            {
              isFeatured: true,
              type,
              featureType: 1,
            }
          ]
        }
      });
      if (videos) {
        return videos;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSecondFeaturedVideo(type) {
    try {
      const videos = await database.videos.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 1,
        attributes: {
          exclude: ['videoLink', 'creationTime', 'videoWatchCount', 'videoSuspensionState', 'createdAt', 'updatedAt', 'isFeatured', 'tallThumbNailLink', 'videoIdVimeo', 'videoClientId', 'featureType', ]
        },
        where: {
          [op.and]: [
            {
              isFeatured: true,
              type,
              featureType: 2,
            }
          ]
        }
      });
      if (videos) {
        return videos;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
export default videoService;
