const formFeedback = document.getElementById('form-feedback');
const inputFields = document.querySelectorAll('.input-field');
import { API_BASE_URL } from '../config.js';

export function handleSubmit(event) {
  event.preventDefault();

  if (validateInputFields(inputFields)) {
    signUp(event);
  }
}

function validateInputFields(inputFields) {
  let isValid = false;

  for (let i = 0; i < inputFields.length; i++) {
    let input = inputFields[i];
    let inputErrorMsg = input.nextElementSibling;

    if (!input.value.trim()) {
      inputErrorMsg.textContent = 'Este campo es requerido.';
      inputErrorMsg.style.display = 'block';
    } else if (input.name === 'password' && (input.value.length < 4 || input.value.length > 8)) {
      inputErrorMsg.textContent = 'La contraseña debe tener entre 4 y 8 caracteres.';
      inputErrorMsg.style.display = 'block';
    } else if (input.name === 'email' && !input.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      inputErrorMsg.textContent = 'Introduzca un correo electrónico válido.';
      inputErrorMsg.style.display = 'block';
    } else {
      inputErrorMsg.textContent = '';
      inputErrorMsg.style.display = 'none';
      isValid = true;
    }
  }

  return isValid;
}

function signUp(event) {
  event.preventDefault();

  let formData = new FormData(event.target);
  console.log(formData);
  
  fetch(API_BASE_URL + 'UserController.php', {
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
      formFeedback.textContent = 'El correo electrónico ya está registrado.';
    } else {
      console.error('Error:', error);
    }
  });
}