import sequelize from 'sequelize';
import database from '../database/models';

const op = sequelize.Op;

class loginSessionServices {
  static async addSession(newSession) {
    try {
      const addedSession = await database.loginSessions.create(newSession);
      if (addedSession) {
        return addedSession;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getParticularSession(email) {
    try {
      const session = await database.loginSessions.findAll({
        where: {
          [op.and]: [{ email }, { state: 'in' }]
        }
      });
      if (session) {
        return session;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getLiveSessions() {
    try {
      const session = await database.loginSessions.findAll({
        where: {
          state: 'in'
        }
      });
      if (session) {
        return session;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAllSession() {
    try {
      const sessions = await database.loginSessions.findAll();
      if (sessions) {
        return sessions;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async updateSession(id, session) {
    try {
      const updated = await database.loginSessions.update(session, {
        where: {
          id
        }
      });
      if (updated) {
        return updated;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
export default loginSessionServices;
