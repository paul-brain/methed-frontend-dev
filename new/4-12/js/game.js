'use strict';

// The game: rock, scissors and paper

(() => {
  const FIGURES_ENG = ['rock', 'scissors', 'paper'];
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];
  const LANGUAGE_RUS = new Map([
    ['name', 'Камень, Ножницы, Бумага?'],
    ['pc', 'Компьютер'],
    ['you', 'Вы'],
    ['result', 'Результат'],
    ['sure', 'Вы уверены?'],
    ['draw', 'Ничья!'],
    ['pc won', 'Компьютер победил!'],
    ['you won', 'Вы победили!'],
  ]);
  const LANGUAGE_ENG = new Map([
    ['name', 'Rock, Scissors, Paper?'],
    ['pc', 'PC'],
    ['you', 'You'],
    ['result', 'Result'],
    ['sure', 'Are you sure?'],
    ['draw', 'Drawn game!'],
    ['pc won', 'The computer is win!'],
    ['you won', 'You are win!'],
  ]);

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    (min > max) && ([min, max] = [max, min]); // ставим по возрастанию

    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  };

  const getLang = lang => {
    if (lang === 'EN' || lang === 'ENG') {
      return [FIGURES_ENG, LANGUAGE_ENG];
    } else {
      return [FIGURES_RUS, LANGUAGE_RUS];
    }
  };

  const game = (language) => {
    const [FIGURES, LANGUAGE] = getLang(language);
    const result = {
      player: 0,
      computer: 0,
    }

    //const winCombination = ['к н', 'н б', 'б к'];  // 0 1 1 2 2 0
    const winCombination = FIGURES.reduce((comb, item, i, arr) => { // кннббк
      let j = i !== 2 ? i + 1 : 0;
      return comb + arr[i][0] + arr[j][0];
    }, '');

    return function start() {
      let playerChoice = prompt(LANGUAGE.get('name'));

      if (playerChoice === null) {
        const sure = confirm(LANGUAGE.get('sure'));

        if (sure) {
          alert(`${LANGUAGE.get('result')}:\n${LANGUAGE.get('pc')}: ${result.computer}\n${LANGUAGE.get('you')}: ${result.player}`);
          return;
        }
      } else {
        const computerChoiceIndex = getRandomIntInclusive(0, 2);
        const computerChoice = FIGURES[computerChoiceIndex][0];
        playerChoice = playerChoice.trim();

        if (playerChoice !== '') {
          playerChoice = playerChoice.toLocaleLowerCase()[0];

          if (winCombination.includes(playerChoice)) {
            const playerChoiceIndex = FIGURES.findIndex(item => item[0] === playerChoice);
            const message = `${LANGUAGE.get('pc')}: ${FIGURES[computerChoiceIndex]}\n${LANGUAGE.get('you')}: ${FIGURES[playerChoiceIndex]}\n`;

            if (computerChoice === playerChoice) {
              alert(message + LANGUAGE.get('draw'));
            } else if (winCombination.includes(computerChoice + playerChoice)) {
              result.computer++;
              alert(message + LANGUAGE.get('pc won'));
            } else {
              result.player++;
              alert(message + LANGUAGE.get('you won'));
            }

            console.log(computerChoice, playerChoice);
          }
        }
      }

      start();
    };
  };

  window.rsp = game;
})();
