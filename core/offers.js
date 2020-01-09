const PRODUCTS = require('../core/products');
const { countOccurencesOfObjInArray } = require('../utils/helper');

const SPECIAL_APPLE_10PC = (items) => {
	// if there are any apples, it will return the total 10% value of the sum cost of
	const DISCOUNTED_APPLE_PRICE = PRODUCTS.apples.price * 0.1;
	const discountTotal = countOccurencesOfObjInArray(items, PRODUCTS.apples) * DISCOUNTED_APPLE_PRICE;
	return discountTotal;
};
const SPECIAL_3_MILKS_50CENT = (items) => {
	// return 50 cents if there are more than 3 milks

	const discountTotal = countOccurencesOfObjInArray(items, PRODUCTS.milk) >= 3 ? 50 : 0;
	return discountTotal;
};

const ALL_OFFERS = {
	'Apples 10% off': SPECIAL_APPLE_10PC,
	'Buy at least 3 milk, get 50 cents off': SPECIAL_3_MILKS_50CENT
};

const DISCOUNT_SUMMARY = (items) => {
	// grab each key (string message) from every offer
	// apply the reducer function to each of the offers in ALL OFFERS
	//
	return Object.keys(ALL_OFFERS).reduce(
		(result, current) => {
			const offerResult = ALL_OFFERS[current](items);
			if (offerResult > 0) {
				result.discounts.push(current);
				result.discountAmt += offerResult;
			}
			return result;
		},
		{ discounts: [], discountAmt: 0 }
	);
};

module.exports = DISCOUNT_SUMMARY;
