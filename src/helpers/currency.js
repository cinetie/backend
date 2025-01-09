import axios from "axios";

const convert = async (amount, currency) => {
    console.log(process.env.ACCESS_KEY_CURRENCY_LAYER, '=============')
    const res = await axios.get(`https://api.apilayer.com/currency_data/live?access_key=${process.env.ACCESS_KEY_CURRENCY_LAYER}&currencies=${currency}&source=USD&format=1`, {
        headers: {
            apikey: process.env.ACCESS_KEY_CURRENCY_LAYER,
        }
    });
    console.log(res.data);
    const rates = res.data;
    return Math.ceil(rates.quotes[`USD${currency}`] * amount);
};

export default convert;