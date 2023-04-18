'use strict';

// Task 05: Игровой бот "Угадай число"

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  (min > max) && ([min, max] = [max, min]); // ставим по возрастанию

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const guessNumber = getRandomIntInclusive(1, 100);
let yourNumber = prompt('Играем в "Угадай число от 1 до 100". Введите ваш вариант:');

while (yourNumber !== null) {
  yourNumber = Number(yourNumber);

  if (! Number.isNaN(yourNumber)) {
    if (yourNumber > guessNumber) {
      alert('Меньше!');
    } else if (yourNumber < guessNumber) {
      alert('Больше!');
    } else {
      alert('Правильно!');
      break;
    }

    yourNumber = prompt('Введите новый вариант:');
  } else {
    yourNumber = prompt('Введи число!');
  }
}

console.log('Конец игры.');
