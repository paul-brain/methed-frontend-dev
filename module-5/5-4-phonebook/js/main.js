import control from './modules/control.js';
import {renderContacts, renderPhoneBook} from './modules/render.js';
import * as storage from './modules/storage.js';

const {
  hoverRow,
  modalControl,
  deleteControl,
  sortControl,
  formControl,
} = control;

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

  const data = storage.getStorage('contacts');
  const allRow = renderContacts(list, data); // [tr, tr, ...]
  const {closeModal} = modalControl(btnAdd, formOverlay);

  hoverRow(allRow, logo);
  deleteControl(divApp, btnDel, allRow);
  sortControl(divApp, list, allRow);
  formControl(form, list, allRow, closeModal);
};

window.phoneBookInit = init;
