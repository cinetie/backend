/* eslint-disable no-useless-catch */
import sequelize from 'sequelize';
import database from '../database/models';

const op = sequelize.Op;
// services for implementing the billing service

class viewingSessionservices {
  static async registerViewingSessions(newViewingSessions) {
    try {
      const added = await database.viewingSessions.create(newViewingSessions);
      if (added) {
        return added;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getActiveSessionsPerVideo(videoId) {
    try {
      const sessions = await database.viewingSessions.findAll({
        attributes: {
          include: [
            [sequelize.fn('count', sequelize.col('videoId')), 'userCount']
          ]
        },
        where: {
          [op.and]: [{
            videoId
          },
          {
            sessionState: 'Active'
          }
          ]
        }
      });
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // will provide all videos the user has watched in a month/subscription period
  static async getActiveSessionsPerUser(userId) {
    try {
      const sessions = await database.viewingSessions.findAll({

        where: {
          [op.and]: [
            { userId },
            { sessionState: 'Active' }
          ]
        }
      });
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // active and suspended streams represent all streams recorded in both the duration
  // of the subscription and the extension when the automatic payment failed
  static async getActiveAndSuspendedSessionsPerUser(userId) {
    try {
      const sessions = await database.viewingSessions.findAll({

        where: {
          [op.and]: [
            { userId },
            { sessionState: { [op.not]: 'inActive' } }
          ]
        }
      });
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionsPerVideo(videoId) {
    try {
      const sessions = await database.viewingSessions.findAll({
        where: {
          videoId
        }
      });
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSesssionPerVideoUser(userId, videoId) {
    try {
      const sessions = await database.viewingSessions.findAll({
        where: {
          [op.and]: [{
            userId
          },
          {
            videoId
          }
          ]
        }
      });
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getSessionsPerUser(userId) {
    try {
      const sessions = await database.viewingSessions.findAll({
        attributes: {
          attributes: [
            [sequelize.fn('count', sequelize.col('userId')), 'watchCount']
          ]
        },
        where: {
          userId
        }
      });
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async updateViewingSessions(id, updated) {
    try {
      const status = await database.viewingSessions.update(updated, {
        where: {
          id
        }
      });
      if (status) {
        return status;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
export default viewingSessionservices;
