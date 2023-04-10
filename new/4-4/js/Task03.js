'use strict';

// Task 03

const calculate = (sum, count, promo) => {
  let calcSum = sum;

  if (count > 10) {
    calcSum *= 0.97;
  }

  if (calcSum > 30000) {
    calcSum = 30000 + (calcSum - 30000) * 0.85;
  }

  if (promo === 'METHED') {
    calcSum *= 0.9;
  }

  if (promo === 'G3H2Z1') {
    if (calcSum > 2000) {
      calcSum -= 500;
    }
  }

  return calcSum;
};

console.log(calculate(1000, 11, 'methed'));
console.log(calculate(50000, 11, 'METHED'));
console.log(calculate(3000, 11, 'G3H2Z1'));
