const products = require('../core/products');
const getUsdConversion = require('../utils/currency');
const getDiscountSummary = require('../core/offers');

const checkValidCurrency = (currency) => {
	return [ 'GBP', 'EUR', 'USD' ].includes(currency);
};

const queryStringJsonSchema = {
	type: 'object',
	required: [ 'items', 'currency' ],
	properties: {
		items: { type: 'string' },
		currency: { type: 'string' }
	}
};
const schema = { querystring: queryStringJsonSchema };

async function routes(fastify, options) {
	//http://localhost:5000/checkout?items=Apples&items=Apples&items=Apples&items=Soup&currency=gbp

	fastify.get('/checkout', { schema }, async (req, res) => {
		const currency = req.query.currency.toUpperCase();
		const isoCurrency = checkValidCurrency(currency)
			? currency
			: res.code(400).send(`${isoCurrency} does not meet our valid currencies`);

		let invalidItems = [];
		const mappedItems = req.query.items.split(',').map((item) => {
			if (products[item.toLowerCase()]) return products[item.toLowerCase()];
			else invalidItems.push(item);
		});
		if (invalidItems.length) {
			res.code(404).send(`${invalidItems.join(', ')} were not found`);
		}

		const currencyConverted = await getUsdConversion(isoCurrency);
		const discountSummary = getDiscountSummary(mappedItems);
		const { discounts, discountAmt } = discountSummary;

		const subtotalUSD = mappedItems.reduce((acc, curr) => acc + curr.price, 0) / 100;

		const subtotal = (subtotalUSD * currencyConverted).toFixed(2);
		const total = subtotal - discountAmt;

		res.send({
			items: mappedItems,
			subtotal: subtotal,
			discounts: discounts,
			discountAmt: discountAmt,
			total: total,
			currency: isoCurrency
		});
	});
}
module.exports = routes;
