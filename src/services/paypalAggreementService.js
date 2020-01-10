/* eslint-disable no-useless-catch */
import database from '../database/models'
import sequelize from 'sequelize'
const op = sequelize.Op
class paypalAggreementServices{
	static async createNewAggreement(aggreement){
		try {
			const data = await database.paypalSubscription.create(aggreement)
			if(Object.values(data).length ===1){
				return data
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async getLiveAggreement(email){
		try {
			const data = await database.paypalSubscription.findOne({
				where:{
					[op.and]:[
						{email},
						{state:'alive'}
					]
				}
			})
			if(Object.values(data).length ===1){
				return data
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
	static async updateAggreement(aggreementId,aggreement){
		try {
			const data = await database.paypalSubscription.update(aggreement,{
				return:true,
				where:{aggreementId}
			})
			if(data){
				return data
			}else{
				return null
			}
		} catch (error) {
			throw error
		}
	}
}
export default paypalAggreementServices