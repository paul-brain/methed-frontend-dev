import {loadDataFromServer} from "./loadData.js";
import {createPostCard} from "./createElements.js";
import {createPreload} from "./createElements.js";
import {renderPosts} from "./render.js";

export const searchControl = () => {
  const newsList = document.querySelector('.news .news__list');
  const searchResultsSection = document.querySelector('.search-results');
  const searchResultsList = searchResultsSection.querySelector('.news__list');
  const searchResultsTitle = searchResultsSection.querySelector('.search-results__title .container');
  const searchForm = document.querySelector('.header__search');
  const preload = createPreload();

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    document.body.append(preload); // Показываем прелоадер

    const queryString = searchForm.search.value;
    const headlines = loadDataFromServer('top-headlines', 4);
    const search = loadDataFromServer('everything', 8, queryString);

    Promise.all([
      headlines,
      search,
    ])
    .then(([headlinesData, searchData]) => {
      if (headlinesData.status === 'ok' && searchData.status === 'ok') {
        const headlinesPosts = headlinesData.articles.map((post) => createPostCard(post));
        const searchPosts = searchData.articles.map((post) => createPostCard(post));
        const title = `По вашему запросу “${queryString}” найдено результатов: ${searchData.totalResults}`;

          preload.remove();
          renderPosts(newsList, headlinesPosts);
          renderPosts(searchResultsList, searchPosts);
          searchResultsTitle.textContent = title;
          searchResultsSection.classList.add('search-results--show');
        } else {
          throw new Error('Ошибка в запросе');
        }
      })
      .catch(error => {
        preload.remove();
        console.log(error.message);
      });
  });
};
