async function routes(fastify, options) {
  // http://localhost:5000/checkout?items=apple&items=banana&currency=gbp
  const CURRENT_RATE = await require('../utils/currency')();
  const EUR = CURRENT_RATE.EUR;
  const GBP = CURRENT_RATE.GBP;

  fastify.get('/checkout', async (req, res) => {
    res.send({
      // items: req.query.items,
      subtotal: 2.43,
      discounts: ['Apples 10% off'],
      discountAmt: 0.09,
      total: EUR,
      currency: req.query.currency
    });
  });
}
module.exports = routes;
