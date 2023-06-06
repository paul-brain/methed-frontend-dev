const createHeader = () => {
  const header = document.createElement('h3');
  header.textContent = 'Todo App';

  return header;
};

const createForm = () => {
  const form = document.createElement('form');

  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  form.insertAdjacentHTML('beforeend', `
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control"
        placeholder="ввести задачу" name="task">
    </label>
    <button type="submit"
      class="btn btn-primary me-3" disabled>Сохранить</button>
    <button type="reset"
      class="btn btn-warning">Очистить</button>
  `);
  form.btnSave = form.querySelector('.btn-primary');

  return form;
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);
  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  tableWrapper.append(table);

  return {
    wrapper: tableWrapper,
    tbody,
  };
};

export const createRow = ({id, name: taskName, status: taskStatus}, number) => {
  const tr = document.createElement('tr');

  const tdTaskNumber = document.createElement('td');
  tdTaskNumber.append(number + 1);

  const tdTaskName = document.createElement('td');
  tdTaskName.classList.add('task');
  tdTaskName.append(taskName);

  const tdTaskStatus = document.createElement('td');
  tdTaskStatus.append(taskStatus);

  const tdTaskActions = document.createElement('td');

  const btnDel = document.createElement('button');
  btnDel.classList.add('btn', 'btn-danger', 'me-1');
  btnDel.append('Удалить');

  const btnEdit = document.createElement('button');
  btnEdit.classList.add('btn', 'btn-warning', 'me-1');
  btnEdit.append('Редактировать');

  const btnFinish = document.createElement('button');
  btnFinish.classList.add('btn', 'btn-success');
  btnFinish.append('Завершить');

  const inputId = document.createElement('input');
  inputId.type = 'hidden';
  inputId.name = 'id';
  inputId.value = id;

  tdTaskActions.append(inputId, btnDel, btnEdit, btnFinish);

  if (taskStatus === 'Выполнена') {
    tr.classList.add('table-success');
    tdTaskName.classList.add('text-decoration-line-through');
  } else {
    tr.classList.add('table-light');
  }

  tr.append(tdTaskNumber, tdTaskName, tdTaskStatus, tdTaskActions);

  return tr;
};

export default {
  createHeader,
  createForm,
  createTable,
  createRow,
};
