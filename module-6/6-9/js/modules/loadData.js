export const loadDataFromServer = (endpoint, num = 8, q = null) => {
  const url = new URL(`https://newsapi.org/v2/${endpoint}`);

  url.searchParams.append('pageSize', num);
  // url.searchParams.append('category', 'technology');
  // url.searchParams.append('sources', 'bbc-news');

  if (q) {
    url.searchParams.append('q', q);
  } else {
    url.searchParams.append('country', 'ua');
  }

  return fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': '495d1b180cf24f388080b443a5fd2b51',
    },
  })
  .then(response => response.json());
};
