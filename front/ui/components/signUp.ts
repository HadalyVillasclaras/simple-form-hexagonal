import { FormFeedback } from './FormFeedback';
import { InputResponse, AppResponse } from '../../src/AppAdapter';

export function signUp(signUpForm: HTMLFormElement, signUpResponse: InputResponse | AppResponse) {
  const formFeedback = new FormFeedback(signUpForm, signUpResponse)
  formFeedback.render();
}