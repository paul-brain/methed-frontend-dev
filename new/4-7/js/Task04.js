'use strict';

// Task 04

const getLeapYears = (n, m) => {
  if (Number.isInteger(+n) && Number.isInteger(+m)) {
    let years = [];

    (n > m) && ([n, m] = [m, n]); // ставим по возрастанию

    for (let i = n; i <= m; i++) {
      if ((i % 4 === 0 && i % 100 !== 0) || (i % 100 === 0 && i % 400 === 0)) {
        years.push(i);
      }
    }

    return years;
  }

  return 'Некорректные данные';
};

console.log('Задача 4. Массив с високосными годами в диапазоне между N и M:');
console.log(getLeapYears(1996, 2023));
