const ACCESS_KEY = process.env.ACCESS_KEY;
const SHOP_ORIGIN_CURRENCY = 'USD';
const SHOP_AVAILABLE_CURRENCIES = 'GBP,EUR';
const FORMAT_NUMBER = 1;

const axios = require('axios');

const getExchangeRate = async () => {
	try {
		// rate limit reached with currency layer
		// 		const response = await axios.get(
		// 			`http://apilayer.net/api/live?access_key=${ACCESS_KEY}&source=${SHOP_ORIGIN_CURRENCY}&currencies=${SHOP_AVAILABLE_CURRENCIES}&format=${FORMAT_NUMBER}
		// `
		// 		);
		// GBP: response.data.quotes['USDGBP'],
		// EUR: response.data.quotes['USDEUR']

		const response = await axios.get(
			`https://api.exchangeratesapi.io/latest?base=${SHOP_ORIGIN_CURRENCY}&symbols=${SHOP_AVAILABLE_CURRENCIES}`
		);
		return {
			GBP: response.data.rates['GBP'],
			EUR: response.data.rates['EUR']
		};
	} catch (e) {
		console.error(e);
	}
};

const getCurrencyValue = async (userCurrency) => {
	const CURRENT_RATE = await getExchangeRate();
	switch (userCurrency) {
		case 'GBP':
			return CURRENT_RATE.GBP;
		case 'EUR':
			return CURRENT_RATE.EUR;
		case 'USD':
			return 1;
		default:
			return;
	}
};
module.exports = getCurrencyValue;
