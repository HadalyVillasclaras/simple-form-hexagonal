import { AppAdapter, InputResponse, AppResponse } from '../src/AppAdapter';
import { signIn } from './components/signIn';
import { signUp } from './components/signUp';

const appAdapter = new AppAdapter();

// On load: Theme mode, Magnetic circle, Form animations
import {formAnimations} from './components/Forms/formAnimations';
import {themeMode} from './components/ThemeMode/themeMode';
import {magneticCircle} from './components/MagneticCircle/magneticCircle';

document.addEventListener('DOMContentLoaded', function () {
  themeMode();
  magneticCircle();
  formAnimations();
});


// Handle form submit
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm?.addEventListener('submit', event => handleSignUpResponse(event));
signinForm?.addEventListener("submit", event => handleSignInResponse(event));

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


// Switch templates
const formSection = document.getElementById('forms-sect');
const signupTemplate:any = document.getElementById('signup-template');
const signinTemplate:any = document.getElementById('signin-template');

// Default template
let currentTemplate = signupTemplate?.content.cloneNode(true);
formSection?.appendChild(currentTemplate);

// direct links
const signInLink = document.getElementById('signin-link');
const signUpLink = document.getElementById('signup-link');

signInLink?.addEventListener('click', (e) => switchTemplates(e, signinTemplate));
signUpLink?.addEventListener('click', (e) => switchTemplates(e, signupTemplate));

function switchTemplates(event: MouseEvent, templateToShow: any) {
  event.preventDefault();

  while(formSection?.firstChild){
    formSection?.firstChild.remove();
  }

  currentTemplate = templateToShow?.content.cloneNode(true);
  formSection?.appendChild(currentTemplate);
  
  // Update links
  const signInLink = document.getElementById('signin-link');
  const signUpLink = document.getElementById('signup-link');
  signInLink?.addEventListener('click', (e) => switchTemplates(e, signinTemplate));
  signUpLink?.addEventListener('click', (e) => switchTemplates(e, signupTemplate));

  // update form animations in current form template
  formAnimations();
}



