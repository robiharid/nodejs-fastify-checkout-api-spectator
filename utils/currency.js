const ACCESS_KEY = process.env.ACCESS_KEY;
const SHOP_ORIGIN_CURRENCY = 'USD';
const SHOP_AVAILABLE_CURRENCIES = 'GBP, EUR';
const FORMAT_NUMBER = 1;

const axios = require('axios');

const GetExchangeRate = async () => {
  try {
    const response = await axios.get(
      `http://apilayer.net/api/live?access_key=${ACCESS_KEY}&source=${SHOP_ORIGIN_CURRENCY}&currencies=${SHOP_AVAILABLE_CURRENCIES}&format=${FORMAT_NUMBER}
`
    );
    return {
      GBP: response.data.quotes['USDGBP'],
      EUR: response.data.quotes['USDEUR']
    };
  } catch (e) {
    console.error(e);
  }
};
module.exports = GetExchangeRate;
