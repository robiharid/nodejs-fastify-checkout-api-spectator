# Checkout API
###### RESTful API built in JavaScript using NodeJS with Fastify and Currency API
Checkout API built to calculate priced goods, discount eligibility and return them in a specified currency (GBP, EUR, or USD)
Example payload:
```
http://localhost:5000/checkout?items=apples&currency=eur
```
```
http://localhost:5000/checkout?items=apples,soup,oranges&currency=eur
```

Example response:
```javascript
{
    "subtotal": "0.90",
    "discounts": [
        "Apples 10% off"
    ],
    "discountAmt": 0.1,
    "total": 0.8,
    "currency": "EUR"
}
```

Query param checking
- Checks items are string
- Checks if item exists in Products store
- Checks if valid ISO currency provided (currently supporting USD, EUR, GBP) conversions
