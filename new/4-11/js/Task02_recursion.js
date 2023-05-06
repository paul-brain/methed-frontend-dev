'use strict';

// Task 02
console.log('\n');
console.log('Задача 2. Рекурсивный подсчет суммы массива:');

const recursion = arr => {
  let number = getRandomIntInclusive(0, 10);
  arr.push(number);

  const sum = arr.reduce((sum, item) => sum + item);

  if (sum < 50) {
    recursion(arr);
  }

  return arr;
};

console.log(recursion([5]));
