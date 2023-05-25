import UserRepository from './Infrastructure/UserRepository';
import SignUpService from './Application/SignUpService';
import SignInService from './Application/SignInService';
// import {renderSignInResponse} from '../ui/signIn';


const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUp(event));
signinForm.addEventListener("submit", event => handleSignIn(event));

async function handleSignUp(event: Event) {
  let signUpResponse = await signUp(event);
  renderFeedback(signUpResponse, signupForm);
}

async function handleSignIn(event: Event) {
  let signInResponse = await signIn(event);
  renderFeedback(signInResponse, signinForm);
}

function renderFeedback(signInResponse: InputResponse | GlobalResponse, formElement: HTMLFormElement) {
  console.log(signInResponse);
  const oldErrorMsgs = document.getElementsByClassName('error-message');
  while (oldErrorMsgs.length > 0) {
    oldErrorMsgs[0]?.parentNode?.removeChild(oldErrorMsgs[0]);
  }

  if ('errors' in signInResponse) {
    // InputResponse
    // setInputErrors
    const errorFields: any = [];
    signInResponse.errors.forEach(error => {

      if (!errorFields.includes(error.field)) {
        errorFields.push(error.field);

        console.log(errorFields);
        const inputField = formElement.elements.namedItem(error.field) as HTMLInputElement;

        if (!inputField) {
          throw new Error(`Input field ${error.field} does not exist.`);
        }

        // Agregar un mensaje de error
        const errorMessage = document.createElement('span');
        errorMessage.textContent = error.message;
        errorMessage.className = 'error-message';
        inputField?.parentElement?.appendChild(errorMessage);
      }
    });
  } else {
    const feedbackElement: HTMLElement | null = document.getElementById('form-feedback');

    if (feedbackElement !== null) {
      feedbackElement.textContent = signInResponse.message;
      feedbackElement.className = '';
      feedbackElement.classList.add(
        signInResponse.status === 'success'
          ? 'feedback-success'
          : 'feedback-error');
    } else {
      throw new Error(`Element does not exist.`);
    }
  }
}


async function signUp(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const userRepository = new UserRepository();
    const signUpService = new SignUpService(userRepository);
    const response = await signUpService.signUp(formData);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const userRepository = new UserRepository();
    const signInService = new SignInService(userRepository);
    const response = await signInService.signIn(formData);
    return response;
  } catch (error) {
    console.error(error);
  }
}

interface InputResponse {
  status: string,
  errors: Array<{ field: 'string', message: string }>,
}

interface GlobalResponse {
  status: string,
  message: string,
  data?: string
}