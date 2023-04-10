'use strict';

// hard_task_01

const number1 = + prompt("Введите первое число:");
const number2 = + prompt("Введите второе число:");

const commonDivisor = (a, b) => {

  if (! Number.isInteger(a) || ! Number.isInteger(b))
    return 'нельзя посчитать';

  if (b == 0) {
    return a;
  } else {
    return commonDivisor(b, a % b);
  }
}

alert('НОД: ' + commonDivisor(number1, number2));
