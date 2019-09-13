import database from '../database/models';

class tokenService {
    static async createNewToken(token, search) {
        try {

            const addedToken = await database.token.create(token);
            if (Object.values(addedToken).length > 1) {
                return addedToken;
            } else {
                return null;
            }


        } catch (error) {
            throw error;
        }
    }
    static async getTokenByMail(email){
        try {
            const foundToken = await database.token.findOne({
                attributes:{
                    exclude:['createdAt','updatedAt','lastName']
                },
                where:{
                    email:email
                }
            });
            if(foundToken){
                return foundToken;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    static async destroyToken(token) {
        try {
            const destroyedToken = await database.token.destroy({
                where: {
                    token: token
                }
            });
            if (Object.values(destroyedToken).length > 1) {
                return destroyedToken;
            } else {
                return null;
            }


        } catch (error) {
            throw error;
        }
    }
}
export default tokenService;