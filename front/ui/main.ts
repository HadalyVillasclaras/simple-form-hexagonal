import { AppAdapter, InputResponse, AppResponse } from '../src/AppAdapter';
import { FormFeedback } from './components/Forms/Feedback/FormFeedback';

const appAdapter = new AppAdapter();

// On load: Theme mode, Magnetic circle, Form animations, cards
import {formAnimations} from './components/Forms/formAnimations';
import {themeMode} from './components/ThemeMode/themeMode';
import {magneticCircle} from './components/MagneticCircle/magneticCircle';
import {signInHelpCard} from './components/Cards/helpCard';
import {initLock} from './components/Lock/openCloseLock';

window.addEventListener('DOMContentLoaded', function () {
  setDefaultTemplate();
  themeMode();
  magneticCircle();
  formAnimations();
});

// Switch templates
const formSection = document.getElementById('forms-sect');
const signupTemplate:any = document.getElementById('signup-template');
const signinTemplate:any = document.getElementById('signin-template');

let currentTemplate;

function setDefaultTemplate() {
  currentTemplate = signupTemplate?.content.cloneNode(true);
  formSection?.appendChild(currentTemplate); // Default template

  setLinks();
  handleSignUpSubmit();
  setTimeout(formAnimations, 0);
}

function setLinks() {
  const signInLink = document.getElementById('signin-link');
  const signUpLink = document.getElementById('signup-link');
  signInLink?.addEventListener('click', (e) => switchTemplates(e, signinTemplate));
  signUpLink?.addEventListener('click', (e) => switchTemplates(e, signupTemplate));
}

function switchTemplates(event: MouseEvent, templateToShow: any) {
  event.preventDefault();

  while(formSection?.firstChild){
    formSection?.firstChild.remove();
  }

  currentTemplate = templateToShow?.content.cloneNode(true);
  formSection?.appendChild(currentTemplate);

  if(formSection?.classList.contains('fade-in')) {
    formSection?.classList.remove('fade-in');
  }

  void formSection?.offsetWidth;
  formSection?.classList.add('fade-in');

  // Update links, elements and events
  setLinks();
  formAnimations();

  if (templateToShow === signinTemplate) {
    document.body.style.backgroundColor = 'var(--bg-color-sign-in)';
    handleSignInSubmit();
    signInHelpCard();
    initLock
  ()
  } else if (templateToShow === signupTemplate) {
    document.body.style.backgroundColor = 'var(--bg-color-sign-up)';
  handleSignUpSubmit();
  }
}

// Handle forms submit
export function handleSignInSubmit() {
  const signinForm = document.getElementById('signin-form') as HTMLFormElement;
  signinForm?.addEventListener("submit", event => handleSignInResponse(event));

  async function handleSignInResponse(event: Event) {
    event.preventDefault();

    const submitButton = (event.target as HTMLFormElement).querySelector('input[type="submit"], button[type="submit"]') as HTMLInputElement | HTMLButtonElement;
    submitButton.disabled = true;
console.log(submitButton);
console.log(submitButton.disabled);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const signInResponse: InputResponse | AppResponse = await appAdapter.handleSignIn(formData);
      const formFeedback = new FormFeedback('signin-form', signInResponse);
      formFeedback.render();
    } catch (error) {
      if (error instanceof Error) {
        const formFeedback = new FormFeedback('signin-form', { status: 'error', message: error.message });
        formFeedback.render();
      }
    } 
    setTimeout(() => {
      submitButton.disabled = false;
      
    }, 5000);
  }
}

export function handleSignUpSubmit() {
  const signupForm = document.getElementById('signup-form') as HTMLFormElement;
  signupForm?.addEventListener('submit', event => handleSignUpResponse(event));
  
  async function handleSignUpResponse(event: Event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const signUpResponse: InputResponse | AppResponse = await appAdapter.handleSignUp(formData);
      const formFeedback = new FormFeedback('signup-form', signUpResponse);
      formFeedback.render();
    } catch (error) {
      if (error instanceof Error) {
        const formFeedback = new FormFeedback('signup-form', { status: 'error', message: error.message });
        formFeedback.render();
      }
    }
  }
}