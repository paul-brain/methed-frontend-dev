'use strict';

// Обязательное задание: +1 балл: простая работа со списком

const listNode = document.querySelector('.props__list');

worker();

function worker() {
  let userString = getUserString();

  switch (userString) {
    case null:
    case 'exit':
      return;

    case '':
      break;

    case 'del':
      if (listNode.hasChildNodes()) {
        console.log(listNode.lastElementChild);
        listNode.lastElementChild.remove();
      }
      break;

    case 'clear':
      listNode.textContent = ''; // listNode.innerHTML = '';
      break;

    default:
      const textNode = document.createTextNode(userString);
      const li = document.createElement('li');

      li.classList.add('props__item');
      li.append(textNode);
      listNode.append(li);
      break;
  }

  worker();
}

function getUserString() {
  const str = prompt('Введите пожалуйста строку:');

  return str === null ? str : str.trim();
}
