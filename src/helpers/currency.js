import axios from "axios";

const convert = async (amount, currency) => {
    const res = await axios.get(`https://api.apilayer.com/currency_data/live?access_key=${process.env.ACCESS_KEY_CURRENCY_LAYER}&currencies=${currency}&source=USD&format=1`, {
        headers: {
            apikey: process.env.ACCESS_KEY_CURRENCY_LAYER,
        }
    });
    const rates = res.data;
    return Math.ceil(rates.quotes[`USD${currency}`] * amount);
};

export default convert;