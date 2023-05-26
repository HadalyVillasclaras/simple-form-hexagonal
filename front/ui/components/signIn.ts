import {InputResponse} from '../../src/AppAdapter';
import {AppResponse} from '../../src/AppAdapter';

export function renderSignInFeedback(formElement: HTMLFormElement, signInResponse: InputResponse | AppResponse) {
  console.log(signInResponse);
  const oldErrorMsgs = document.getElementsByClassName('error-message');
  while (oldErrorMsgs.length > 0) {
    oldErrorMsgs[0]?.parentNode?.removeChild(oldErrorMsgs[0]);
  }

  if ('errors' in signInResponse) {
    const errorFields: any = [];
    signInResponse.errors.forEach(error => {

      if (!errorFields.includes(error.field)) {
        errorFields.push(error.field);

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
  }  else {
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
