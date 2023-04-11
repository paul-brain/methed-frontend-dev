'use strict';

// hard_task_02

{
  const number1 = prompt("Введите первое число:");
  const number2 = prompt("Введите второе число:");

  const numberMin = (a, b) => {
    let min = a;

    (a > b) && (min = b);

    return min;
  };

  alert('Минимальное из двух: ' + numberMin(number1, number2));
}
