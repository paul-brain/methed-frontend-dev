import {el, text, setChildren, mount} from '../node_modules/redom/dist/redom.es.min.js';
import {transliterate} from './modules/transliterate.js';
import Inputmask from '../node_modules/inputmask/dist/inputmask.es6.js';

const wrapper = el("div", { class: "wrapper" });
const card = el("div", { class: "card" }, [
  el("p", { class: "secure" }, text("Secure Checkout")),
  el("div", { class: "credit-card" }, [
    el("span", { class: "card__number" }, text("xxxx xxxx xxxx xxxx")),
    el("div", { class: "card__personal" }, [
      el("span", { class: "card__name" }, text("John Doe")),
      el("span", { class: "card__date" }, text("04/24")),
    ]),
  ]),
]);
const form = el("form", { class: "form", action: "/" },
  el("div", { class: "form__input-wrap form__input-wrap--holder" },
    el("label", { class: "form__label form__holder-label" }, text("Card Holder")),
    el("input", { type: "text", class: "input input__holder", oninput(e) {
      const target = e.target;

      target.value = target.value.replace(/[ ]{2,}/g, ' '); // убираю двойные пробелы
      card.querySelector('.card__name').textContent =
        target.value ? transliterate(target.value).toUpperCase() : 'John Doe';
      }
    }),
  ),

  el("div", { class: "form__input-wrap form__input-wrap--number" },
    el("label", { class: "form__label form__number-label" }, text("Card Number")),
    el("input", { type: "text", class: "input input__number", oninput(e) {
      card.querySelector('.card__number').textContent =
        e.target.value ? e.target.value : 'xxxx xxxx xxxx xxxx';
      }
  }),
  ),

  el("div", { class: "form__input-wrap form__input-wrap--date" },
    el("label", { class: "form__label form__date-label" }, text("Card Expiry")),
    el("input", { type: "text", class: "input input__date", oninput(e) {
      card.querySelector('.card__date').textContent =
        e.target.value ? e.target.value : '04/24';
      }
    }),
  ),

  el("div", { class: "form__input-wrap form__input-wrap--cvv" },
    el("label", { class: "form__label form__cvv-label" }, text("Card CVV")),
    el("input", { type: "text", class: "input input__cvv" }),
  ),

  el("button", { class: "form__button" }, text("CHECK OUT")),
);

Inputmask({
  mask: '*{1,30}',
  placeholder: "",
  definitions: {
    '*': {
      validator: "[A-Za-zА-Яа-яЁё ]",
    }
  },
}).mask(form.querySelector('.input__holder'));
Inputmask("9999 9999 9999 9999").mask(form.querySelector('.input__number'));
Inputmask({ regex: '^(0[1-9]|1[0-2])/[2|3][0-9]' }).mask(form.querySelector('.input__date'));
Inputmask("999").mask(form.querySelector('.input__cvv'));

mount(card, form);
mount(wrapper, card);
setChildren(document.body, wrapper);
