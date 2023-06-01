'use strict'

// Работа с хранилищем: получаем данные
const getStorage = (key) => {
  let data = localStorage.getItem(key);

  if (data !== null) {
    try {
      data = JSON.parse(data);
    } catch {
    }

    return data;
  }

  return [];
};

// Работа с хранилищем: сохраняем данные
const setStorage = (key, obj) => {
  let data = getStorage(key);

  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

// Работа с хранилищем: удаляем контакт
const removeStorage = (key, phone) => {
  let data = getStorage(key);
  const index = data.findIndex((item) => {
    return item.phone === phone;
  });

  if (index !== -1) {
    data.splice(index, 1);
  }

  localStorage.setItem(key, JSON.stringify(data));
};

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    const container = createContainer();
    header.classList.add('header');
    header.container = container;
    header.append(container);

    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');

    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const container = createContainer();
    main.classList.add('main');
    main.container = container;
    main.append(container);

    return main;
  };

  const createBtnsGroup = btns => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btnNodes = btns.map(({className, type, text}) => {
      const btn = document.createElement('button');
      btn.type = type;
      btn.textContent = text;
      btn.className = className;

      return btn;
    });

    btnWrapper.append(...btnNodes);

    return {
      btnWrapper,
      btnNodes,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="firstname">Имя</th>
        <th class="surname">Фамилия</th>
        <th>Телефон</th>
        <th></th>
      </tr>
    `);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    const form = document.createElement('form');
    const close = document.createElement('button');

    overlay.classList.add('form-overlay');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" type="text"
          id="name" name="name" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" type="text"
          id="surname" name="surname" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" type="number"
          id="phone" name="phone" required>
      </div>
    `);
    close.type = 'button';
    close.classList.add('close');
    form.prepend(close);

    const btnsGroup = createBtnsGroup([
      {
        className: 'btn btn-primary',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...btnsGroup.btnNodes);
    overlay.append(form);

    return {
      overlay,
      form,
      close,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    const container = createContainer();
    footer.classList.add('footer');
    footer.container = container;
    footer.append(container);

    return footer;
  };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    const tdDel = document.createElement('td');
    const btnDel = document.createElement('button');
    const tdName = document.createElement('td');
    const tdSurname = document.createElement('td');
    const tdPhone = document.createElement('td');
    const tdLink = document.createElement('a');
    const tdEdit = document.createElement('td');
    const btnEditBtn = document.createElement('button');

    tr.classList.add('contact');
    btnDel.classList.add('del-icon');
    tdDel.classList.add('delete');
    tdDel.append(btnDel);

    // tdName.classList.add('contact__name');
    tdName.textContent = tr.firstname = firstName;
    // tdSurname.classList.add('contact__surname');
    tdSurname.textContent = tr.surname = surname;
    tdLink.href = `tel:${phone}`;
    tdLink.textContent = phone;
    tdPhone.append(tdLink);
    tr.phoneLink = tdLink;
    btnEditBtn.classList.add('edit-icon');
    tdEdit.append(btnEditBtn);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  };

  const renderContacts = (elem, data) => {
    if (data.length !== 0) {
      const allRow = data.map(createRow);
      elem.append(...allRow);

      return allRow;
    }

    return [];
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const main = createMain();
    const footer = createFooter();
    const logo = createLogo(title);
    const btnsGroup = createBtnsGroup([
      {
        className: 'btn btn-primary',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();

    header.container.append(logo);
    main.container.append(btnsGroup.btnWrapper, table, overlay);
    footer.container.append(`Все права защищены ©${title}`);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo: logo,
      btnAdd: btnsGroup.btnNodes[0],
      btnDel: btnsGroup.btnNodes[1],
      formOverlay: overlay,
      form,
    };
  };

  const hoverRow = (allRow, logo) => {
    allRow.forEach(element => {
      const logoText = logo.textContent;

      element.addEventListener('mouseenter', () => {
        logo.textContent = element.phoneLink.textContent;
      });
      element.addEventListener('mouseleave', () => {
        console.log(logoText);
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
    }
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
      const targetClassName = target.className;

      if (target.classList.contains('del-icon')) {
        const contact = target.closest('.contact');
        const phoneNumber = contact.children[3].textContent;

        contact.remove(); // Удаляем с таблицы
        removeStorage('contacts', phoneNumber); // Удаляем с хранилища
        // Удаляем с коллекции allRow:
        const indexPhoneNumber = allRow.findIndex((tr) => {
          return tr.children[3].textContent === phoneNumber;
        });

        if (indexPhoneNumber !== -1) {
          allRow.splice(indexPhoneNumber, 1);
        }
      }
    });
  };

  // Вспомогательная ф-ция: сортировка и вставка в таблицу
  const sortAndInsert = (list, elements, direction, column) => {
    elements.sort((a, b) => {
      return a[column].localeCompare(b[column]);
    });

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

      if (target.classList.contains('firstname') || target.classList.contains('surname')) {
        //const [targetClassName] = target.className.split(' ');
        const targetClassName = target.className.includes('firstname') ? 'firstname' : 'surname';

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
      const newContact = Object.fromEntries(formData); // {name: '', surname: '', phone: ''}
      const row = createRow(newContact);

      setStorage('contacts', newContact); // Сохранили в базу
      list.append(row); // Добавили на страницу
      allRow.push(row); // Добавили в коллекцию allRow (нужно для сортировки)

      form.reset();
      closeModal();
    });
  };

  // Инициализация приложения
  const init = (selectorApp, title) => {
    const divApp = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      btnDel,
      formOverlay,
      form,
    } = renderPhoneBook(divApp, title);

    // Функционал

    const data = getStorage('contacts');
    const allRow = renderContacts(list, data); // [tr, tr, ...]
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(divApp, btnDel, allRow);
    sortControl(divApp, list, allRow);
    formControl(form, list, allRow, closeModal);
  };

  window.phoneBookInit = init;
}
