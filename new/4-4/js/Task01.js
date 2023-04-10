'use strict';

let cssConsoleOk = 'padding: 0 3px; text-shadow: 1px 1px 2px #57fc7a'; // OK
let cssConsoleError = 'padding: 0 3px; text-shadow: 0 0 2px red'; // Error

// Task 01

const converter = (costEuro) => {
  if (Number.isNaN(parseFloat(costEuro))) {
    console.log(`%cКажется вы ввели неверные данные`, cssConsoleError);
  } else {
    let costUSD = costEuro * 1.2;
    let costRUB = costUSD * 73;

    console.log(`%cСтоимость покупки в рублях: ${costRUB}`, cssConsoleOk);
  }
};

const data = prompt("Введите стоимость покупки в евро:");
converter(data);
