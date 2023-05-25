import { AppAdapter } from '../src/AppAdapter';
const appAdapter = new AppAdapter();

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUp(event));
signinForm.addEventListener("submit", event => handleSignIn(event));

async function handleSignUp(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signUpResponse = await appAdapter.handleSignUp(formData);
    console.log(signUpResponse);

    renderFeedback(signUpResponse, signupForm);
  } catch (error) {
    console.error(error);
  }
}

async function handleSignIn(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signInResponse = await appAdapter.handleSignIn(formData);
    console.log(signInResponse);

    renderFeedback(signInResponse, signinForm);
  } catch (error) {
    console.error(error);
  }
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



interface InputResponse {
  status: string,
  errors: Array<{ field: 'string', message: string }>,
}

interface GlobalResponse {
  status: string,
  message: string,
  data?: string
}