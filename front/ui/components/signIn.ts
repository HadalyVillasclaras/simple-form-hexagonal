import { FormFeedback } from './FormFeedback';
import { InputResponse, AppResponse } from '../../src/AppAdapter';

export function signIn(signInForm: HTMLFormElement, signInResponse: InputResponse | AppResponse) {
  const formFeedback = new FormFeedback(signInForm, signInResponse)
  formFeedback.render();
}