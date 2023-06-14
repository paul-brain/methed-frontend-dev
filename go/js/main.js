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

const faq = document.querySelector('.faq');
faq.addEventListener('click', ({target}) => {
  console.log(target);
}, true);

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const callBtn = document.querySelector('.header__btn');

callBtn.addEventListener('click', () => {
  overlay.classList.add('overlay--show');
  modal.style.opacity = 1;
});

overlay.addEventListener('click', ({target}) => {
  if (target.classList.contains('modal__btn-close') || target === overlay) {
    overlay.classList.remove('overlay--show');
    modal.style.opacity = 0;
  }

});
