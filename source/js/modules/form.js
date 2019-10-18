const form = document.querySelector('.form');

document.addEventListener('DOMContentLoaded', () => {
  [...form.querySelectorAll('input')].forEach((e) => {
    e.value = window.sessionStorage.getItem(e.name, e.value);

    e.addEventListener('input', () => {
      window.sessionStorage.setItem(e.name, e.value);
    });
  });
});

const name = form.querySelector('[name=name]');
name.addEventListener('invalid', (evt) => {
  if (name.validity.tooLong) {
    name.setCustomValidity('Не более 20 букв');
  } else if (name.validity.tooShort) {
    name.setCustomValidity('Не менее 2 букв');
  } else if (name.validity.patternMismatch) {
    name.setCustomValidity('Допустимы только буквы');
  } else {
    name.setCustomValidity('');
  }
});

const phone = form.querySelector('[name=phone]');
phone.addEventListener('invalid', (evt) => {
  if (phone.validity.patternMismatch) {
    phone.setCustomValidity('Введите номер в формате +7 XXX XXX XX XX');
  } else {
    phone.setCustomValidity('');
  }
});
