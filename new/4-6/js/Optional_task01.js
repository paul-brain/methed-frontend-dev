'use strict';

// Optional task

const getAveragePriceGoods = arr => {
  let goodPrices = [];

  for (const elem of arr) {
    goodPrices.push(elem[1] / elem[0]);
  }

  return getAverageValue(goodPrices);
};

const allCashbox2 = [
  [12, 4500],
  [7, 3210],
  [4, 650],
  [3, 1250],
  [9, 7830],
  [1, 990],
  [6, 13900],
  [1, 370]
];

console.log('Средняя стоимость одного товара в магазине: ', getAveragePriceGoods(allCashbox2));
