async function routes(fastify, options) {
  // get /checkout?items=apple,banana
  fastify.get('/checkout', async (req, res) => {
    res.send({
      items: req.query.items,
      currency: req.query.currency
    });
  });
}

module.exports = routes;
