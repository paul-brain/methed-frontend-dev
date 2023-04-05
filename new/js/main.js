'use strict';

const cssConsole = 'padding: 0 3px; text-shadow: 1px 1px 2px #57fc7a';

let productName = 'Samsung Galaxy A53';
let productCount = 5;
let productCategory = 'Mobile phones';
let productPrice = 250;

console.log('Имя товара:', productName);
console.log('Общая сумма:', productPrice * productCount, '$');

{
  const productName = prompt("Введите наименование товара: ");
  const productCount = + prompt("Введите кол-во товара: ");
  const productCategory = prompt("Введите категорию товара: ");
  const productPrice = + prompt("Введите цену товара: ");

  console.log(typeof productName, typeof productCount, typeof productCategory, typeof productPrice);
  console.log(`На складе ${productCount} единицы товара ${productName} на сумму ${productPrice * productCount} руб.`);
}
