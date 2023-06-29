import { InputResponse, AppResponse } from '../../../src/AppAdapter';

export class FormFeedback {
  formElement: HTMLFormElement;
  formResponse: InputResponse | AppResponse;
  formFeedback: any;
  popUpArea: any;

  constructor(formElementId: string, formResponse: InputResponse | AppResponse) {
    const formElement = document.getElementById(formElementId) as HTMLFormElement;
    this.formFeedback = formElement.querySelector('.form-feedback');
    this.popUpArea = document.getElementById('popup-area');

    if (!formElement) {
      throw new Error(`Form with id ${formElementId} does not exist.`);
    }

    this.formElement = formElement;
    this.formResponse = formResponse;
  }

  render() {
    this.removeOldErrorMessages();
    this.removeFeedBackMessage();

    if ('inputErrors' in this.formResponse) {
      this.renderInputFeedback(this.formResponse);
    } else {
      this.renderAppFeedback();
    }
  }

  private renderAppFeedback() {
    const formResponse = this.formResponse as AppResponse;
    this.formFeedback.classList.replace('hidden', 'visible');

    if(formResponse.status === 'error') {
      this.formFeedback.classList.add('error-color');
      this.formFeedback.textContent = formResponse.message;

    } else if (formResponse.status === 'success') {
      // Show success popup
      const successTemplate = document.getElementById('feedback-success');
      if (successTemplate) {
        const clonedSuccessTemp = document.importNode(successTemplate.content, true);
        const successMessageElement = clonedSuccessTemp.querySelector('#feedback-success-msg');
        if (successMessageElement) {
          successMessageElement.textContent = formResponse.message;
        }

        this.popUpArea.appendChild(clonedSuccessTemp);
        this.popUpArea.classList.replace('hidden', 'visible');
        this.popUpArea.style.display = 'flex';

        // Close on click anywhere else
        document.addEventListener('click', (event) => this.closePopup(event, this.popUpArea));
      }
    }
  }
  
  private closePopup(event, targetElement) {
    const successPopup = document.getElementById('success-popup');
    if (!successPopup?.contains(event.target)) {
      targetElement.classList.replace('visible', 'hidden');
      setTimeout(function() {
        targetElement.style.display = 'none';
        while (targetElement.firstChild) {
          targetElement.removeChild(targetElement.firstChild);
        }
      }, 400);
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

        // create span message under error input
        const inputErrorMessage = document.createElement('span');
        inputErrorMessage.textContent = error.message;
        inputErrorMessage.className = 'input-error visible';
        inputField?.parentElement?.appendChild(inputErrorMessage);

        // delete on input
        inputField.addEventListener('input', () => this.removeMessageIfWriting(inputErrorMessage));
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
    this.formFeedback.classList.remove('error', 'success');
  }

  private removeMessageIfWriting(errorMessage: HTMLSpanElement) {
    errorMessage.classList.replace('visible', 'hidden');
    this.formFeedback.replace('visible', 'hidden');
    if (errorMessage.parentNode) {
      setTimeout(function() {
        errorMessage.parentNode.removeChild(errorMessage);
    }, 400);
    }
  }
}
