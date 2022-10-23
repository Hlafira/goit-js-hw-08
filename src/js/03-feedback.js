import storage from './storage';
import throttle from 'lodash.throttle';

const FORM_VALUES_KEY = 'feedback-form-state';

const saveFeedback = throttle(event => {
  // search parent form element
  if (event.currentTarget) {
    let from = event.currentTarget;
    while (from.nodeName !== 'FORM') {
      from = from.parentNode;
    }

    // collect object from form fields
    const data = new FormData(from);

    const formValues = {};
    data.forEach((value, key) => {
      formValues[key] = value;
    });
    // save to local storage
    storage.saveToStorage(FORM_VALUES_KEY, formValues);
  }
}, 500);

// fill form fields from local storage
const values = storage.loadFromStorage(FORM_VALUES_KEY);
const form = document.querySelector('.feedback-form');

for (let input of form.elements) {
  if (input.name) {
    if (values && values[input.name]) {
      input.value = values[input.name];
    }
    input.addEventListener('input', saveFeedback);
  }
}

// reset form
const handleSubmit = event => {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.clear();
};
form.addEventListener('submit', handleSubmit);
