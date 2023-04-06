'use strict';

{
  let cssConsoleOk = 'padding: 0 3px; text-shadow: 1px 1px 2px #57fc7a'; // OK
  let cssConsoleError = 'padding: 0 3px; text-shadow: 0 0 2px red'; // Error

  // Task hard 1

  const revenue = + prompt("Введите ваш доход:");
  let tax; // ставка налога
  let taxRevenue; // сумма налога

  if (revenue <= 0 || Number.isNaN(revenue)) {
    console.log(`%cКажется вы ввели неверные данные`, cssConsoleError);
  } else {

    if (revenue < 15000) {
      tax = 0.13;
    } else if (revenue >= 15000 && revenue < 50000) {
      tax = 0.2;
    } else {
      tax = 0.3;
    }

    taxRevenue = revenue * tax;

    console.log(`%cСтавка налога: ${tax}, сумма налога: ${Math.trunc(taxRevenue)}`, cssConsoleOk);
  }
}
