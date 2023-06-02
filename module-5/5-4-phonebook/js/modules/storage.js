// Работа с хранилищем: получаем данные
export const getStorage = (key) => {
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
export const setStorage = (key, obj) => {
  const data = getStorage(key);

  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

// Работа с хранилищем: удаляем контакт
export const removeStorage = (key, phone) => {
  const data = getStorage(key);
  const index = data.findIndex((item) => item.phone === phone);

  if (index !== -1) {
    data.splice(index, 1);
  }

  localStorage.setItem(key, JSON.stringify(data));
};
