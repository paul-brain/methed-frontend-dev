import {timer} from './modules/timer.js';
import {renderBlog} from './modules/render.js';
import {renderArticle} from './modules/render.js';

document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(window.location.href);
  const path = url.pathname;
  console.log(path);
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
});
