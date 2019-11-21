import database from '../database/models';
import date from '../helpers/date';
import sequelize from 'sequelize';
import checker from '../helpers/If';

const op =  sequelize.Op;
class earningsService {
    static async getEarningsByVideo(videoId) {
        try {
            const user = await database.earnings.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    videoId
                }
            });
            if (user) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    static async getEarningsById(id) {
        try {
            return await database.earnings.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }

    static async createNewEarnings(newEarnings) {
        try {
            return await database.earnings.create(newEarnings);
        } catch (error) {
            throw error;
        }
    }

    static async updateEarnings(id, updates) {
        try {
          return  await database.earnings.update(updates, {
                returning:true,
                where: { id }
            });
        
        } catch (error) {
            throw error;
        }
    }
    static async deleteEarnings(id) {
        try {
            return await database.earnings.destroy({
                returning: true,
                where: {
                    id
                }
            });
        } catch (error) {
            throw error;
        }
    }
    static async getAllEarningss() {
        try {
            return await database.earnings.findAll();
        } catch (error) {
            throw error;
        }
    }
    //get All active earnings from the last 6 months
    static async getAllFromThreeshold(clientId,min) {
        try {
            const origin = date.removeDays(180);
            const data = await database.earnings.findAll({
                where: {
                    [op.and]: [{
                        monthYear: {
                            [op.lte]: 1574160508810

                        },
                        state:"Active",
                        amount:{
                            [op.gte]:0
                        },
                        clientId:clientId
                    }]
                }
            });
            // console.log(JSON.stringify(data))
            if(data){
                return data
            }else{
                return null;
            }
        } catch (error) {
            throw error
        }
    }
   
    
}
export default earningsService;