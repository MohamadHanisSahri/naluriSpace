const BigNumber = require("bignumber.js");
const piFormula = require("./pi_formula");

const { A, B, C, D, E, DIGITS_PER_TERM, C3_24 } = piFormula;

function computePI(digits) {
  if (digits <= 0) {
    return "0";
  }

  const DIGITS = new BigNumber(digits);
  const N = DIGITS.dividedToIntegerBy(DIGITS_PER_TERM).plus(1);
  const PREC = DIGITS.multipliedBy(Math.log2(10));

  BigNumber.config({
    DECIMAL_PLACES: Math.ceil(PREC.toNumber()),
    POW_PRECISION: Math.ceil(PREC.toNumber()),
  });

  const PQT = computePQT(new BigNumber(0), N);

  let PI = D.multipliedBy(E.sqrt()).multipliedBy(PQT.Q);
  PI = PI.dividedBy(A.multipliedBy(PQT.Q).plus(PQT.T));

  return PI.toFixed(digits);
}

function computePQT(n1, n2) {
  let m = new BigNumber(0);
  let PQT = {
    P: new BigNumber(0),
    Q: new BigNumber(0),
    T: new BigNumber(0),
  };

  if (n1.plus(1).isEqualTo(n2)) {
    PQT.P = n2.multipliedBy(2).minus(1);
    PQT.P = PQT.P.multipliedBy(n2.multipliedBy(6).minus(1));
    PQT.P = PQT.P.multipliedBy(n2.multipliedBy(6).minus(5));
    PQT.Q = C3_24.multipliedBy(n2).multipliedBy(n2).multipliedBy(n2);
    PQT.T = A.plus(B.multipliedBy(n2)).multipliedBy(PQT.P);
    if (n2.modulo(2).isEqualTo(1)) {
      PQT.T = PQT.T.negated();
    }
  } else {
    m = n1.plus(n2).dividedToIntegerBy(2);

    let res1 = computePQT(n1, m);
    let res2 = computePQT(m, n2);

    PQT.P = res1.P.multipliedBy(res2.P);
    PQT.Q = res1.Q.multipliedBy(res2.Q);
    PQT.T = res1.T.multipliedBy(res2.Q).plus(res1.P.multipliedBy(res2.T));
  }

  return PQT;
}

module.exports = { computePI };
