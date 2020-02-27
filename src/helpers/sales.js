import controller from '../services/salesService';


const addRecord = async (details) => {
  const recorded = await controller.createNewSales(details);
  if (!recorded) return null;
  return recorded;
};
export default { addRecord };
