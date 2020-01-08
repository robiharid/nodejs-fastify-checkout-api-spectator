const PRODUCTS = require('../core/products');
async function routes(fastify, options) {
  //http://localhost:5000/checkout?items=Apples&items=Apples&items=Apples&items=Soup&currency=gbp
  const CURRENT_RATE = await require('../utils/currency')();
  const USD = 1;
  const EUR = CURRENT_RATE.EUR;
  const GBP = CURRENT_RATE.GBP;

  fastify.get('/checkout', async (req, res) => {
    const USER_CURRENCY = req.query.currency;

    const mappedItems = req.query.items.map(
      item => PRODUCTS[item.toLowerCase()]
    );
    console.table(mappedItems);

    const reducer = (acc, curr) => acc + curr;
    const sum = (
      (mappedItems.reduce(reducer) * req.query.currency) /
      100
    ).toFixed(2);

    res.send({
      items: mappedItems,
      subtotal: sum,
      discounts: ['Apples 10% off'],
      discountAmt: 0.09,
      total: EUR,
      currency: req.query.currency
    });
  });
}
module.exports = routes;
