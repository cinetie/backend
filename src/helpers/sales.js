import SalesService from "../services/salesService";
import uuid from "./uuid";

const addRecord = async (details) => {
  try {
    const dates = new Date();
    const data = {
      ...details,
      transactionId: uuid.generator(),
      creationTime: dates.getTime(),
    };
    const status = await SalesService.createNewSales(data);
    if (status) return 1;
    return 0;
  } catch (error) {
    throw error;
  }
};
export default { addRecord };
