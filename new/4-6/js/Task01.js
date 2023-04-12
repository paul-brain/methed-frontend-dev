'use strict';

// Task 01

const filter = (arrAll, arrSubtract) => {
  let resultArray = [];

  for (const elem of arrAll) {
    if (! arrSubtract.includes(elem)) {
      resultArray.push(elem);
    }
  }

  return resultArray;
};

const allStudents = ['Иванов', 'Петров', 'Сидоров', 'Кузнецов', 'Смирнов', 'Попов', 'Соколов'];
const failedStudents = ['Сидоров', 'Смирнов', 'Попов'];

const passedStudents = filter(allStudents, failedStudents);

console.log('Все студенты, которые сдали экзамен: ', passedStudents);
