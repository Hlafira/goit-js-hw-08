import storage from './storage';
import throttle from 'lodash.throttle';

const FORM_VALUES_KEY = 'feedback-form-state';

const values = storage.loadFromStorage(FORM_VALUES_KEY);

const printFeedback = throttle(event => {
  const formValues = inputSet.reduce(
    (formValues, input) => {
      formValues[input.name] = input.value;
      return formValues;
    },

    {}
  );

  storage.saveToStorage(FORM_VALUES_KEY, formValues);
}, 500);

const form = document.querySelector('.feedback-form');
const inputSet = [];
for (let input of form.elements) {
  if (input.name) {
    inputSet.push(input);

    if (values && values[input.name]) {
      input.value = values[input.name];
    }
    input.addEventListener('input', printFeedback);
  }
}

handleSubmit = event => {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.clear();
};
form.addEventListener('submit', handleSubmit);
