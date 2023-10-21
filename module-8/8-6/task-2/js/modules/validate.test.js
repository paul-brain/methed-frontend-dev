import validate from './validate.js';

describe('Проверка валидатора банковской карты', () => {
  it('Проверяем поле с держателем карты', () => {
    expect(validate('holder', 'Mark Po')).toBe(true);
    expect(validate('holder', 'Mark')).toBe(false);
    expect(validate('holder', 'Марк По')).toBe(false);
    expect(validate('holder', 'Lui San4oris')).toBe(false);
    expect(validate('holder', '')).toBe(false);
  });

  it('Проверяем поле с номером карты', () => {
    expect(validate('number', '1111 2222 3333 4444')).toBe(true);
    expect(validate('number', '111 222 333 444')).toBe(true);
    expect(validate('number', '111 222 333')).toBe(false);
    expect(validate('number', 'iiii 3333 4444 5555')).toBe(false);
    expect(validate('number', '111. 2222 3333 444,')).toBe(false);
    expect(validate('number', 'мой номер карты')).toBe(false);
    expect(validate('number', '')).toBe(false);
  });

  it('Проверяем поле с CVV карты', () => {
    expect(validate('cvv', '358')).toBe(true);
    expect(validate('cvv', '35')).toBe(false);
    expect(validate('cvv', '3587')).toBe(false);
    expect(validate('cvv', '35.')).toBe(false);
    expect(validate('cvv', 'cvv')).toBe(false);
    expect(validate('cvv', 'код')).toBe(false);
    expect(validate('cvv', '')).toBe(false);
  });
});
