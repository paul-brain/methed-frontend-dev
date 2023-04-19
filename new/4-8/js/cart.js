'use strict';

// Task 01

const cart = {
  items: [],
  totalPrice: 0,
  count: 0,

  getTotalPrice() {
    return this.totalPrice;
  },
  add(name, price, count = 1) {
    this.items.push({
      name,
      price,
      count,
    });

    this.increaseCount(count);
    this.calculateItemPrice();
  },
  increaseCount(n) {
    this.count += n;
  },
  calculateItemPrice() {
    this.totalPrice = this.items.reduce((sum, item) => {
      return sum + item.price * item.count;
    }, 0);
  },
  clear() {
    this.items.length = 0;
    //this.items.splice(0, this.items.length); // Так лучше?
    this.totalPrice = 0;
    this.count = 0;
  },
  print() {
    console.log('Товары:', JSON.stringify(this.items));
    console.log('Общая стоимость корзины:', this.getTotalPrice());
  },
};

cart.add('Samsung Galaxy S3', 500);
cart.add('HONOR 20 Lite', 349, 2);
cart.add('POCO Y5', 199, 3);

cart.print();

cart.clear();
cart.print();
