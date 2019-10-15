import database from '../database/models';

class loginSessionServices {

    static async addSession(newSession) {
        try {
            const addedSession = await database.loginSessions.create(newSession);
            if (addedSession) {
                return addedSession;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }

    }
    static async getParticularSession(email) {

        try {
            const session = await database.loginSessions.findAll({
                where: {
                    email
                }
            });
            if (session) {
                return session;
            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }

    }
    static async getAllSession() {

        try {
            const sessions = await database.loginSessions.findAll();
            if (sessions) {
                return sessions;
            } else {
                return null;
            }
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
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
}
export default loginSessionServices;