/* Работа с модальным окном «Заказать дом» */
const modalOpenBtn = $('.present__btn');
const modalCloseBtn = $('.modal-order__close');
const modalOverlay = $('.modal-order');

modalOpenBtn.click(function () {
  modalOverlay.fadeIn(300);
});

modalCloseBtn.click(function () {
  modalOverlay.fadeOut(300);
});

modalOverlay.click(function (e) {
  e.target === this && modalOverlay.fadeOut(300);
});

/* Работа с бургер-меню в шапке */
const headerBurgerBtn = $('.header__burger');
const headerNavigation = $('.header__navigation');

headerBurgerBtn.click(function (e) {
  e.stopPropagation();

  headerNavigation.animate({
    left: 0,
  }, 500);
});

$('body').click(function (e) {
  if (! $(e.target).hasClass('header__navigation')) {
    headerNavigation.animate({
      left: '-400px',
    }, 300);
  }
});

/* Работа с аккордионом «Характеристики» */
const characteristicsTitleBtn = $('.characteristics__title');
const characteristicsDescription = $('.characteristics__description');

characteristicsTitleBtn.click(function (e) {
  $(this).toggleClass('active');
  $(this).next().toggleClass('active');

  characteristicsTitleBtn.each((i, item) => {
    if (item !== this) {
      $(item).removeClass('active');
      $(item).next().removeClass('active');
    }
  });

});
