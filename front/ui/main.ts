import { AppAdapter } from '../src/AppAdapter';
import { FormFeedback } from './components/FormFeedback';

const appAdapter = new AppAdapter();

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUpResponse(event));
signinForm.addEventListener("submit", event => handleSignInResponse(event));

async function handleSignUpResponse(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signUpResponse = await appAdapter.handleSignUp(formData);
    const formFeedback = new FormFeedback(signupForm, signUpResponse)
    formFeedback.render();
  } catch (error) {
    throw { status: 'error', message: error.message };
  }
}

async function handleSignInResponse(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signInResponse = await appAdapter.handleSignIn(formData);
    const formFeedback = new FormFeedback(signinForm, signInResponse)
    formFeedback.render();
  } catch (error) {
    throw { status: 'error', message: error.message };
  }
}