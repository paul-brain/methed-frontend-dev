import {createTimerBlock} from './createElements.js';

export const timer = () => {
  const timerElement = document.querySelector('.banner__timer');
  const deadline = timerElement.dataset.timerDeadline;

  // Заголовок таймера
  const timerTitle = document.createElement('p');
  timerTitle.classList.add('timer__title');
  timerTitle.textContent = 'До конца акции осталось:';

  const {termWrapper: timerDaysWrapper, timerCountElement: timerDaysCountElement} = createTimerBlock('days');
  const {termWrapper: timerHoursWrapper, timerCountElement: timerHoursCountElement} = createTimerBlock('hours');
  const {termWrapper: timerMinutesWrapper, timerCountElement: timerMinutesCountElement} = createTimerBlock('minutes');
  const {termWrapper: timerSecondsWrapper, timerCountElement: timerSecondsCountElement} = createTimerBlock('seconds');

  timerElement.classList.add('timer');
  timerElement.append(timerTitle, timerDaysWrapper, timerHoursWrapper, timerMinutesWrapper, timerSecondsWrapper);

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

    timerDaysCountElement.textContent = days;
    timerDaysCountElement.nextElementSibling.textContent = getRightUnit(days, 'day');
    timerHoursCountElement.textContent = hours.toString().padStart(2, '0');
    timerHoursCountElement.nextElementSibling.textContent = getRightUnit(hours, 'hour');
    timerMinutesCountElement.textContent = min.toString().padStart(2, '0');
    timerMinutesCountElement.nextElementSibling.textContent = getRightUnit(min, 'min');
    timerSecondsCountElement.textContent = sec.toString().padStart(2, '0');
    timerSecondsCountElement.nextElementSibling.textContent = getRightUnit(sec, 'sec');

    if (days > 0) {
      timerSecondsWrapper.remove();
      // timerItemSeconds.style.display = 'none';
      // timerItemDays.style.display = 'block';
    } else {
      timerDaysWrapper.remove();
      timerElement.append(timerSecondsWrapper);
      // timerItemDays.style.display = 'none';
      // timerItemSeconds.style.display = 'block';
    }

    const intervalId = setTimeout(start, 1000);

    if (timeLeft <= 0) {
      clearTimeout(intervalId);

      timerHoursCountElement.textContent = '00';
      timerMinutesCountElement.textContent = '00';
      timerSecondsCountElement.textContent = '00';

      timerElement.remove();
    }
  };

  start();
};
