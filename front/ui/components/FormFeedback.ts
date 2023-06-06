import { InputResponse, AppResponse } from '../../src/AppAdapter';

export class FormFeedback {
  formElement: HTMLFormElement;
  formResponse: InputResponse | AppResponse;

  constructor(formElementId: string, formResponse: InputResponse | AppResponse) {
    const formElement = document.getElementById(formElementId) as HTMLFormElement;

    if (!formElement) {
      throw new Error(`Form with id ${formElementId} does not exist.`);
    }

    this.formElement = formElement;
    this.formResponse = formResponse;

    console.log(formElement, formResponse);
  }

  render() {
    if ('inputErrors' in this.formResponse) {
      this.renderInputFeedback();
    } else {
      this.renderAppFeedback();
    }
  }

  private renderAppFeedback() {
    const formFeedback = this.formElement.querySelector('.form-feedback');

    if(formFeedback) {
      this.removeFeedBackMessage(formFeedback);
      const formResponse = this.formResponse as AppResponse;
      formFeedback.classList.remove('error', 'success');
      if(formResponse.status === 'error') {
        formFeedback.classList.add('error');
      } else if(formResponse.status === 'success') {
        formFeedback.classList.add('success');
      }

      formFeedback.textContent = formResponse.message;
    }
  }

  private renderInputFeedback() {
    this.removeOldErrorMessages();
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

  private removeFeedBackMessage(formFeedback: any) {
    formFeedback.content = '';
  }
}
