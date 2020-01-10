const products = require('../core/products');
const { countOccurencesOfObjInArray } = require('../utils/helper');

const offerApple10pc = (items) => {
	// if there are any apples, it will return the total 10% value of the sum cost of
	const DISCOUNTED_APPLE_PRICE = products.apples.price * 0.1;
	const discountTotal = countOccurencesOfObjInArray(items, products.apples) * DISCOUNTED_APPLE_PRICE;
	return discountTotal;
};
const offer3Milks50Cents = (items) => {
	// return 50 cents if there are more than 3 milks
	const discountTotal = countOccurencesOfObjInArray(items, products.milk) >= 3 ? 50 : 0;
	return discountTotal;
};

const allOffers = {
	'Apples 10% off': offerApple10pc,
	'Buy at least 3 milk, get 50 cents off': offer3Milks50Cents
};

const discountSummary = (items) => {
	// grab each key (string message) from every offer
	// apply the reducer function to each of the offers in ALL OFFERS
	//
	return Object.keys(allOffers).reduce(
		(result, current) => {
			const offerResult = allOffers[current](items);
			if (offerResult > 0) {
				result.discounts.push(current);
				result.discountAmt += offerResult / 100;
			}
			return result;
		},
		{ discounts: [], discountAmt: 0 }
	);
};

module.exports = discountSummary;
