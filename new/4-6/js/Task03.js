'use strict';

// Task 03

const addPrefix = (arr, prefix) => {
  let resultArray = [];

  for (const elem of arr) {
    resultArray.push(prefix + ' ' + elem);
  }

  return resultArray;
};

const names= ['Noah', 'Liam', 'Mason', 'Jacob', 'Robot', 'William', 'Ethan', 'Michael', 'Alexander'];

console.log('Префиксы добавлены: ', addPrefix(names, 'Mr'));
