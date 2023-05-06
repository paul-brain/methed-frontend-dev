'use strict';

// Task 01: Игровой бот "Угадай число" (рекурсия)

console.log('Задача 1. Игровой бот "Угадай число" (рекурсия):');

const from = + prompt('Играем в "Угадай число". Введите начало диапозона чисел:');
const to = + prompt('Играем в "Угадай число". Введите конец диапозона чисел:');

if (! Number.isNaN(from) && ! Number.isNaN(to)) {
  const numbers = [];
  const guessNumber = getRandomIntInclusive(from, to);
  let numberOfAttempts = Math.round(0.3 * Math.abs(from - to));

  if (numberOfAttempts === 0) {
    throw new Error('Диапазон слишком мал, попыток нет. Конец игры.');
  }

  let yourNumber = prompt(`Я загадал число! Введите ваш вариант. У вас ${numberOfAttempts} попытк(а/и/ок):`);

  if (yourNumber !== null) {
    guessTheNumber(yourNumber, guessNumber, numberOfAttempts, numbers);
  }

  console.log('Конец игры.');
} else {
  console.log('Я работаю только с числами!!!');
}

/* Реализация рекурсивной функции */

function guessTheNumber(yourNum, guessNum, numOfAttempts, numbers) {
  if (yourNum === null) {
    return;
  }

  yourNum = Number(yourNum);

  if (yourNum === guessNum) {
    alert('Правильно!');
    return;
  }

  let message = 'Введите новый вариант:';

  if (! Number.isNaN(yourNum) && ! numbers.includes(yourNum)) {
    numbers.push(yourNum);

    if (yourNum > guessNum) {
      alert('Меньше!');
    }

    if (yourNum < guessNum) {
      alert('Больше!');
    }

    if (numOfAttempts === 1) {
      console.log('Ваши попытки закончились! Game over :) Загаданное число:', guessNum, 'Ваши ответы:', numbers);
      return;
    }
  } else {
    if (Number.isNaN(yourNum)) {
      message = 'Введите число!';
      numOfAttempts++;
    }

    if (numbers.includes(yourNum)) {
      alert('Это число вы уже вводили!');
      numOfAttempts++;
    }
  }

  yourNum = prompt(message);

  guessTheNumber(yourNum, guessNum, numOfAttempts - 1, numbers);
}
