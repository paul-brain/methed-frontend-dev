export const createPostCard = (post) => {
  const postElement = document.createElement('li');

  postElement.classList.add('news__item', 'card');
  postElement.insertAdjacentHTML('beforeend', `
  <a class="card__link" href="${post.url}">
    <figure class="card__poster">
      <div class="preload"></div>
    </figure>
    <h3 class="card__title">${post.title}</h3>
    <div class="card__excerpt">${post.description ?? 'Описания нет'}</div>
    <div class="card__meta">
      <div class="card__date">${post.publishedAt}</div>
      <div class="card__author">${post.author}</div>
    </div>
  </a>
  `);

  const cardPoster = postElement.querySelector('.card__poster');
  const cardImg = document.createElement('img');

  cardImg.classList.add('card__img');
  cardImg.src = post.urlToImage ?? 'img/noimage.jpg';
  cardImg.alt = post.title;

  cardImg.addEventListener('load', () => {
    cardPoster.textContent = '';
    cardPoster.append(cardImg);
  });

  cardImg.addEventListener('error', (e) => {
    cardImg.src = 'img/noimage.jpg';
    cardPoster.append(cardImg);
  });

  return postElement;
};

export const createPreload = () => {
  const overlay = document.createElement('div');
  const preload = document.createElement('div');

  overlay.classList.add('overlay');
  preload.classList.add('preload');
  overlay.append(preload);

  return overlay;
};
