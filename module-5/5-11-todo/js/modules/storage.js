import {generateId} from './helpers.js';

const createTask = (taskName) => ({
  id: generateId(),
  name: taskName,
  status: 'В процессе',
});

export const getStorage = () => {
  let data = localStorage.getItem('tasks');

  if (data !== null) {
    try {
      data = JSON.parse(data);
    } catch {/* empty */}
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

const setStorage = (storage) => {
  localStorage.setItem('tasks', JSON.stringify(storage));
};

export const getUserToDoList = (name) => {
  const data = getStorage('tasks');
  // const userList = data.find((item) => item.hasOwnProperty(name));
  const userList = data.find((item) =>
    Object.prototype.hasOwnProperty.call(item, name));

  return userList !== undefined ? userList[name] : [];
};

export const saveToDoList = (name, taskName) => {
  const storage = getStorage();
  const userList = getUserToDoList(name);
  const userListIndex = storage.findIndex((item) =>
    Object.prototype.hasOwnProperty.call(item, name));
  const taskObj = createTask(taskName);

  userList.push(taskObj);

  if (userListIndex !== -1) {
    storage[userListIndex] = {
      [name]: userList,
    };
  } else {
    storage.push({
      [name]: userList,
    });
  }

  setStorage(storage);

  return taskObj;
};

export const changeTask = (name, id, field, newValue) => {
  const storage = getStorage();
  const userListIndex = storage.findIndex((item) =>
    Object.prototype.hasOwnProperty.call(item, name));
  const taskIndex =
    storage[userListIndex][name].findIndex((item) => item.id === +id);

  if (taskIndex !== -1) {
    storage[userListIndex][name][taskIndex][field] = newValue;
    setStorage(storage);
  }
};

export const removeTask = (name, id) => {
  const storage = getStorage();
  const userListIndex = storage.findIndex((item) =>
    Object.prototype.hasOwnProperty.call(item, name));
  const taskIndex =
    storage[userListIndex][name].findIndex((item) => item.id === +id);

  if (taskIndex !== -1) {
    storage[userListIndex][name].splice(taskIndex, 1);
    setStorage(storage);
  }
};
