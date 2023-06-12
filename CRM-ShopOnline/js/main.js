'use strict';

const timer = () => {
  const timerElement = document.querySelector('.banner__timer');
  const deadline = timerElement.dataset.timerDeadline;

  // Заголовок таймера
  const timerTitle = document.createElement('p');
  timerTitle.classList.add('timer__title');
  timerTitle.textContent = 'До конца акции осталось:';

  // Блок: дни
  const timerItemDays = document.createElement('p');
  const timerCountDays = document.createElement('span');
  const timerUunitsDays = document.createElement('span');
  timerItemDays.classList.add('timer__item', 'timer__item-days');
  timerCountDays.classList.add('timer__count', 'timer__count-days');
  timerUunitsDays.classList.add('timer__units', 'timer__units-days');
  timerItemDays.append(timerCountDays, timerUunitsDays);

  // Блок: часы
  const timerItemHours = document.createElement('p');
  const timerCountHours = document.createElement('span');
  const timerUunitsHours = document.createElement('span');
  timerItemHours.classList.add('timer__item', 'timer__item-hours');
  timerCountHours.classList.add('timer__count', 'timer__count-hours');
  timerUunitsHours.classList.add('timer__units', 'timer__units-hours');
  timerItemHours.append(timerCountHours, timerUunitsHours);

  // Блок: минуты
  const timerItemMinutes = document.createElement('p');
  const timerCountMinutes = document.createElement('span');
  const timerUunitsMinutes = document.createElement('span');
  timerItemMinutes.classList.add('timer__item', 'timer__item-minutes');
  timerCountMinutes.classList.add('timer__count', 'timer__count-minutes');
  timerUunitsMinutes.classList.add('timer__units', 'timer__units-minutes');
  timerItemMinutes.append(timerCountMinutes, timerUunitsMinutes);

  // Блок: секунды
  const timerItemSeconds = document.createElement('p');
  const timerCountSeconds = document.createElement('span');
  const timerUunitsSeconds = document.createElement('span');
  timerItemSeconds.classList.add('timer__item', 'timer__item-seconds');
  timerCountSeconds.classList.add('timer__count', 'timer__count-seconds');
  timerUunitsSeconds.classList.add('timer__units', 'timer__units-seconds');
  timerItemSeconds.append(timerCountSeconds, timerUunitsSeconds);

  timerElement.classList.add('timer');
  timerElement.append(timerTitle, timerItemDays, timerItemHours, timerItemMinutes, timerItemSeconds);

  const elemDays = timerElement.querySelector('.timer__count-days');
  const elemHours = timerElement.querySelector('.timer__count-hours');
  const elemMinutes = timerElement.querySelector('.timer__count-minutes');
  const elemSeconds = timerElement.querySelector('.timer__count-seconds');

  const getRightUnit = (num, unit) => {
    let rightWords = {
      day: ['день', 'дня', 'дней'],
      hour: ['час', 'часа', 'часов'],
      min: ['минута', 'минуты', 'минут'],
      sec: ['секунда', 'секунды', 'секунд'],
    };
    let index;

    if (num !== 11 && num % 10 === 1) index = 0;
    else if (
      ! [12, 13, 14].includes(num)
      && [2, 3, 4].includes(num % 10)
    ) index = 1;
    else index = 2;

    return rightWords[unit][index];
  };

  const getTimeLeft = deadline => {
    const dateStop = new Date(deadline).getTime(); // +3 часа по Гринвичу
    const dateStopGMT = dateStop - 3 * 60 * 60 * 1000;

    const dateNow = new Date();
    const offset = dateNow.getTimezoneOffset() * 60 * 1000;
    const dateNowGMT = dateNow.getTime() + offset;
    const timeLeft = (dateStopGMT - dateNowGMT) / 1000; // в секундах

    const sec = Math.floor(timeLeft % 60);
    const min = Math.floor(timeLeft / 60 % 60);
    const hours = Math.floor(timeLeft / 60 / 60 % 24);
    const days = Math.floor(timeLeft / 60 / 60 / 24);

    return {
      timeLeft,
      sec,
      min,
      hours,
      days,
    };
  };

  const start = () => {
    const {timeLeft, sec, min, hours, days} = getTimeLeft(deadline);

    elemDays.textContent = days;
    elemDays.nextElementSibling.textContent = getRightUnit(days, 'day');
    elemHours.textContent = hours.toString().padStart(2, '0');
    elemHours.nextElementSibling.textContent = getRightUnit(hours, 'hour');
    elemMinutes.textContent = min.toString().padStart(2, '0');
    elemMinutes.nextElementSibling.textContent = getRightUnit(min, 'min');
    elemSeconds.textContent = sec.toString().padStart(2, '0');
    elemSeconds.nextElementSibling.textContent = getRightUnit(sec, 'sec');

    if (days > 0) {
      timerItemSeconds.remove();
      // timerItemSeconds.style.display = 'none';
      // timerItemDays.style.display = 'block';
    } else {
      timerItemDays.remove();
      timerElement.append(timerItemSeconds);
      // timerItemDays.style.display = 'none';
      // timerItemSeconds.style.display = 'block';
    }

    const intervalId = setTimeout(start, 1000);

    if (timeLeft <= 0) {
      clearTimeout(intervalId);

      elemHours.textContent = '00';
      elemMinutes.textContent = '00';
      elemSeconds.textContent = '00';

      timerElement.remove();
    }
  };

  start();
};
