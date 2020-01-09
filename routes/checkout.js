const PRODUCTS = require('../core/products');
async function routes(fastify, options) {
	//http://localhost:5000/checkout?items=Apples&items=Apples&items=Apples&items=Soup&currency=gbp
	const CURRENT_RATE = await require('../utils/currency')();

	fastify.get('/checkout', async (req, res) => {
		const USER_ISO_CURRENCY_STRING = req.query.currency.toUpperCase();
		const USER_USD_CURRENCY_VALUE = await require('../utils/currency')(USER_ISO_CURRENCY_STRING);

		const mappedItems = req.query.items.map((item) => PRODUCTS[item.toLowerCase()]);
		const DISCOUNT_SUMMARY = require('../core/offers')(mappedItems);
		const { discounts } = DISCOUNT_SUMMARY;
		let { discountAmt } = DISCOUNT_SUMMARY;
		discountAmt = discountAmt / 100;

		const reducer = (acc, curr) => acc + curr.price;
		const subtotal = (mappedItems.reduce(reducer, 0) * USER_USD_CURRENCY_VALUE / 100).toFixed(2);

		const total = subtotal - discountAmt;
		res.send({
			items: mappedItems,
			subtotal: subtotal,
			discounts: discounts,
			discountAmt: discountAmt,
			total: total,
			currency: USER_ISO_CURRENCY_STRING
		});
	});
}
module.exports = routes;
