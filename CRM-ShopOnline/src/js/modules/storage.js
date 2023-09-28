// Работа с хранилищем: получаем данные
const getStorage = (key) => {
  let data = localStorage.getItem(key);

  if (data !== null) {
    try {
      data = JSON.parse(data);
    } catch {/* empty */}

    return data;
  }

  return [];
};

// Работа с хранилищем: сохраняем данные
const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Работа с хранилищем: удаляем всё или только одну позицию
const removeStorage = (key, id) => {
  if (id === undefined) {
    localStorage.removeItem(key);
  } else {
    const data = getStorage(key);
    const index = data.findIndex(item => item.id === String(id));

    if (index !== -1) {
      data.splice(index, 1);
    }

    localStorage.setItem(key, JSON.stringify(data));
  }
};

export default {
  setStorage,
  getStorage,
  removeStorage,
};
