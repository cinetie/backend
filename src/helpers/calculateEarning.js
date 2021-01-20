import viewingSessions from '../services/viewingSessionsServices';
import database from '../database/models';
import { DATE, Sequelize } from 'sequelize';
import Earnings from './earnings';

const Op = Sequelize.Op;
const today = new Date();

const calculateEarningController = async (req, res) => {
    const data = await database.subscriptions.findAll({
        where: { state: 'current'}
    });

    for (let i = 0; i < Object.values(data).length; i++) {
        const date = new Date(data[i].dataValues.endDate)

        if(date.getTime() < today.getTime()){
            const sessions = await viewingSessions.getActiveAndSuspendedSessionsPerUser(data[i].dataValues.email);
            if (sessions.length > 0) {
                await Earnings(data[i].dataValues.email);
            }
        }
    }
}

export default calculateEarningController;