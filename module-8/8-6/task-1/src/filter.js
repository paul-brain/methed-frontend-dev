let objects = [
  { login: 'Maks', email: 'maks@maks.com', company: 'METHED' },
  { login: 'Methed', email: 'info@methed.ru', company: 'METHED' },
  { login: 'Humidor', email: 'tomato@pomodoro.com', company: 'cucumber' }
];

const filter = (objects, key, val) => {
  if (!Array.isArray(objects)) {
    return 'Error: array expected';
  }

  const filtered = [];

  objects.forEach(obj => {
    for (const prop in obj) {
      if (prop === key && obj[prop] === val) {
        filtered.push(obj);
      }
    }
  });

  return filtered;
};

/* const filtered = filter(objects, 'company', 'METHED');
console.log(filtered); */

export default filter;
