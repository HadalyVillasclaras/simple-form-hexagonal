const formFeedback = document.getElementById('form-feedback');
const inputFields = document.querySelectorAll('.input-field');
import { API_BASE_URL } from '../config.js';

export function handleSignUp(event) {
  event.preventDefault();

  if (validateInputFields(inputFields)) {
    signUp(event);
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
    } else if (input.name === 'password' && (input.value.length < 4 || input.value.length > 8)) {
      inputErrorMsg.textContent = 'The password must be 4 to 8 characters long.';
      inputErrorMsg.style.display = 'block';
      isValid = false;
    } else if (input.name === 'email' && !input.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      inputErrorMsg.textContent = 'Please enter a valid email address.';
      inputErrorMsg.style.display = 'block';
      isValid = false;
    } else {
      inputErrorMsg.textContent = '';
      inputErrorMsg.style.display = 'none';
    }
  }
  return isValid;
}

function signUp(event) {
  event.preventDefault();

  let formData = new FormData(event.target);
  console.log(formData);
  
  fetch(API_BASE_URL + 'SignUpController.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    return response.json();
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