import createElements from './createElements.js';

const {
  createHeader,
  createForm,
  createTable,
  createRow,
} = createElements;

export const renderToDo = (app) => {
  const header = createHeader();
  const form = createForm();
  const table = createTable();

  app.append(header, form, table.wrapper);
  app.classList.add('vh-100', 'w-100', 'd-flex');
  app.classList.add('align-items-center', 'justify-content-center');
  app.classList.add('flex-column');

  return {
    header,
    form,
    list: table.tbody,
  };
};

export const setNameToHeader = (header, name) => {
  header.append(' ' + name);
};

export const renderTasks = (list, data) => {
  if (data.length !== 0) {
    const rows = data.map(createRow);
    list.append(...rows);

    return rows;
  }

  return [];
};

export default {
  renderTasks,
  setNameToHeader,
  renderToDo,
};
