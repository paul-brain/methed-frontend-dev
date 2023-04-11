'use strict';

// Task 01

// Формируем шапку: | a^n | n = i |
let tableHeader = '| ' + 'a^n |'.padStart(10, ' ');

for(let i = 1; i <= 10; i++) {
  tableHeader += `n = ${i} |`.padStart(14, ' ');
}

// Формируем нижнюю границу шапки: ————————————————————
tableHeader += '\n|' + ''.padStart(10, '—');

for(let i = 1; i <= 10; i++) {
  tableHeader += ``.padStart(14, '—');
}

// Выводим шапку
console.log(tableHeader + '|');

// Тело таблицы - основные данные
for(let i = 1; i <= 10; i++) {
  let tableColumn = '| ' + `a = ${i} |`.padStart(10, ' '); // Первый столбец с обозначениями: a = j |
  let str = '';

  for(let j = 1; j <= 10; j++) {
    str += `${i ** j} |`.padStart(14, ' ');
  }

  console.log(tableColumn + str);
}

// Формируем нижнюю границу всей таблицы
tableHeader = '|' + ''.padStart(10, '—');

for(let i = 1; i <= 10; i++) {
  tableHeader += ``.padStart(14, '—');
}

// Выводим нижнюю границу всей таблицы
console.log(tableHeader + '|');
