export const renderPosts = (list, posts) => {
  list.textContent = '';
  list.append(...posts);
};
