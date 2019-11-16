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

    static async updateEarnings(id, newEarnings) {
        try {
            return await database.earnings.update(newEarnings, {
                where: {
                    id
                }
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
            const newOrigin = date.convertToTimestamp(origin)
            const data = await database.earnings.findAll({
                attributes: {
                    include: [
                        [sequelize.fn('sum', sequelize.col('amount')), 'sum'],
                        [sequelize.fn('avg',sequelize.col('amount')),'avg']
                    ]
                },
                where: {
                    [op.and]: [{
                        createdAt: {
                            [op.lte]: newOrigin
                        },
                        state:"Active",
                        amount:{
                            [op.gte]:min
                        },
                        clientId:clientId
                    }]
                }
            });
            checker.checker(data);
        } catch (error) {
            throw error
        }
    }
}
export default earningsService;