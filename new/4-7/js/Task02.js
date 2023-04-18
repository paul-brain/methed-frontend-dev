'use strict';

// Task 02

const randomNumberGenerator2 = (count, n, m) => {
  if (Number.isInteger(+count) && count > 0 && Number.isInteger(+n) && Number.isInteger(+m)) {
    let numbers = [];
    let min = Math.ceil(+n);
    let max = Math.floor(+m);

    (min > max) && ([min, max] = [max, min]);

    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min); //Максимум и минимум включаются
    }

    return numbers;
  }

  return 'Мы работаем только с целыми числами.';
};

console.log('Задача 2. Генератор  массива случайных чисел от N до M:');
console.log(randomNumberGenerator2('15', '0', '-10'));
