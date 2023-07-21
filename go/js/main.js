/* Частые вопросы: реализация аккордиона */
const faqListBtns = document.querySelectorAll('.faq__list-item-btn');
const faqListTexts = document.querySelectorAll('.faq__list-item-text-wrapper');

faqListBtns.forEach((btn, btnIndex) => {
  btn.addEventListener('click', () => {
    faqListTexts.forEach((text, textIndex) => {
      if (btnIndex === textIndex) {
        if (text.parentElement.classList.contains('faq__list-item--active')) {
          text.style.height = '';
        } else {
          text.style.height = `${text.scrollHeight}px`;
        }

        btn.parentElement.classList.toggle('faq__list-item--active');
      } else {
        text.parentElement.classList.remove('faq__list-item--active');
        text.style.height = '';
      }
    });
  });
});

/* Кнопка "Заказать звонок": открыть/закрыть модальное окно */
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const callBtn = document.querySelector('.header__btn');

callBtn.addEventListener('click', () => {
  overlay.classList.add('overlay--show');
});

overlay.addEventListener('click', ({target}) => {
  if (
    target.classList.contains('modal__btn-close')
    || target === overlay
    ) {
    overlay.classList.remove('overlay--show');
  }
});

/* Кнопка "Бургер": открыть/закрыть меню */
const burgerBtn = document.querySelector('.header__nav-btn');
const headerMenu = document.querySelector('.header__nav-list');
let scale = 0;

const showMenu = () => {
  scale += 0.05;
  headerMenu.style.transform = `scale(${scale})`;

  if (scale < 1) {
    requestAnimationFrame(showMenu);
  } else {
    scale = 0;
  }
};

// Открываем/закрываем меню по кнопке с анимацией
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('header__nav-btn--close');
  headerMenu.classList.toggle('header__nav-list--open');

  if (headerMenu.classList.contains('header__nav-list--open')) {
    showMenu();
  } else {
    headerMenu.style.transform = `scale(0)`;
  }
});

document.body.addEventListener('click', ({target}) => {
  if (
    ! target.classList.contains('header__nav-btn')
    && ! target.classList.contains('header__nav-list')
    // && ! target.parentElement.classList.contains('header__nav-item') // Не закрывает при клике на пункт меню
    ) {
    burgerBtn.classList.remove('header__nav-btn--close');
    headerMenu.classList.remove('header__nav-list--open');
  }
});

/* Перемещаем кнопку "Заказать звонок" внутрь меню на мобильной версии */
window.addEventListener('DOMContentLoaded', () => {
  if (document.documentElement.scrollWidth <= 768) {
    const li = document.createElement('li');

    li.classList.add('header__nav-item');
    li.append(callBtn);
    headerMenu.append(li);
    callBtn.style.display = 'inline-block';
  }
});

/* Секция «ОТЗЫВЫ ПОСЕТИТЕЛЕЙ» – запускаем слайдер Swiper JS*/
new Swiper('.swiper', {
  loop: true,
  navigation: {
    nextEl: '.testimonials__btn--next',
    prevEl: '.testimonials__btn--prev',
  },
  /* autoplay: {
    delay: 2000,
  }, */
});

/* Валидация формы с помощью Just Validate */
const telMask = new Inputmask('+7 (999) 999-99-99');
const inputTel = document.getElementsByName('phone_number')[0];

telMask.mask(inputTel);

const validate = new JustValidate('.reservation__form');

validate
  .addField('[name="firstname"]', [
    {
      rule: 'required',
      errorMessage: 'Имя обязательно',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Не короче 2 символов',
    },
  ])
  .addField('[name="lastname"]', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Не короче 2 символов',
    },
  ])
  .addField('[name="email"]', [
    {
      rule: 'required',
      errorMessage: 'Email обязателен',
    },
    {
      rule: 'email',
      errorMessage: 'Email не корректен',
    },
  ])
  .addField('[name="phone_number"]', [
    {
      rule: 'required',
      errorMessage: 'Телефон обязателен',
    },
    {
      validator(value) {			// value не чистое, типа '+7 (968) 875-23-98'
        const phone = inputTel.inputmask.unmaskedvalue();	// Достаём чистое значение

        return !!(Number(phone) && phone.length === 10);
      },
      errorMessage: 'Телефон не корректен',
    },
  ]);

/* Работа с формой: дата и время, календарь */
