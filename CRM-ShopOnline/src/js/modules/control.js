import {updateCartCount} from './helpers.js';
import storage from './storage.js';

const {
  setStorage,
  removeStorage,
} = storage;

// События в шапке сайта (меню, корзина)
const headerControl = path => {
  // Переходим в корзину при клике на кнопку в шапке
  const btnCartAtHeader = document.querySelector('.navbar__btn--basket');

  btnCartAtHeader.addEventListener('click', () => {
    if (! path.includes('cart.html')) {
      window.location.href = 'cart.html';
    }
  });

  // Кнопка "Меню" в шапке: открыть/закрыть выпадающее меню
  const headerMenuBtn = document.querySelector('.header__menu-btn');
  const headerMenu = document.querySelector('.header__drop');

  headerMenuBtn.addEventListener('click', () => {
    headerMenuBtn.classList.toggle('header__menu-btn--close');
    headerMenu.classList.toggle('header__drop--open');
  });

  document.body.addEventListener('click', ({target}) => {
    if (
      ! target.classList.contains('header__menu-btn')
      && ! target.classList.contains('header__drop')
      ) {
      headerMenuBtn.classList.remove('header__menu-btn--close');
      headerMenu.classList.remove('header__drop--open');
    }
  });
};

// События в футере (меню и др)
const footerControl = () => {
  /* Меню в футере на мобильной версии */
  const footerMenuName = document.querySelector('.footer__menu-name');

  footerMenuName.addEventListener('click', () => {
    if (screen.width <= 540) {
      if (footerMenuName.classList.contains('footer__menu-name--opened')) {
        footerMenuName.classList.remove('footer__menu-name--opened');
        footerMenuName.nextElementSibling.style.display = 'none';
      } else {
        footerMenuName.classList.add('footer__menu-name--opened');
        footerMenuName.nextElementSibling.style.display = 'flex';
      }
    }
  });
};

// События на странице твоара (добавление в корзину)
const productEventsControl = (productElem, cart) => {
  const btnAddToCart = productElem.querySelector('.product__btn-cart');

  // Добавление товара в корзину
  btnAddToCart.addEventListener('click', () => {
    const productId = btnAddToCart.dataset.id;
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cart[productIndex].count++;
    } else {
      cart.push({
        id: productId,
        count: 1,
      });
    }

    setStorage('cart', cart);
    updateCartCount(cart);
    alert('Товар добавлен в корзину.');
  });
};

// События на странице корзины (выбор товаров, кол-во, удаление)
const cartEventsControl = (cartElem, cart) => {
  /* Кнопка «Выбрать всё» */
  const inputChooseAll = cartElem.querySelector('[name="chooseAll"]');
  inputChooseAll.addEventListener('change', () => {
    const inputChooseOne = cartElem.querySelectorAll('[name="chooseOne"]');

    if (inputChooseAll.checked === true) {
      inputChooseOne.forEach(btn => btn.checked = true);
    } else {
      inputChooseOne.forEach(btn => btn.checked = false);
    }
  });

  /* Кнопка «Удалить» */
  const btnCartDelete = cartElem.querySelectorAll('.cart__btn-delete');
  btnCartDelete.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputChooseOne = cartElem.querySelectorAll('[name="chooseOne"]');
      let deleted = 0;

      inputChooseOne.forEach(btn => {
        if (btn.checked === true) {
          const productId = btn.closest('.cart__item').dataset.id;
          removeStorage('cart', productId);
          deleted++;
        }
      });

      if (deleted === 0) {
        alert('Ни один товар не выбран!');
      } else {
        window.location.reload();
      }
    });
  });

  /* Кнопка «+» - прибавить кол-во */
  const btnIncreaseCount = cartElem.querySelectorAll('.cart__item-btn-plus');
  btnIncreaseCount.forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = btn.closest('.cart__item').dataset.id;
      const productIndex = cart.findIndex(item => item.id === productId);

      if (productIndex !== -1) {
        cart[productIndex].count++;
      }

      setStorage('cart', cart);
      window.location.reload();
    });
  });

  /* Кнопка «-» - убавить кол-во */
  const btnDecreaseCount = cartElem.querySelectorAll('.cart__item-btn-minus');
  btnDecreaseCount.forEach(btn => {
    btn.addEventListener('click', () => {
      const countNumber = +btn.nextSibling.textContent;
      const productId = btn.closest('.cart__item').dataset.id;

      if (countNumber > 1) {
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
          cart[productIndex].count--;
        }

        setStorage('cart', cart);
      } else {
        removeStorage('cart', productId);
      }

      window.location.reload();
    });
  });
};

export default {
  headerControl,
  footerControl,
  productEventsControl,
  cartEventsControl,
};
