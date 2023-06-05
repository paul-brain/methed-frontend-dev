import render from './modules/render.js';
import control from './modules/control.js';
import {getUserToDoList} from './modules/storage.js';

const {
  renderTasks,
  setNameToHeader,
  renderToDo,
} = render;

const {
  getName,
  formControl,
} = control;

// Инициализация приложения
const init = (appSelecter) => {
  const app = document.querySelector(appSelecter);
  const {
    header,
    form,
    list,
  } = renderToDo(app);

  // Функционал

  const name = getName();

  if (name !== null) {
    setNameToHeader(header, name);

    const data = getUserToDoList(name);

    renderTasks(list, data);
    formControl(form, list, name);
  }
};

init('.app-container');
