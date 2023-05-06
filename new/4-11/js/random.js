// Генерация случайного целого числа от MIN до MAX включительно
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  (min > max) && ([min, max] = [max, min]); // ставим по возрастанию

  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
