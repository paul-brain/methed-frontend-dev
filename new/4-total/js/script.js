// Играем в шарики "Marbles"

const startRSP = rsp();
let first, startMarbles;

do {
  first = startRSP(); // Узнаем кто начнет первым.

  if (first === undefined) {
    break;
  }

  startMarbles = marbles(first);
  startMarbles();
} while (confirm(`Хотите сыграть еще?`));

console.log('Спасибо за игру! Ждём вас снова!');
