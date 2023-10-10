class Car {
  #maxTank;

  constructor(brand, model, maxTank) {
    this.brand = brand;
    this.model = model;
    this.#maxTank = maxTank;
    this.nowTank = Math.floor(Math.random() * maxTank);
  }

  getTitle() {
    return `${this.brand} ${this.model}`;
  }

  setModel(model) {
    this.model = model;
  }

  get needPetrol() {
    return this.#maxTank - this.nowTank;
  }

  fillUp() {
    this.nowTank = this.#maxTank;

    return this;
  }

  get maxTank() {
    return this.#maxTank;
  }

  static from({brand, model, tank}) {		// статичный метод
    return new Car(brand, model, tank);
  }
}

export class PassangerCar extends Car {
  typeCar = 'passanger';			// писать this не требуется

  constructor(brand, model, tank, typeFuel = 'petrol') {
    super(brand, model, tank);			// вызываем конструктор класса Car
    this.typeFuel = typeFuel;
  }
}

export class Truck extends Car {
  typeCar = 'truck';

  constructor(brand, model, tank, typeFuel = 'diesel') {
    super(brand, model, tank);
    this.typeFuel = typeFuel;
  }
}
