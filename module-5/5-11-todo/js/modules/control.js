import * as storage from './storage.js';
import {createRow} from './createElements.js';

const getName = () => {
  let name;

  do {
    name = prompt('Enter your name:');
  } while (name !== null && !name.trim());

  return name;
};

// Обработка формы: добавлением задачу
const formControl = (form, list, name) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // const formData = new FormData(e.target);
    // const newTask = Object.fromEntries(formData);

    const taskName = form.task.value.trim();

    if (taskName) {
      const taskObj = storage.saveToDoList(name, taskName);
      const row = createRow(taskObj, list.children.length);

      list.append(row);
    } else {
      alert('Текст не может быть пустым!');
    }

    form.reset();
  });

  form.addEventListener('input', e => {
    const input = e.target;
    const btnSave = form.btnSave;

    if (input.value !== '') {
      if (btnSave.hasAttribute('disabled')) {
        btnSave.removeAttribute('disabled');
      }
    } else {
      if (!btnSave.hasAttribute('disabled')) {
        btnSave.setAttribute('disabled', 'disabled');
      }
    }
  });

  form.addEventListener('reset', () => {
    form.btnSave.setAttribute('disabled', 'disabled');
  });

  list.addEventListener('click', e => {
    const target = e.target;

    // Нажали кнопку "Завершить"
    if (target.classList.contains('btn-success')) {
      const tr = target.closest('tr');
      const id = tr.querySelector('[name=id]').value;

      if (tr.classList.contains('table-light')) {
        tr.classList.remove('table-light');
        tr.classList.add('table-success');
        tr.children[1].classList.add('text-decoration-line-through');

        storage.changeTask(name, id, 'status', 'Выполнена');
      } else {
        tr.classList.remove('table-success');
        tr.classList.add('table-light');
        tr.children[1].classList.remove('text-decoration-line-through');

        storage.changeTask(name, id, 'status', 'В процессе');
      }
    }

    // Нажали кнопку "Удалить"
    if (target.classList.contains('btn-danger')) {
      const confirmation = confirm('Вы действительно хотите этого?');

      if (confirmation) {
        const tr = target.closest('tr');
        const id = tr.querySelector('[name=id]').value;
        const rows = list.children;

        tr.remove();

        for (let i = 0; i < rows.length; i++) {
          rows[i].firstChild.textContent = i + 1;
        }

        storage.removeTask(name, id);
      }
    }

    // Нажали кнопку "Редактировать"
    if (target.classList.contains('btn-warning')) {
      const tr = target.closest('tr');
      const tdTask = tr.querySelector('.task');

      if (tdTask.hasAttribute('contenteditable')) {
        tdTask.removeAttribute('contenteditable');
        tdTask.removeAttribute('style');
        target.textContent = 'Редактировать';
      } else {
        tdTask.setAttribute('contenteditable', 'true');
        tdTask.style.backgroundColor = '#fff3cd';
        target.textContent = 'Сохранить';
      }
    }
  });

  list.addEventListener('input', e => {
    const target = e.target;
    const tr = target.closest('tr');
    const id = tr.querySelector('[name=id]').value;

    storage.changeTask(name, id, 'name', target.textContent);
  });
};

export default {
  getName,
  formControl,
};
