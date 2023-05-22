'use strict';

// Модуль 5 Урок 1. Домашнее задание: исправить HTML  с помощью JavaScript

// 1. Удаляем назойливую рекламу
const ads = document.querySelector('.ads');
ads.remove();

// 2. Ставим на место 4-й список
const item_three = document.querySelector('.item_three');
const item_four = document.querySelector('.item_four');
item_three.after(item_four);

// 3. Ставим на место 4-й эл-т 4-го списка
const props_item_four = document.querySelector('.item_two .props__item_four');
item_four.querySelectorAll('.props__item')[2].after(props_item_four);

// 4. Меняем местами списки свойств 3-го и 5-го списков
const item_five_content = document.querySelector('.item_five .content');
const item_three_content = document.querySelector('.item_three .content');
const item_five_props = item_three_content.querySelector('.props__list');
const item_three_props = item_five_content.querySelector('.props__list');

item_five_content.append(item_five_props);
item_three_content.append(item_three_props);

// 5. Возвращаем на место "Приложение А" и "Приложение Б" из 2-го списка
const attachments = document.querySelectorAll('.item_six .props__item_two');
const item_two_props = document.querySelector('.item_two .props__list');

item_two_props.append(attachments[0]);
item_two_props.append(attachments[1]);

// 6. Ставим на место заголовки 2-го, 5-го и 6-го списков
const item_two_title = document.querySelector('.item_five .item__title');
const item_five_title = document.querySelector('.item_six .item__title');
const item_six_title = document.querySelector('.item_two .item__title');

item_six_title.after(item_two_title);
item_five_title.after(item_six_title);
item_five_props.before(item_five_title);

// 7. Правим заголовок 3-го списка
let item_three_title = item_three.querySelector('.item__title');
item_three_title.firstChild.replaceWith('This и прототипы объектов');
