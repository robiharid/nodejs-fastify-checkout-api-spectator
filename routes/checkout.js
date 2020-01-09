const PRODUCTS = require('../core/products');
const GET_USD_CONVERSION = require('../utils/currency');
const GET_DISCOUNT_SUMMARY = require('../core/offers');

async function routes(fastify, options) {
	//http://localhost:5000/checkout?items=Apples&items=Apples&items=Apples&items=Soup&currency=gbp

	fastify.get('/checkout', async (req, res) => {
		const USER_CURRENCY_CONVERTED = await GET_USD_CONVERSION(req.query.currency.toUpperCase());

		const mappedItems = req.query.items.map((item) => PRODUCTS[item.toLowerCase()]);
		const DISCOUNT_SUMMARY = GET_DISCOUNT_SUMMARY(mappedItems);
		const { discounts, discountAmt } = DISCOUNT_SUMMARY;

		const subtotal = (mappedItems.reduce((acc, curr) => acc + curr.price, 0) *
			USER_CURRENCY_CONVERTED /
			100).toFixed(2);

		const total = subtotal - discountAmt;
		res.send({
			items: mappedItems,
			subtotal: subtotal,
			discounts: discounts,
			discountAmt: discountAmt,
			total: total,
			currency: req.query.currency.toUpperCase()
		});
	});
}
module.exports = routes;
