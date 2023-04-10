'use strict';

// Task 02

const stringModifier = str => str[0].toUpperCase() + str.slice(1, ).toLowerCase();

const str = prompt("Введите строку:");

if (str) {
  console.log(stringModifier(str));
}
