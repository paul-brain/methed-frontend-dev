// Высчитываем общее кол-во товаров в корзине
export const getCartCount = cart => cart.reduce((sum, item) => sum + item.count, 0);

// Вставляем общее кол-во товаров в корзине в шапку
export const updateCartCount = cart => {
  const navbarCount = document.querySelector('.navbar__count');

  navbarCount.textContent = getCartCount(cart);
};

// Высчитываем итоговую ссумму в корзине
export const getTotalAmount = products => {
  let totalNew = 0, totalOld = 0;

  for (const one of products) {
    let newPrice = one.price;
    let oldPrice = one.price;

    if (one.discount > 0) {
      newPrice = newPrice - newPrice * one.discount / 100;
    }

    totalNew += newPrice * one.count;
    totalOld += oldPrice * one.count;
  }

  return [totalNew, totalOld];
};
