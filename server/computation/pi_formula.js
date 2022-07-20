const BigNumber = require("bignumber.js");

const A = new BigNumber("13591409");
const B = new BigNumber("545140134");
const C = new BigNumber("640320");

const D = new BigNumber("426880");
const E = new BigNumber("10005");

const DIGITS_PER_TERM = new BigNumber("14.1816474627254776555");

const C3_24 = C.multipliedBy(C).multipliedBy(C).dividedToIntegerBy(24);

module.exports = { A, B, C, D, E, DIGITS_PER_TERM, C3_24 };
