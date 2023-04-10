'use strict';

// hard_task_02

{
  const number1 = prompt("Введите первое число:");
  const number2 = prompt("Введите второе число:");

  const numberMin = (a, b) => (a - b) < 0 ? a : b;

  alert('Минимальное из двух: ' + numberMin(number1, number2));
}
