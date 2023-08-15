export const createItemPost = (id, title) => {
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

export const createArticle = (title, body, name) => {
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

export const createPagination = (totalPostCount, totalPageCount, pageNum) => {
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
