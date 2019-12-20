import database from '../database/models'

class transactionService{

	static async createTransaction(data){
		try {
			const newTrans = await database.paypalTransactions.create(data);
			(newTrans) ? newTrans : null
		} catch (error) {
			throw error
		}
	}
	static async getTransactionById(id){
		try {
			const data = await database.paypalTransactions.findOne({
				where :{
					transactionId:id
				}
			});
			(data) ? data : null
		} catch (error) {
			throw error
		}
	}
	static async getTransactionsByEmail(email){
		try {
			const data = await database.paypalTransactions.findAll({
				where : {
					email:email
				}
			});
			(data) ? data :null
		} catch (error) {
			throw error
		}
	}
	static async deleteTransaction(id){
		try{
			const deleted = await database.paypalTransactions.destroy({
				where :{
					transactionId:id
				}
			});
			(deleted) ? deleted :null
		}catch(error){
            
			throw error
		}
	}
	static async updateTransaction(id,updates){
		try {
            
			const data = await database.paypalTransactions.update(updates,{
				where : {
					transactionId:id
				}
			});
			(data) ? data :null
		} catch (error) {
			throw error
		}
	}

}
export default transactionService