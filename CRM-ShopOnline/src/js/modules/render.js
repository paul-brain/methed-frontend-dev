import {loadPosts} from './loadData.js';
import {loadArticle} from './loadData.js';
import {loadAuthor} from './loadData.js';
import {createItemPost} from './createElements.js';
import {createPagination} from './createElements.js';
import {createArticle} from './createElements.js';

export const renderBlog = async (page) => {
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

export const renderArticle = async (id) => {
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
