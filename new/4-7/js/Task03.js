'use strict';

// Task 03

const randomNumberGenerator3 = (count, n, m, parity = '') => {
  if (Number.isInteger(+count) && count > 0 && Number.isInteger(+n) && Number.isInteger(+m)) {
    let numbers = [];
    let min = Math.ceil(+n);
    let max = Math.floor(+m);

    (min > max) && ([min, max] = [max, min]);

    for (let i = 0; i < count; i++) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      if (parity === 'even') {
        while (randomNumber % 2 !== 0) {
          randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      } else if (parity ==='odd') {
        while (randomNumber % 2 === 0) {
          randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        };
      }

      numbers.push(randomNumber);
    }

    return numbers;
  }

  return 'Мы работаем только с целыми числами.';
};

console.log('Задача 3. Генератор  массива случайных чисел от N до M с параметром even/odd:');
console.log(randomNumberGenerator3('15', '1', '10', 'odd'));
