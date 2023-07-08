// 1. Вам дан массив с именами файлов
const arr = ['module.jsx', 'index.html', 'style.css', 'index.js', 'file.ts', 'library.css', 'my.plugin.js'];

const filterArray = array => {
  const reg = /\.(jsx?|ts)$/;

  return array.filter(item => reg.test(item));
};

console.log('Задание 1. Фильтруем имена файлов:');
console.log(filterArray(arr));

// 2. Напишите регулярное выражение, которое находит email адреса
const emails = ['info@methed.ru', 'max24@mail.com', 'java_script@google.io', 'my-mail@yandex.ru', 'tom_yam@ya.ru', 'zero@mai1.xyz', ''];

const filterEmail = array => {
  const reg = /^\w+@[a-z]{3,}\.[a-z]{2,5}$/i;

  return array.filter(item => reg.test(item));
};

console.log('Задание 2. Фильтруем email:');
console.log(filterEmail(emails));

// 3. Напишите регулярное выражение, которое находит текст в скобках
const text = 'Здоровый (праздничный) ужин вовсе не обязательно должен состоять из шпината, гречки и вареной куриной грудки. Самыми лучшими способами приготовления еды (по мнению моей мамы) являются следующие: варка на пару, запекание или варка в воде. Помимо стандартных мандаринов и ананасов, отличным украшением любого стола станут необычные, экзотические фрукты(например: личи, рамбутан, тамаринд). Здоровой может быть даже выпечка, если она приготовлена на пару.';
const textsInBrackets = text.match(/\(.+?\)/g);

console.log('Задание 3. Находим текст в скобках:');
console.log(textsInBrackets);

// 4. Напишите функцию которая принимает строку, в этой строке находит url адрес и заменяет с помощью replace на тег
const str = 'Заменяем адреса вида http://site.ru и https://site.com на полноценные ссылки.';
const urlsToTags = str => str.replace(/(https?:\/\/(\w+?\.[a-z]{2,}))/gi, '<a href="$1">$2</a>');

console.log('Задание 4. Замена URL-адреса в строке на тег:');
console.log('Исходная строка:', str);
console.log('Измененная строка:', urlsToTags(str));
