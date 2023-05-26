import { AppAdapter } from '../src/AppAdapter';
import { renderSignInFeedback } from './components/signIn';
import { renderSignUpFeedback } from './components/signUp';


const appAdapter = new AppAdapter();

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUp(event));
signinForm.addEventListener("submit", event => handleSignIn(event));

async function handleSignUp(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signUpResponse = await appAdapter.handleSignUp(formData);
    renderSignUpFeedback(signupForm, signUpResponse);
  } catch (error) {
    throw { status: 'error', message: error.message };
  }
}

async function handleSignIn(event: Event) {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const signInResponse = await appAdapter.handleSignIn(formData);
    renderSignInFeedback(signinForm, signInResponse);
  } catch (error) {
    throw { status: 'error', message: error.message };
  }
}