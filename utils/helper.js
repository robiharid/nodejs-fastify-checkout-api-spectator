const countOccurencesOfObjInArray = (array, obj) => {
	return array.filter((item) => obj.id === item.id).length;
};

module.exports = {
	countOccurencesOfObjInArray
};
