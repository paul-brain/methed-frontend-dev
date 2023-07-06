import {loadDataFromServer} from "./modules/loadData.js";
import {createPostCard} from "./modules/createElements.js";
import {renderPosts} from "./modules/render.js";
import {searchControl} from "./modules/control.js";

const init = () => {
  const newsList = document.querySelector('.news .news__list');

  loadDataFromServer('top-headlines')
    .then((data) => {
      const posts = data.articles.map((post) => createPostCard(post));

      renderPosts(newsList, posts);
    });

  searchControl();
};

init();
