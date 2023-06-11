// Обязательное задание: +1 балл: простая работа со списком

const setTimeoutBlock = document.querySelector('.set-timeout');
const label = document.createElement('label');
const inputText = document.createElement('input');
const paragraph = document.createElement('p');

setTimeoutBlock.classList.add('mb-3');

label.classList.add('form-label');
label.textContent = 'Введите текст:';

inputText.type = 'text';
inputText.classList.add('form-control', 'mb-3');

paragraph.classList.add('lead', 'border');
paragraph.textContent = 'Я параграф.';

setTimeoutBlock.append(label, inputText, paragraph);

inputText.addEventListener('keyup', () => {
  setTimeout(() => {
    paragraph.textContent = inputText.value;
  }, 300);
});
