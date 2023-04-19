'use strict';

// Task 01

const cart = {
  items: [],
  count: 0,

  get totalPrice() {
    return this.calculateItemPrice();
  },

  add(name, price, count = 1) {
    this.items.push({
      name,
      price,
      count,
    });

    this.increaseCount(count);
  },

  increaseCount(n) {
    this.count += n;
  },

  calculateItemPrice() {
    return this.items.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);
  },

  clear() {
    this.items.length = 0;
    this.count = 0;
  },

  print() {
    console.log('Товары:', JSON.stringify(this.items));
    console.log('Общая стоимость корзины:', this.totalPrice);
  },
};

cart.add('Samsung Galaxy S3', 500);
cart.add('HONOR 20 Lite', 349, 2);
cart.add('POCO Y5', 199, 3);

cart.print();
console.log(cart.count);

cart.clear();
cart.print();
