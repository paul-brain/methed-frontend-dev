import { Column } from "./column";
import { RenderStation } from './renderStation';

export class Station {
  #queue = [];                // очередь из машин
  #filling = [];              // массив колонок
  #ready = [];                // массив заправленных машин для отчетности

  constructor(renderApp = null, typeStation = []) {
    this.typeStation = typeStation; // [{type: petrol, count: 2, speed: 5}, {...}, {...}]
    this.renderApp = renderApp;
    this.renderStation = null;
  };

  init() {
    console.log('Открыто');

    this.createColumns();
    this.render();

    setInterval(() => {
      this.checkQueueToFilling();
    }, 2000);
  }

  createColumns() {
    if (this.typeStation.length) {
      for (const optionColumn of this.typeStation) {
        for (let i = 0; i < optionColumn.count; i++) {
          this.#filling.push(new Column(optionColumn.type, optionColumn.speed));
        }
      }
    } else {
      this.#filling.push(new Column('petrol', 5));
    }
  }

  render() {
    if (this.renderApp) {
      this.renderStation = new RenderStation(this, this.renderApp);
    }
  }

  get queue() {
    return this.#queue;
  }

  get filling() {
    return this.#filling;
  }

  checkQueueToFilling() {
    if (this.#queue.length) {
      for (let i = 0; i < this.#queue.length; i++) {
        for (let j = 0; j < this.#filling.length; j++) {
          if (
            ! this.#filling[j].car &&
            this.#filling[j].type === this.#queue[i].typeFuel
          ) {
            this.#filling[j].car = this.#queue.splice(i, 1)[0];
            this.fillingGo(this.#filling[j]);
            this.renderStation.renderStation();
            break;
          }
        }
      }
    }
  }

  fillingGo(column) {
    const car = column.car;
    let nowTank = car.nowTank;
    const needPetrol = car.needPetrol; // max - now
    const timerId = setInterval(() => {
      console.log('nowTank: ', nowTank);
      nowTank += column.speed;

      if (nowTank >= car.maxTank) {
        clearInterval(timerId);
        const total = nowTank - car.nowTank;
        car.fillUp();
        column.car = null;
        this.leaveClient({car, total, needPetrol});
      }
    }, 1000);
    console.log(`Заправляем ${JSON.stringify(column.car)}`);
  }

  leaveClient({car, total, needPetrol}) {
    this.#ready.push(car);
    this.renderStation.renderStation();
    console.log(`Заправлен: ${car.getTitle()} (бак: ${car.maxTank}), необходимость: ${needPetrol}, заправили: ${total}`);
  }

  addCarToQueue(car) {
    this.#queue.push(car);
    this.renderStation.renderStation();
  }
}
