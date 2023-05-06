'use strict';

// Task 03 (Task 01 for this)
console.log('\n');
console.log('Задача 3 (задание 1 на this): работа с прямоугольником:\n\n');

const rectangle = {
  width: 5,
  height: 5,
  setWidth(w) {
    w = + w;
    if (! Number.isNaN(w)) {
      this.width = w;
      console.log(`Установлено новое значение щирины: ${this.width}см`);
    } else {
      console.log('Получено не число, ширина осталась прежней: 5см');
    }
  },
  setHeight(h) {
    h = + h;
    if (! Number.isNaN(h)) {
      this.height = h;
      console.log(`Установлено новое значение высоты: ${this.height}см`);
    } else {
      console.log('Получено не число, высота осталась прежней: 5см');
    }
  },
  getPerimeter() {
    return (this.width + this.height) * 2 + 'см';
  },
  getSquare() {
    return this.width * this.height  + 'кв.см';
  },
}

rectangle.setWidth('f');
rectangle.setHeight(8);

console.log('Периметр прямоугольника: ' + rectangle.getPerimeter());
console.log('Площадь прямоугольника: ' + rectangle.getSquare());
