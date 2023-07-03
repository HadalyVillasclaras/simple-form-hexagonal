import { InputResponse, AppResponse } from '../../../src/AppAdapter';

export class FormFeedback {
  formElement: HTMLFormElement;
  formResponse: InputResponse | AppResponse;
  formFeedback: any;

  constructor(formElementId: string, formResponse: InputResponse | AppResponse) {
    const formElement = document.getElementById(formElementId) as HTMLFormElement;
    const formFeedback = formElement.querySelector('.form-feedback');

    if (!formElement || !formFeedback) {
      throw new Error(`Element does not exist.`);
    }

    this.formElement = formElement;
    this.formResponse = formResponse;
    this.formFeedback = formFeedback;
  }

  render() {
    if ('inputErrors' in this.formResponse) {
      this.renderInputFeedback(this.formResponse);
    } else {
      this.renderAppFeedback();
    }
  }

  private renderAppFeedback() {
    const formResponse = this.formResponse as AppResponse;
    this.formFeedback.classList.replace('hidden', 'visible');

    if (formResponse.status === 'error') {
      this.formFeedback.classList.add('error-color');
      this.formFeedback.textContent = formResponse.message;
      const inputs = Array.from(this.formElement.querySelectorAll('input'));

      inputs.forEach(input => {
        input.addEventListener('input', () => this.removeFeedBackMessage());
      });
    } else if (formResponse.status === 'success') {
      setTimeout(() => this.openPopup(), 500);
    }
  }

  private renderInputFeedback(inputResponse: InputResponse) {
    const errorFields: any = [];

    inputResponse.inputErrors.forEach(error => {
      if (!errorFields.includes(error.field)) {
        errorFields.push(error.field);
        const inputField = this.formElement.elements.namedItem(error.field) as HTMLInputElement;

        if (!inputField) {
          throw new Error(`Input field ${error.field} does not exist.`);
        }

        const parentP = inputField.parentElement;
        const errorSpan = parentP.querySelector('span.input-error');
        errorSpan.textContent = error.message; 
        errorSpan.classList.replace('hidden', 'visible');

        //delete on input
        inputField.addEventListener('input', () => this.removeErrorsIfWriting(errorSpan));
      }
    });
  }

  private removeOldErrorMessages() {
    const oldErrorMsgs = document.getElementsByClassName('input-error');
    while (oldErrorMsgs.length > 0) {
      oldErrorMsgs[0]?.parentNode?.removeChild(oldErrorMsgs[0]);
    }
  }

  private removeFeedBackMessage() {
    this.formFeedback.textContent = '';
    this.formFeedback.innerHTML = '';
    this.formFeedback.classList.replace('visible', 'hidden');
    this.formFeedback.classList.remove('error-color', 'success-color');
  }

  private removeErrorsIfWriting(errorElement: HTMLSpanElement) {
    errorElement.classList.replace('visible', 'hidden');
    setTimeout(function () {
      errorElement.textContent = ""; 
    }, 400);
  }

  private openPopup() {
    const popUpArea = document.getElementById('popup-area');
    const successTemplate = document.getElementById('feedback-success');

    if (successTemplate && popUpArea) {
      const clonedSuccessTemp = document.importNode(successTemplate.content, true);
      const successMessageElement = clonedSuccessTemp.querySelector('#feedback-success-msg');
      if (successMessageElement) {
        successMessageElement.textContent = this.formResponse.message;
      }

      popUpArea.appendChild(clonedSuccessTemp);
      popUpArea.style.display = 'flex';
      // popUpArea.classList.replace('hidden', 'visible');

      // Close on click anywhere else
      document.addEventListener('click', (event) => this.closePopup(event, popUpArea));
    }
  }

  private closePopup(event: MouseEvent, targetElement: any) {
    const successPopup = document.getElementById('success-popup');
    if (!successPopup?.contains(event.target)) {
      targetElement.classList.replace('visible', 'hidden');
      setTimeout(function () {
        targetElement.style.display = 'none';
        while (targetElement.firstChild) {
          targetElement.removeChild(targetElement.firstChild);
        }
        location.reload();
      }, 400);
    }
  }
}