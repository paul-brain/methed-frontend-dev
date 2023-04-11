'use strict';

// Task 02

const isPrime = number => {
  let flag = true;

  if (num) {
    for (let i = 2; i < num - 1; i++) {
      if (num % i == 0) {
        flag = false;
        break;
      }
    }

    return flag ? 'Простое' : 'Составное';
  } else {
    return 'Кажется вы ввели некорректные данные.';
  }
};

const num = + prompt('Введите целое число для проверки на "простоту":');

alert(isPrime(num));
