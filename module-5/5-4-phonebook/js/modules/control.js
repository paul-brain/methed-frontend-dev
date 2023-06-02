import * as storage from './storage.js';
import {createRow} from './createElements.js';

const {
  getStorage,
  setStorage,
  removeStorage,
} = storage;

const hoverRow = (allRow, logo) => {
  allRow.forEach(element => {
    const logoText = logo.textContent;

    element.addEventListener('mouseenter', () => {
      logo.textContent = element.phoneLink.textContent;
    });
    element.addEventListener('mouseleave', () => {
      logo.textContent = logoText;
    });
  });
};

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;

    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

// Удаление контакта с базы и таблицы
const deleteControl = (divApp, btnDel, allRow) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  divApp.addEventListener('click', e => {
    const target = e.target;
    // const targetClassName = target.className;

    if (target.classList.contains('del-icon')) {
      const contact = target.closest('.contact');
      const phoneNumber = contact.children[3].textContent;

      contact.remove(); // Удаляем с таблицы
      removeStorage('contacts', phoneNumber); // Удаляем с хранилища
      // Удаляем с коллекции allRow:
      const indexPhoneNumber = allRow.findIndex(
          (tr) => tr.children[3].textContent === phoneNumber,
      );

      if (indexPhoneNumber !== -1) {
        allRow.splice(indexPhoneNumber, 1);
      }
    }
  });
};

// Вспомогательная ф-ция: сортировка и вставка в таблицу
const sortAndInsert = (list, elements, direction, column) => {
  elements.sort((a, b) => a[column].localeCompare(b[column]));

  if (direction === 'sort-asc') {
    elements.forEach(elem => {
      list.append(elem);
    });
  } else {
    elements.forEach(elem => {
      list.prepend(elem);
    });
  }

  localStorage.setItem('sort', JSON.stringify([column, direction]));
};

// Сортировка ASC/DESC по полям Имя и Фамилия
const sortControl = (divApp, list, allRow) => {
  const sort = getStorage('sort'); // ['firstname', 'sort-asc'] или []

  if (sort.length !== 0) {
    const [elementClass, elementSortClass] = sort;
    const element = document.querySelector('.' + elementClass);

    element.classList.add(elementSortClass);
    sortAndInsert(list, allRow, elementSortClass, elementClass);
  }

  divApp.addEventListener('click', e => {
    const target = e.target;

    if (
      target.classList.contains('firstname') ||
      target.classList.contains('surname')) {
      // const [targetClassName] = target.className.split(' ');
      const targetClassName =
        target.className.includes('firstname') ? 'firstname' : 'surname';

      target.nextElementSibling.classList.remove('sort-asc', 'sort-desc');
      target.previousElementSibling.classList.remove('sort-asc', 'sort-desc');

      if (target.classList.contains('sort-asc')) {
        target.classList.remove('sort-asc');
        target.classList.add('sort-desc');

        sortAndInsert(list, allRow, 'sort-desc', targetClassName);
      } else {
        target.classList.remove('sort-desc');
        target.classList.add('sort-asc');

        sortAndInsert(list, allRow, 'sort-asc', targetClassName);
      }
    }
  });
};

// Обработка формы: добавлением контакт
const formControl = (form, list, allRow, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    const row = createRow(newContact);

    setStorage('contacts', newContact); // Сохранили в базу
    list.append(row); // Добавили на страницу
    allRow.push(row); // Добавили в коллекцию allRow (нужно для сортировки)

    form.reset();
    closeModal();
  });
};

export default {
  hoverRow,
  modalControl,
  deleteControl,
  sortControl,
  formControl,
};
