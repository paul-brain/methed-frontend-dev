import {timer} from './modules/timer.js';
import {updateCartCount} from './modules/helpers.js';
import render from './modules/render.js';
import storage from './modules/storage.js';
import control from './modules/control.js';

const {getStorage} = storage;

const {
  renderMenuList,
  renderBlog,
  renderArticle,
  renderCategory,
  renderProduct,
  renderCart,
} = render;

const {
  headerControl,
  footerControl,
  productEventsControl,
  cartEventsControl,
} = control;

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const path = url.pathname;
  const cart = getStorage('cart');

  // Выводим в шапке число: кол-во товаров
  updateCartCount(cart);

  // Генерируем эл-ты меню в шапке и в футере
  renderMenuList();

  // События в шапке и футере
  headerControl(path);
  footerControl();

  // Выводим таймер на главной странице (index.html)
  if (path === '/' || path.includes('index.html')) {
    timer();
  }

  // Рендеринг блога (blog.html и article.html)
  if (path.includes('blog.html')) {
    const page = url.searchParams.get("page");

    renderBlog(page);
  } else if (path.includes('article.html')) {
    const id = url.searchParams.get("id");

    renderArticle(id);
  }

  // Рендеринг товаров (category.html и product.html)
  if (path.includes('category.html')) {
    const category = url.searchParams.get("cat");

    renderCategory(category);
  } else if (path.includes('product.html')) {
    const id = url.searchParams.get("id");

    renderProduct(id)
      .then(productElem => productEventsControl(productElem, cart));
  }

  // Рендеринг корзины (cart.html)
  if (path.includes('cart.html')) {
    renderCart(cart)
      .then(cartElem => cartEventsControl(cartElem, cart));
  }
});
