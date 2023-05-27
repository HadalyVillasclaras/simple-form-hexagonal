import { AppAdapter, InputResponse, AppResponse } from '../src/AppAdapter';
import { signIn } from './components/signIn';
import { signUp } from './components/signUp';

const appAdapter = new AppAdapter();

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUpResponse(event));
signinForm.addEventListener("submit", event => handleSignInResponse(event));

async function handleSignUpResponse(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signUpResponse: InputResponse | AppResponse = await appAdapter.handleSignUp(formData);
    signIn(signupForm, signUpResponse);
  } catch (error) {
    throw { status: 'error', message: error.message };
  }
}

async function handleSignInResponse(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signInResponse: InputResponse | AppResponse = await appAdapter.handleSignIn(formData);
    signUp(signinForm, signInResponse);

  } catch (error) {
    throw { status: 'error', message: error.message };
  }
}