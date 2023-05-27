'use strict'

const data = [
  {
    name: 'Мой ',
    surname: 'номер',
    phone: '+7906174****',
  },
  {
    name: 'Валентина',
    surname: 'Ковалева',
    phone: '+79558796541',
  },
  {
    name: 'Андрей',
    surname: 'Хьюмин',
    phone: '+79044215566',
  },
  {
    name: 'Александр',
    surname: 'Галкин',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Плюшина',
    phone: '+79035512211',
  },
];

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
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
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

    overlay.classList.add('form-overlay');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
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

    btnDel.classList.add('del-icon');
    tdDel.classList.add('delete');
    tdDel.append(btnDel);

    tdName.textContent = firstName;
    tdSurname.textContent = surname;
    tdLink.href = `tel:${phone}`;
    tdLink.textContent = phone;
    tdPhone.append(tdLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
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
    const form = createForm();

    header.container.append(logo);
    main.container.append(btnsGroup.btnWrapper, table, form.overlay);
    footer.container.append(`Все права защищены ©${title}`);

    app.append(header, main, footer);

    return {
      list: table.tbody,
    };
  };

  const init = (selectorApp, title) => {
    const divApp = document.querySelector(selectorApp);
    const {list} = renderPhoneBook(divApp, title);;

    renderContacts(list, data);
  };

  window.phoneBookInit = init;
}
