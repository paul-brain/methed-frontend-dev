import createElements from './createElements.js';
import {createRow} from './createElements.js';

const {
  createLogo,
  createHeader,
  createMain,
  createFooter,
  createBtnsGroup,
  createTable,
  createForm,
} = createElements;

export const renderContacts = (elem, data) => {
  if (data.length !== 0) {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  }

  return [];
};

export const renderPhoneBook = (app, title) => {
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
    logo,
    btnAdd: btnsGroup.btnNodes[0],
    btnDel: btnsGroup.btnNodes[1],
    formOverlay: overlay,
    form,
  };
};
