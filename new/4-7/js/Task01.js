'use strict';

// Task 01

const randomNumberGenerator1 = (count) => {
  if (Number.isInteger(+count) && count > 0) {
    let numbers = [];

    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * 100 + 1));
    }

    return numbers;
  }

  return 'Некорректные данные';
};

console.log('Задача 1. Генератор  массива случайных чисел от 1 до 100:');
console.log(randomNumberGenerator1('20'));
