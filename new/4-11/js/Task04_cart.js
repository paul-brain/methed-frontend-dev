'use strict';

// Task 04 (Task 02 for this)
console.log('\n');
console.log('Задача 4 (задание 2 на this): корзина:\n\n');

const cart = {
  items: [],
  count: 0,
  discount: 0,

  setDiscount(promocode) {
    if (promocode === 'METHED') {
      this.discount = 15;
    }

    if (promocode === 'NEWYEAR') {
      this.discount = 21;
    }
  },

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
    let sum = this.items.reduce((sum, item) => sum + item.price * item.count, 0);

    if (this.discount) {
      return sum - sum * this.discount / 100
    } else {
      return sum;
    }
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

const coupon = 'NEWYEAR';

cart.add('Samsung Galaxy S3', 500);
cart.add('HONOR 20 Lite', 349, 2);
cart.add('POCO Y5', 199, 3);

cart.print();
console.log(`\nПрименяем купон ${coupon}:\n\n`);
cart.setDiscount(coupon);
cart.print();

console.log('\n');

cart.clear();
cart.print();
