import { InputResponse, AppResponse } from '../../src/AppAdapter';

export class FormFeedback {
  formElement: HTMLFormElement;
  formResponse: InputResponse | AppResponse;
  formFeedback: HTMLElement | null;

  constructor(formElement: HTMLFormElement, formResponse: InputResponse | AppResponse) {
    this.formElement = formElement;
    this.formResponse = formResponse;
    this.formFeedback = document.getElementById('form-feedback');
  }

  render() {
    if ('errors' in this.formResponse) {
      this.renderInputFeedback();
    }
    else {
      this.renderAppFeedback();
    }
  }

  private renderInputFeedback() {
    this.removeOldErrorMessages();
    const errorFields: any = [];

    const inputResponse = this.formResponse as InputResponse;

    inputResponse.errors.forEach(error => {
      if (!errorFields.includes(error.field)) {
        errorFields.push(error.field);

        const inputField = this.formElement.elements.namedItem(error.field) as HTMLInputElement;

        if (!inputField) {
          throw new Error(`Input field ${error.field} does not exist.`);
        }

        const errorMessage = document.createElement('span');
        errorMessage.textContent = error.message;
        errorMessage.className = 'input-error';
        inputField?.parentElement?.appendChild(errorMessage);

        // delete on input
        inputField.addEventListener('input', () => {
          if (errorMessage.parentNode) {
            errorMessage.style.opacity = '0';
            errorMessage.parentNode.removeChild(errorMessage);
          }
        });
      }
    });
  }

  private renderAppFeedback() {
    this.removeOldErrorMessages();

    if (!this.formFeedback) {
      throw new Error(`Element does not exist.`);
    }
    const formResponse = this.formResponse as AppResponse;

    this.formFeedback.textContent = formResponse.message;
    this.formFeedback.className = '';
    this.formFeedback.classList.add(
      this.formResponse.status === 'success'
        ? 'feedback-success'
        : 'feedback-error');
  }


  private removeOldErrorMessages() {
    const oldErrorMsgs = document.getElementsByClassName('input-error');
    while (oldErrorMsgs.length > 0) {
      oldErrorMsgs[0]?.parentNode?.removeChild(oldErrorMsgs[0]);
    }

    if (this.formFeedback) {
      this.formFeedback.textContent = '';
      this.formFeedback.className = '';
    }
  }



}