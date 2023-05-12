'use strict';

// The game: rock, scissors and paper

(() => {
  const FIGURES = ['камень', 'ножницы', 'бумага'];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    (min > max) && ([min, max] = [max, min]); // ставим по возрастанию

    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  };

  const game = () => {
    let win = 'player';
    //const winCombination = ['к н', 'н б', 'б к'];  // 0 1 1 2 2 0
    const winCombination = FIGURES.reduce((comb, item, i, arr) => { // кннббк
      let j = i !== 2 ? i + 1 : 0;
      return comb + arr[i][0] + arr[j][0];
    }, '');

    return function start() {
      let playerChoice = prompt('Камень, Ножницы, Бумага?');

      if (playerChoice === null) {
        return; // undefined
      }

      const computerChoiceIndex = getRandomIntInclusive(0, 2);
      const computerChoice = FIGURES[computerChoiceIndex][0];
      playerChoice = playerChoice.trim();

      if (playerChoice !== '') {
        playerChoice = playerChoice.toLocaleLowerCase()[0];

        if (winCombination.includes(playerChoice)) {
          const playerChoiceIndex = FIGURES.findIndex(item => item[0] === playerChoice);
          const message = `Компьютер: ${FIGURES[computerChoiceIndex]}\nВы: ${FIGURES[playerChoiceIndex]}\n`;

          console.log(computerChoice, playerChoice);

          if (computerChoice === playerChoice) {
            alert(message + 'Ничья');
          } else {
            if (winCombination.includes(computerChoice + playerChoice)) {
              win = 'computer';
              alert(message + 'Компьютер победил! Он начинает первым.');
            } else {
              alert(message + 'Вы победили! Вы начинаете первым.');
            }

            return win;
          }
        }
      }

      return start();
    };
  };

  window.rsp = game;
})();
