'use strict';

let cssConsole = 'padding: 0 3px; text-shadow: 1px 1px 2px #57fc7a'; // OK

const productName = 'Samsung Galaxy A53';
const productCount = 5;
const productCategory = 'Mobile phones';
const productPrice = 250;

console.log('Имя товара:', productName);
console.log('Общая сумма:', productPrice * productCount, '$');

{
  const productName = prompt("Введите наименование товара: ");
  const productCount = + prompt("Введите кол-во товара: ");
  const productCategory = prompt("Введите категорию товара: ");
  const productPrice = + prompt("Введите цену товара: ");

  console.log(typeof productName, typeof productCount, typeof productCategory, typeof productPrice);

  if (Number.isNaN(productCount) || Number.isNaN(productPrice)) {
    cssConsole = 'padding: 0 3px; text-shadow: 0 0 2px red'; // Error
    console.log(`%cКажется вы ввели неверные данные`, cssConsole);
  } else {
    console.log(`%cНа складе ${productCount} единиц(ы) товара ${productName} на сумму ${productPrice * productCount} руб.`, cssConsole);
  }
}
