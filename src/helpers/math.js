const getCummulativeSum = async (total, num) => total + num;
const average = async (arrayLen, sum) => sum / arrayLen;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

export default { getCummulativeSum, average, randomNumber };
