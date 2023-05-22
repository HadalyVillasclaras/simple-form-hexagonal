const formFeedback = document.getElementById('form-feedback');
const inputFields = document.querySelectorAll('.input-field');
import { API_BASE_URL } from '../config.js';

export function handleSignIn(event) {
  event.preventDefault();
  if (validateInputFields(inputFields)) {
    signIn(event);
  }
}

function validateInputFields(inputFields) {
  let isValid = true;

  for (let i = 0; i < inputFields.length; i++) {
    let input = inputFields[i];
    let inputErrorMsg = input.nextElementSibling;

    if (input.value.trim() === '') {
      inputErrorMsg.textContent = 'Required field';
      inputErrorMsg.style.display = 'block';
      isValid = false;
    } else {
      inputErrorMsg.textContent = '';
      inputErrorMsg.style.display = 'none';
    }
  }

  return isValid;
}

function signIn(event) {
  event.preventDefault();

  let formData = new FormData(event.target);
  console.log(formData);
  
  fetch(API_BASE_URL + 'SignInController.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log(response);
    return response.text();
  })
  .then(data => {
    console.log(data);

    formFeedback.style.color = 'green';
    formFeedback.textContent = data;
  })
  .catch((error) => {
    if (error.message == '409') {
      formFeedback.textContent = 'This email address is already registered.';
    } else {
      console.error('Error:', error);
    }
  });
}