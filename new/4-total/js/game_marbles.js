'use strict';

// The game: Marbles

(() => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    (min > max) && ([min, max] = [max, min]); // ставим по возрастанию

    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  };

  const getCurrent = (current) => {
    if (current === 'computer') {
      return ['computer', 'player'];
    } else {
      return ['player', 'computer'];
    }
  };

  const changeCurrent = current => {
    if (current === 'computer') {
      return ['player', 'computer'];
    } else {
      return ['computer', 'player'];
    }
  };

  const validNumber = (num, max) => {
    if (Number.isInteger(num)) {
      if (num >= 1 && num <= max) {
        return true;
      }
    }

    return false;
  };

  const game = (curr) => {
    const balls = {
      player: 5,
      computer: 5,
    };
    const names = {
      player: 'ИГРОК',
      computer: 'КОМПЬЮТЕР',
    };
    let [current, next] = getCurrent(curr);

    return function start() {
      let firstPlayerChoice, secondPlayerChoice, secondPlayerChoiceWord, message;

      if (current == 'player') {
        do {
          firstPlayerChoice = prompt(`Загадайте число от 1 до ${balls[current]}:`);

          if (firstPlayerChoice === null) {
            console.log(`Конец игры. Шариков:\nУ вас: ${balls.player}\nУ компа: ${balls.computer}`);

            return;
          }

          firstPlayerChoice = Number(firstPlayerChoice);
        } while (! validNumber(firstPlayerChoice, balls.player));

        secondPlayerChoice = getRandomIntInclusive(0, 1); // 0 четное, 1 нечетное
        message = ['Ваш выбор: ', '\nВыбор компьютера: '];
      } else {
        firstPlayerChoice = getRandomIntInclusive(1, balls[current]);
        secondPlayerChoice = + confirm(`Загадайте четное/нечетное:\nОК – нечетное, Отмена – четное`);
        message = ['Выбор компьютера: ', '\nВаш выбор: '];
      }

      secondPlayerChoiceWord = secondPlayerChoice === 0 ? 'четное' : 'нечетное';
      message = message[0] + firstPlayerChoice + message[1] + secondPlayerChoiceWord;

      if (firstPlayerChoice % 2 === secondPlayerChoice) { // Второй угадал и забирает шары
        balls[current] -= firstPlayerChoice;
        balls[next] += firstPlayerChoice;
        message +=  `\nШарики забирает: ${names[next]}`;
      } else {
        balls[current] += firstPlayerChoice;
        balls[next] -= firstPlayerChoice;
        message +=  `\nШарики забирает: ${names[current]}`;
      }

      console.log(`${names[current]}: ` + firstPlayerChoice, `${names[next]}: ` + secondPlayerChoiceWord);
      console.log(balls.player, balls.computer);

      alert(message);

      if (balls.player <= 0 || balls.computer <= 0) {
        let win = names.player;

        (balls.computer > balls.player) && (win = names.computer);

        console.log(`Победитель: ${win}`);

        return;
      }

      [current, next] = changeCurrent(current);

      start();
    };
  };

  window.marbles = game;
})();
