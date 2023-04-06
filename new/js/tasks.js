'use strict';

let cssConsoleOk = 'padding: 0 3px; text-shadow: 1px 1px 2px #57fc7a'; // OK
let cssConsoleError = 'padding: 0 3px; text-shadow: 0 0 2px red'; // Error

// Task 2

const rain = () => {
    return Math.round(Math.random());
};

if (rain()) {
  console.log('Пошёл дождь. Возьмите зонт!');
} else {
  console.log('Дождя нет!');
}

// Task 3

const scoresMath = + prompt("Введите кол-во баллов по математике: ");
const scoresRussian = + prompt("Введите кол-во баллов по русскому языку: ");
const scoresInformatics = + prompt("Введите кол-во баллов по информатике: ");

if (Number.isNaN(scoresMath) && Number.isNaN(scoresRussian) && Number.isNaN(scoresInformatics)) {
  console.log(`%cКажется вы ввели неверные данные`, cssConsoleError);
} else if ((scoresMath + scoresRussian + scoresInformatics) >= 265) {
  console.log(`%cПоздравляю, вы поступили на бюджет!`, cssConsoleOk);
} else {
  console.log(`Сожалею, но вы не зачислены.`);
}

// Task 4

const moneyForYou = + prompt("Сколько денег вы хотите снять?");

if (Number.isNaN(moneyForYou)) {
  console.log(`%cКажется вы ввели неверные данные`, cssConsoleError);
} else if (moneyForYou % 100 === 0) {
  console.log(`%cЭто возможно!`, cssConsoleOk);
} else {
  console.log(`Сожалею, но это не возможно.`);
}
