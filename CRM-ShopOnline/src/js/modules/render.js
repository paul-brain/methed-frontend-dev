import loadData from './loadData.js';
import createElements from './createElements.js';
import {getCartCount} from './helpers.js';
import {getTotalAmount} from './helpers.js';

const {
  loadPosts,
  loadArticle,
  loadAuthor,
  loadProducts,
  loadProduct,
  loadCategories,
} = loadData;

const {
  createItemPost,
  createArticle,
  createPagination,
  createItemProduct,
  createProduct,
  createCartGoods,
  createCartItem,
} = createElements;

const renderMenuList = async () => {
  const dropList = document.querySelector('.drop-menu__items');
  const footerList = document.querySelector('.footer__items');
  const categories = await loadCategories();

  categories.forEach(cat => {
    const dropMenuItem = document.createElement('li');
    const footerMenuItem = document.createElement('li');

    dropMenuItem.classList.add('drop-menu__item');
    dropMenuItem.insertAdjacentHTML('beforeend', `<a href="category.html?cat=${cat}" class="drop-menu__link">${cat}</a>`);
    footerMenuItem.classList.add('footer__item');
    footerMenuItem.insertAdjacentHTML('beforeend', `<a href="category.html?cat=${cat}" class="footer__link">${cat}</a>`);
    dropList.append(dropMenuItem);
    footerList.append(footerMenuItem);
  });
};

const renderBlog = async (page) => {
  const blogList = document.querySelector('.blog__list');
  const {
    posts,
    totalPostCount,
    totalPageCount,
    pageNum} = await loadPosts(page);
  const postsElements = posts.map(({id, title}) => createItemPost(id, title));
  const pagination = createPagination(totalPostCount, totalPageCount, pageNum);

  blogList.append(...postsElements);

  if (pagination) {
    blogList.parentElement.append(pagination);
  }
};

const renderArticle = async (id) => {
  const articleWrapper = document.querySelector('.blog-wrapper');
  const breadcrumbs = document.querySelectorAll('.breadcrumbs__item');
  const {
    user_id,
    title,
    body} = await loadArticle(id);
  const authorName = await loadAuthor(user_id);
  const articleElement = createArticle(title, body, authorName);

  articleWrapper.prepend(articleElement);
  breadcrumbs[breadcrumbs.length - 1].textContent = title;

  const backLink = articleElement.querySelector('.article__back-link');
  backLink.addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });
};

const renderCategory = async (category) => {
  const productsList = document.querySelector('.goods__list');
  const products = await loadProducts(category);
  const productElements = products.map((product) => createItemProduct(product));

  productsList.innerHTML = '';
  productsList.append(...productElements);
};

const renderProduct = async (id) => {
  const productWrapper = document.querySelector('.product');
  const breadcrumbs = document.querySelector('.breadcrumbs');
  const product = await loadProduct(id);
  const productElement = createProduct(product);

  productWrapper.innerHTML = '';
  productWrapper.append(productElement);
  breadcrumbs.lastElementChild.textContent = product.title;
  breadcrumbs.children[2].firstElementChild.textContent = product.category;
  breadcrumbs.children[2].firstElementChild.setAttribute('href', `category.html?cat=${product.category}`);

  return productWrapper;
};

const renderCart = async (cart) => {
  const cartElement = document.querySelector('.cart');

  if (cart.length === 0) {
    const emptyCart = document.createElement('h1');

    emptyCart.textContent = 'Корзина пуста';
    cartElement.replaceWith(emptyCart)
  } else {
    const products = await Promise.all([...cart.map(item => loadProduct(item.id))]);

    // Правильное количество товаров в корзине
    for (let i = 0; i < products.length; i++) {
      products[i].count = cart[i].count;
    }

    const productCartElements = products.map(product => createCartItem(product));

    // Формируем блок со списком товаров в корзине
    const cartGoodsBlock = createCartGoods(getCartCount(cart));
    const cartList = cartGoodsBlock.querySelector('.cart__list');

    // cartList.innerHTML = '';
    cartList.append(...productCartElements);
    const cartGoods = cartElement.querySelector('.cart__goods');
    const cartDeliveryGoods = cartElement.querySelector('.cart__delivery-goods');

    cartGoods.replaceWith(cartGoodsBlock);
    cartDeliveryGoods.innerHTML = '';

    // Формируем блок доставки (ссылки на товары "cart__delivery-goods")
    for (const one of products) {
      const src = 'https://knowledgeable-mammoth-parka.glitch.me/';
      let img = 'img/no-image.jpg';

      if (one.image !== 'image/notimage.jpg') {
        img = src + one.image;
      }

      cartDeliveryGoods.insertAdjacentHTML('beforeend', `
        <a class="cart__delivery-good-link" href="product.html?id=${one.id}">
          <img class="cart__delivery-good-img" src="${img}" alt="${one.title}">
        </a>
      `);
    }

    // Формируем блок ИТОГО
    const cartTotalPriceElement = document.querySelector('.cart__summary-total-price');
    const cartSummaryDetails = document.querySelector('.cart__summary-details');
    const [totalNew, totalOld] = getTotalAmount(products);
    const count = getCartCount(cart);

    cartTotalPriceElement.textContent = totalNew + ' ₽';
    cartSummaryDetails.innerHTML = '';
    cartSummaryDetails.insertAdjacentHTML('afterbegin', `
      <dt>Товары, ${count} шт.</dt>
      <dd>${totalNew} ₽</dd>
      <dt>Скидка</dt>
      <dd>${totalOld - totalNew} ₽</dd>
      <dt>Доставка</dt>
      <dd>Бесплатно</dd>
    `);
  }

  return cartElement;
};

export default {
  renderMenuList,
  renderBlog,
  renderArticle,
  renderCategory,
  renderProduct,
  renderCart,
};
