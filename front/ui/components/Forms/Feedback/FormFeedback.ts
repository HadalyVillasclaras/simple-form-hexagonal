import { InputResponse, AppResponse } from '../../../../src/AppAdapter';
import { openPopup } from './successPopup';

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
      this.formFeedback.classList.replace('no-height', 'height');
      this.formFeedback.textContent = formResponse.message;

      this.removeAppFeedbackIfWriting();
      
    } else if (formResponse.status === 'success') {
      setTimeout(() => openPopup(formResponse.message), 500);
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

        // Render msg in current input error span
        const inputParent = inputField.parentElement;
        const errorSpan: HTMLSpanElement = inputParent?.querySelector('span.input-error');
        
        if (errorSpan) {
        errorSpan.textContent = error.message; 
        errorSpan.classList.replace('hidden', 'visible');
        }

        //delete on input
        inputField.addEventListener('input', () => this.removeInputFedbackIfWriting(errorSpan));
      }
    });
  }

  private removeInputFedbackIfWriting(errorElement: HTMLSpanElement) {
    errorElement.classList.replace('visible', 'hidden');

    setTimeout(function () {
      errorElement.textContent = ""; 
    }, 400);
  }

  private removeAppFeedbackIfWriting() {
    const inputs = Array.from(this.formElement.querySelectorAll('input'));

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.formFeedback.classList.replace('visible', 'hidden');
        setTimeout(() => {
          this.formFeedback.classList.remove('error-color', 'success-color');
          this.formFeedback.textContent = '';
          this.formFeedback.innerHTML = '';
        }, 500);
      });
    });
  }

  private removeOldErrorMessages() {
    const oldErrorMsgs = document.getElementsByClassName('input-error');
    while (oldErrorMsgs.length > 0) {
      oldErrorMsgs[0]?.parentNode?.removeChild(oldErrorMsgs[0]);
    }
  }
}