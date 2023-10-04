'use strict';

const Cart = function(goods = []) {
  this.goods = goods;
  this.totalPrice = 0;
  this.count = 0;
};

Cart.prototype.calculateGoodsPrice = function() {
  this.totalPrice = this.goods.reduce((sum, item) => {
    return sum + item.price * (1 - item.discont / 100);
  }, 0);
};

Cart.prototype.addGoods = function(good) {
  this.goods.push(good);

  this.increaseCount();
  this.calculateGoodsPrice();
}

Cart.prototype.increaseCount = function() {
  this.count++;
};

Cart.prototype.clear = function() {
  this.goods.length = 0;
  //this.items.splice(0, this.items.length); // Так лучше?
  this.totalPrice = 0;
  this.count = 0;
};

Cart.prototype.print = function() {
  console.log('Товары:', JSON.stringify(this.goods));
  console.log('Общая стоимость корзины:', this.totalPrice);
};

const Goods = function(price, name, discont) {
  this.price = price;
  this.name = name;
  this.discont = discont;
}

const FoodGoods = function(price, name, discont, calories) {
  Goods.call(this, price, name, discont);
  this.calories = calories;
}

const ClothingGoods = function(price, name, discont, material) {
  Goods.call(this, price, name, discont);
  this.material = material;
}

const TechnicsGoods = function(price, name, discont, type) {
  Goods.call(this, price, name, discont);
  this.type = type;
}

/* Object.setPrototypeOf(FoodGoods.prototype, Goods.prototype);
Object.setPrototypeOf(ClothingGoods.prototype, Goods.prototype);
Object.setPrototypeOf(TechnicsGoods.prototype, Goods.prototype); */

const apple = new FoodGoods(25, 'Golden', 0, 20);
const shirt = new ClothingGoods(500, 'Nike', 5, 'cotton');
const phone = new TechnicsGoods(5000, 'Poco', 10, 'electronics');
const cart = new Cart();

cart.addGoods(apple);
cart.addGoods(shirt);
cart.addGoods(phone);

cart.print();
cart.clear();
cart.print();
