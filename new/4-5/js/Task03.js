'use strict';

// Task 03

const stringFlipper = str => {
  if (str !== '') {
    let invertedString = '';

    for (let i = str.length - 1; i >= 0 ; i--) {
      invertedString += str[i];
    }

    return invertedString;
  } else {
    return 'Пустая строка конечно тоже строка, но мне не подходит она :)';
  }
};

const inputData = prompt('Введите пожалуйста строку, которую нужно перевернуть:');

alert(stringFlipper(inputData));
