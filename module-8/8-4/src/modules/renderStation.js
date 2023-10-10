export class RenderStation {
  #queue = [];

  constructor(station, app) {
    this.station = station;
    this.app = app;
    this.init();
  }

  init() {
    this.wrapper = document.createElement('div');
    this.wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: minmax(100px, 1fr);
      aling-items: top;
      justify-content: space-between;
    `;

    this.renderStation();
  }

  renderStation() {
    const queueList = this.createQueue();
    const columns = this.createColumns();

    this.wrapper.textContent = '';
    this.wrapper.append(queueList, columns);
    document.querySelector(this.app).append(this.wrapper);
  }

  createQueue() {
    const list = document.createElement('ul');

    this.station.queue.forEach(car => {
      const carItem = document.createElement('li');

      carItem.textContent = `${car.getTitle()}`;
      carItem.classList.add(car.typeCar);
      list.append(carItem);
    });

    return list;
  }

  createColumns() {
    const columns = document.createElement('ul');

    columns.classList.add('columns');

    this.station.filling.forEach(column => {
      const columnItem = document.createElement('li');
      const columnName = document.createElement('p');

      columnItem.classList.add(column.type);
      columnName.textContent = column.type;
      columnItem.append(columnName);

      if (column.car) {
        const itemCar = document.createElement('p');
        const car = column.car;

        itemCar.textContent = car.getTitle();
        itemCar.classList.add(car.typeCar);
        columnItem.append(itemCar);
      }

      columns.append(columnItem);
    });

    return columns;
  }
}
