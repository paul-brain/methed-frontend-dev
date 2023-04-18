'use strict';

// Task 06: Игровой бот "Угадай число" (усовершенствованный)

{
  const from = + prompt('Играем в "Угадай число". Введите начало диапозона чисел:');
  const to = + prompt('Играем в "Угадай число". Введите конец диапозона чисел:');

  if (from === to) throw new Error('Извини, я не знаю как быть в таком случае :(');

  if (! Number.isNaN(from) && ! Number.isNaN(to)) {
    const numbers = [];
    const guessNumber = getRandomIntInclusive(from, to);
    let numberOfAttempts = Math.round(0.3 * Math.abs(from - to));
    let yourNumber = prompt(`Я загадал число! Введите ваш вариант. У вас ${numberOfAttempts} попытк(а/и/ок):`);

    while (yourNumber !== null) {
      yourNumber = Number(yourNumber);

      if (! Number.isNaN(yourNumber)) {
        if (numbers.includes(yourNumber)) {
          alert('Это число вы уже вводили!');
          yourNumber = prompt('Введите новый вариант:');
          continue;
        }

        numbers.push(yourNumber);

        if (yourNumber > guessNumber) {
          alert('Меньше!');
        } else if (yourNumber < guessNumber) {
          alert('Больше!');
        } else {
          alert('Правильно!');
          break;
        }

        numberOfAttempts--;

        if (numberOfAttempts !== 0) {
          yourNumber = prompt('Введите новый вариант:');
        } else {
          console.log('Ваши попытки закончились! Game over :) Загаданное число:', guessNumber, 'Ваши ответы:', numbers);
          break;
        }
      } else {
        yourNumber = prompt('Введи число!');
      }
    }

    console.log('Конец игры.');
  } else {
    console.log('Я работаю только с числами!!!');
  }
}
