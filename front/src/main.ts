// import { handleSignUp} from './Application/signUp.js';
// import { handleSignIn} from './Application/signIn.js';

// const signupForm = document.getElementById('signup-form');
// const signinForm = document.getElementById('signin-form');

// signupForm.addEventListener("submit", event => handleSignUp(event));
// signinForm.addEventListener("submit", event => handleSignIn(event));

import SignUpService from './Application/SignUpService';
const form = document.getElementById('signup-form') as HTMLFormElement;

form.addEventListener('submit', event => handleSignUp(event));

async function handleSignUp(event: Event) {
    event.preventDefault();
  
    const inputFields = document.querySelectorAll('.input-field');
    if (validateInputFields(inputFields)) {
        const signUpService = new SignUpService();
        const response = await signUpService.signUp(event);
        console.log(response);
    }
}

const formFeedback = document.getElementById('form-feedback') as HTMLElement;
function validateInputFields(inputFields: NodeListOf<Element>): boolean {
    let isValid = true;
  
    for (let i = 0; i < inputFields.length; i++) {
      let input = inputFields[i] as HTMLInputElement;
      let inputErrorMsg = input.nextElementSibling as HTMLElement;
  
      if (input.value.trim() === '') {
        inputErrorMsg.textContent = 'Required field';
        inputErrorMsg.style.display = 'block';
        isValid = false;
      } else if (input.name === 'password' && (input.value.length < 6 || input.value.length > 10)) {
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



// import SignUpService from './Application/SignUpService.js';
// const form = document.getElementById('signup-form');


// form.addEventListener('submit', event => handleSignUp(event));

// async function handleSignUp(event) {
//     event.preventDefault();
  
//     if (validateInputFields(inputFields)) {
//         const signUpService = new SignUpService();
//         const response = await signUpService.signUp(event);
//         console.log(response);
//     }
//   }

//   const formFeedback = document.getElementById('form-feedback');
//   const inputFields = document.querySelectorAll('.input-field');
//   function validateInputFields(inputFields) {
//     let isValid = true;
  
//     for (let i = 0; i < inputFields.length; i++) {
//       let input = inputFields[i];
//       let inputErrorMsg = input.nextElementSibling;
  
//       if (input.value.trim() === '') {
//         inputErrorMsg.textContent = 'Required field';
//         inputErrorMsg.style.display = 'block';
//         isValid = false;
//       } else if (input.name === 'password' && (input.value.length < 6 || input.value.length > 10)) {
//         inputErrorMsg.textContent = 'The password must be 4 to 8 characters long.';
//         inputErrorMsg.style.display = 'block';
//         isValid = false;
//       } else if (input.name === 'email' && !input.value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
//         inputErrorMsg.textContent = 'Please enter a valid email address.';
//         inputErrorMsg.style.display = 'block';
//         isValid = false;
//       } else {
//         inputErrorMsg.textContent = '';
//         inputErrorMsg.style.display = 'none';
//       }
//     }
//     return isValid;
//   }