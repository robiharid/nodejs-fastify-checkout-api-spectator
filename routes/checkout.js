const PRODUCTS = require('../core/products');
async function routes(fastify, options) {
  // http://localhost:5000/checkout?items=apple&items=banana&currency=gbp
  const CURRENT_RATE = await require('../utils/currency')();
  const USD = 1.0;
  const EUR = CURRENT_RATE.EUR;
  const GBP = CURRENT_RATE.GBP;

  fastify.get('/checkout', async (req, res) => {
    // let userItems = JSON.parse(req.query.items);
    const mappedItems = req.query.items.map(
      item => PRODUCTS[item.toLowerCase()]
    );

    res.send({
      items: mappedItems,
      subtotal: 2.43,
      discounts: ['Apples 10% off'],
      discountAmt: 0.09,
      total: EUR,
      currency: req.query.currency
    });
  });
}
module.exports = routes;
