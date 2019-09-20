import database from '../database/models';

class tokenService {
    static async createNewToken(token, search) {
        try {
            return await database.token.create(token);
        } catch(error) {
            throw error;
        }
    }
    static async getTokenByMail(email){
        try {
            return await database.token.findOne({
                attributes:{
                    exclude:['createdAt','updatedAt','lastName']
                },
                where:{
                    email:email
                }
            });
        } catch(error) {
            throw error;
        }
    }
    static async destroyToken(token) {
        try {
            return await database.token.destroy({
                where: {
                    token: token
                }
            });
        } catch(error) {
            throw error;
        }
    }
}
export default tokenService;