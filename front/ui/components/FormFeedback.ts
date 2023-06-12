import { InputResponse, AppResponse } from '../../src/AppAdapter';

export class FormFeedback {
  formElement: HTMLFormElement;
  formResponse: InputResponse | AppResponse;
  formFeedback: any;
  constructor(formElementId: string, formResponse: InputResponse | AppResponse) {
    const formElement = document.getElementById(formElementId) as HTMLFormElement;
    this.formFeedback = formElement.querySelector('.form-feedback');

    if (!formElement) {
      throw new Error(`Form with id ${formElementId} does not exist.`);
    }

    this.formElement = formElement;
    this.formResponse = formResponse;
  }

  render() {
    if ('inputErrors' in this.formResponse) {
      this.renderInputFeedback();
    } else {
      this.renderAppFeedback();
    }
  }

  private renderAppFeedback() {
    this.formFeedback.style.opacity = 1;
  this.formFeedback.style.visibility = 'visible';
    if(this.formFeedback) {
      this.removeFeedBackMessage();
      const formResponse = this.formResponse as AppResponse;
      this.formFeedback.classList.remove('error', 'success');
      if(formResponse.status === 'error') {
        this.formFeedback.classList.add('error');
      } else if(formResponse.status === 'success') {
        this.formFeedback.classList.add('success');
      }

      this.formFeedback.textContent = formResponse.message;
    }
  }

  private renderInputFeedback() {
    this.removeOldErrorMessages();
    this.removeFeedBackMessage() 
    const errorFields: any = [];

    const inputResponse = this.formResponse as InputResponse;

    inputResponse.inputErrors.forEach(error => {
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

  private removeOldErrorMessages() {
    const oldErrorMsgs = document.getElementsByClassName('input-error');
    while (oldErrorMsgs.length > 0) {
      oldErrorMsgs[0]?.parentNode?.removeChild(oldErrorMsgs[0]);
    }
  }

  private removeFeedBackMessage() {
    this.formFeedback.textContent = '';
    this.formFeedback.innerHTML = '';
  }
}
