function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function randomInt() {
    return randomIntFromRange(Number.MIN_VALUE, Number.MAX_VALUE);
};

module.exports.randomIntFromRange = randomIntFromRange;
module.exports.randomInt = randomInt;