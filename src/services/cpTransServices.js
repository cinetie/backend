import database from '../database';
import checker from '../helpers/If';

//Services for  handling Content providers cash transactions like withdrawals and invoicing

class cpTransServices{

    static async  createTrans(newTrans) {
       try {
        const returnedData = await database.cpTransactions.create(newTrans);
        checker.checker(returnedData,null);
       } catch (error) {
           throw error;
       }
    }
    static async getAllTrans(){
        try {
            const data = await database.cpTransactions.findAll()
            checker.checker(data,null);
        } catch (error) {
            throw error;
        }
    
    }
    static async getTransById(clientId){
        try {
            const data = await database.cpTransactions.findAll({
                where : {clientId}
            });
            checker.checker(data)
        } catch (error) {
            throw error;
        }
       
    }
}
export default cpTransServices;

