async function routes(fastify, options) {
  // http://localhost:5000/checkout?items=apple&items=banana&currency=gbp

  fastify.get('/checkout', async (req, res) => {
    res.send({
      // items: req.query.items,
      subtotal: 2.43,
      discounts: ['Apples 10% off'],
      discountAmt: 0.09,
      total: 2,
      currency: req.query.currency
    });
  });
}
module.exports = routes;
