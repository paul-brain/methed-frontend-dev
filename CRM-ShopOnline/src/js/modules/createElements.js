/* Страница «Блог» */
const createItemPost = (id, title) => {
  const postElement = document.createElement('li');

  postElement.classList.add('blog__item');
  postElement.dataset.id = id;
  postElement.insertAdjacentHTML('beforeend', `
  <a href="article.html?id=${id}" class="blog__item-url">
    <figure class="blog__item-poster">
      <img class="blog__item-img" src="img/blog/Unexplored places of Lake Baikal.png" alt="Unexplored places of Lake Baikal">
    </figure>
    <div class="blog__item-wrapper">
      <h3 class="blog__item-title">${title}</h3>
      <div class="blog__item-published">06 марта 2020, 15:34</div>
      <div class="blog__item-meta">
        <span class="blog__item-views">1.6K</span>
        <span class="blog__item-comments">0</span>
      </div>
    </div>
  </a>
  `);

  return postElement;
};

/* Страница «Статья блога» */
const createArticle = (title, body, name) => {
  const articleElement = document.createElement('div');

  articleElement.classList.add('article');
  articleElement.insertAdjacentHTML('beforeend', `
  <h1 class="article__title">${title}</h1>
  <div class="article__description">
    ${body}
  </div>
  <div class="article__meta">
    <div class="article__author">${name}</div>
    <div class="article__published">06 марта 2020, 15:34</div>
    <div class="article__params">
      <span class="article__views">1.6K</span>
      <span class="article__comments">0</span>
    </div>
    <a href="" class="article__back-link">К списку статей</a>
  </div>
  `);

  return articleElement;
};

/* Пагинация для блога */
const createPagination = (totalPostCount, totalPageCount, pageNum) => {
  if (totalPageCount <= 1) return null;

  const pagination = document.createElement('div');
  pagination.classList.add('pagination');

  const pagePrev = pageNum - 1;
  const pageNext = pageNum + 1;
  let pageItems = [];

  // Проверка: мы на первой странице? Формируем стрелку ВЛЕВО
  const pagePrevElem = pagePrev === 0 ? document.createElement('span') : document.createElement('a');
  pagePrevElem.classList.add('pagination__item', 'pagination__item--prev');

  if (pagePrev) {
    const pagePrevLink = pagePrev === 1 ? 'blog.html' : 'blog.html?page=' + pagePrev;
    pagePrevElem.setAttribute('href', pagePrevLink);
  }

  // Проверка: мы на последней странице? Формируем стрелку ВПРАВО
  const pageNextElem = pageNum === totalPageCount ? document.createElement('span') : document.createElement('a');
  pageNextElem.classList.add('pagination__item', 'pagination__item--next');

  if (pageNum !== totalPageCount) {
    const pageNextLink = 'blog.html?page=' + pageNext;
    pageNextElem.setAttribute('href', pageNextLink);
  }

  // Формируем все элементы навигации
  for (let i = 1; i <= totalPageCount; i++) {
    const elem = i === pageNum ? document.createElement('span') : document.createElement('a');
    elem.classList.add('pagination__item');
    elem.textContent = i;

    if (i !== pageNum) {
      const pageLink = i === 1 ? 'blog.html' : 'blog.html?page=' + i;
      elem.setAttribute('href', pageLink);
    } else {
      elem.classList.add('pagination__item--current');
    }

    pageItems.push(elem);

    if (i == 10) break;
  }

  pagination.append(pagePrevElem, ...pageItems, pageNextElem);

  return pagination;
};

/* Страница «Категория товара» */
const createItemProduct = (product) => {
  const src = 'https://knowledgeable-mammoth-parka.glitch.me/';
  const productElement = document.createElement('li');
  let discount = '';
  let newPrice = product.price;
  let oldPrice = '';
  let img = 'img/no-image.jpg';

  if (product.discount > 0) {
    discount = `<div class="item-card__discount">-${product.discount}%</div>`;
    newPrice = product.price - product.price * product.discount / 100;
    oldPrice = `<span class="item-card__price-old">${product.price} ₽</span>`;
  }

  if (product.image !== 'image/notimage.jpg') {
    img = src + product.image;
  }

  productElement.classList.add('goods__item', 'item-card');
  productElement.dataset.id = product.id;
  productElement.insertAdjacentHTML('beforeend', `
  <a href="product.html?id=${product.id}" class="item-card__link">
    <figure class="item-card__poster">
      <img src="${img}" alt="${product.title}" class="item-card__img">
      ${discount}
      </figure>
      <div class="item-card__prices">
      <span class="item-card__price-new">${newPrice} ₽</span>
      ${oldPrice}
    </div>
    <div class="item-card__name">${product.title}</div>
  </a>
  `);

  return productElement;
};

/* Страница «Товар» */
const createProduct = (product) => {
  const src = 'https://knowledgeable-mammoth-parka.glitch.me/';
  let img = 'img/no-image.jpg';

  if (product.image !== 'image/notimage.jpg') {
    img = src + product.image;
  }

  const productElement = document.createDocumentFragment();
  let discount = '';
  let newPrice = product.price;
  let oldPrice = '';

  if (product.discount > 0) {
    discount = `<div class="product__discount">-${product.discount}%</div>`;
    newPrice = product.price - product.price * product.discount / 100;
    oldPrice = `<div class="product__price-old">${product.price} ₽</div>`;
  }

  const h1 = document.createElement('h1');
  h1.classList.add('product__title');
  h1.textContent = product.title;

  const productWrapper = document.createElement('div');
  productWrapper.classList.add('product__wrapper');

  const productDescription = document.createElement('div');
  productDescription.classList.add('product__description');

  productWrapper.insertAdjacentHTML('beforeend', `
  <div class="product__photos">
    <picture class="product__picture">
      <img class="product__img" src="${img}" alt="${product.title}">
    </picture>
    ${discount}
  </div>
  <div class="product__info-block">
    <div class="product__prices">
      <div class="product__price-new">${newPrice} ₽</div>
      ${oldPrice}
    </div>
    <div class="product__credit-info">В кредит от ${newPrice / 10} ₽</div>
    <button class="product__btn-cart" data-id="${product.id}">Добавить в корзину</button>
    <button class="product__btn-favorite" data-id="${product.id}"><svg width="33" height="33" viewBox="0 0 33 33" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.6875 4.125C20.295 4.125 17.9987 5.23875 16.5 6.99875C15.0012 5.23875 12.705 4.125 10.3125 4.125C6.0775 4.125 2.75 7.4525 2.75 11.6875C2.75 16.885 7.425 21.12 14.5062 27.555L16.5 29.3563L18.4937 27.5413C25.575 21.12 30.25 16.885 30.25 11.6875C30.25 7.4525 26.9225 4.125 22.6875 4.125ZM16.6375 25.5062L16.5 25.6437L16.3625 25.5062C9.8175 19.58 5.5 15.6613 5.5 11.6875C5.5 8.9375 7.5625 6.875 10.3125 6.875C12.43 6.875 14.4925 8.23625 15.2212 10.12H17.7925C18.5075 8.23625 20.57 6.875 22.6875 6.875C25.4375 6.875 27.5 8.9375 27.5 11.6875C27.5 15.6613 23.1825 19.58 16.6375 25.5062Z"/>
      </svg></button>
    <div class="product__delivery-seller">
      <div class="product__delivery"><span>Доставка</span>1-3 января</div>
      <div class="product__seller"><span>Продавец</span>ShopOnline</div>
    </div>
    <div class="product__notify">Узнать о снижении цены</div>
  </div>
  `);

  productDescription.insertAdjacentHTML('beforeend', `
  <p class="product__description-head">Описание:</p>
  <p>${product.description}</p>
  `);

  productElement.append(h1, productWrapper, productDescription);

  return productElement;
};

/* Страница «Корзина» */
const createCartGoods = (count) => {
  const cartGoodsElement = document.createElement('div');

  cartGoodsElement.classList.add('cart__goods');
  cartGoodsElement.insertAdjacentHTML('beforeend', `
  <h1 class="cart__header">Корзина<span class="cart__count">${count}</span></h1>
    <div class="cart__actions">
      <label class="cart__checkbox-label">
        <input class="cart__checkbox-input" type="checkbox" name="chooseAll">
        Выбрать все
      </label>
      <button class="cart__btn-delete cart__btn-delete--all"></button>
    </div>
    <ul class="cart__list">
    </ul>
  </div>
  `);

  return cartGoodsElement;
};

const createCartItem = (product) => {
  const src = 'https://knowledgeable-mammoth-parka.glitch.me/';
  const cartItemElement = document.createElement('li');
  let newPrice = product.price;
  let oldPrice = '';
  let img = 'img/no-image.jpg';

  if (product.discount > 0) {
    newPrice = product.price - product.price * product.discount / 100;
    oldPrice = `<div class="cart__item-price-old">${product.price} ₽</div>`;
  }

  if (product.image !== 'image/notimage.jpg') {
    img = src + product.image;
  }

  cartItemElement.classList.add('cart__item');
  cartItemElement.dataset.id = product.id;
  cartItemElement.insertAdjacentHTML('beforeend', `
  <label class="cart__checkbox-label">
    <input class="cart__checkbox-input" type="checkbox" name="chooseOne">
  </label>
  <img class="cart__item-img" src="${img}" alt="${product.title}">
  <div class="cart__item-data">
    <h3 class="cart__item-title">
      <a class="cart__item-url" href="product.html?id=${product.id}">${product.title}</a>
    </h3>
    <ul class="cart__item-properties">
      <li class="cart__item-property">Цвет: черный</li>
      <li class="cart__item-property">Оперативная память: 16 ГБ</li>
    </ul>
  </div>
  <div class="cart__item-quantity">
    <button class="cart__item-btn-minus">-</button>
    ${product.count}
    <button class="cart__item-btn-plus">+</button>
  </div>
  <div class="cart__item-prices">
    <div class="cart__item-price">${newPrice} ₽</div>
    ${oldPrice}
    <div class="cart__item-price-on-credit">В кредит от ${newPrice / 10} ₽</div>
  </div>
  <button class="cart__btn-delete cart__btn-delete--one"></button>
  `);

  return cartItemElement;
};

export default {
  createItemPost,
  createArticle,
  createPagination,
  createItemProduct,
  createProduct,
  createCartGoods,
  createCartItem,
};
