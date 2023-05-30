import { AppAdapter, InputResponse, AppResponse } from '../src/AppAdapter';
import { signIn } from './components/signIn';
import { signUp } from './components/signUp';

const appAdapter = new AppAdapter();

const signupForm = document.getElementById('signup-form') as HTMLFormElement;
// const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUpResponse(event));
// signinForm.addEventListener("submit", event => handleSignInResponse(event));

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
labelGoesTop()
// labels go top
function labelGoesTop() {
  const fieldsetPs = document.querySelectorAll('fieldset p');

  fieldsetPs.forEach(p => {
    const label = p.querySelector('label');
    const input = p.querySelector('input');
    console.log(input.value);

    input?.addEventListener('focus', function () {
      label.classList.add('fieldset-label-focus');
    });

    input?.addEventListener('blur', function () {
      if (input.value === '') {
        label.classList.remove('fieldset-label-focus');
      }

    });
  })
};

// Show password
function showPassword(event: any) {
  let eyeIcon = document.querySelector('.eye-icon') as HTMLElement;

  if (event.target.value.length > 0) {
    eyeIcon?.classList.add('visible');
  } else {
    eyeIcon?.classList.remove('visible');
  }

    if (passwordInput) {
      eyeIcon?.addEventListener('mousedown', function () {
        passwordInput.type = 'text';
      });
      eyeIcon?.addEventListener('mouseup', function () {
        passwordInput.type = 'password';
      });
      eyeIcon?.addEventListener('mouseout', function () {
        passwordInput.type = 'password';
      });
    }
};

const passwordInput = document.querySelector('input[name="password"]')  as HTMLInputElement;
passwordInput?.addEventListener('input', showPassword);


// Switch form visibility
const signInLink = document.querySelector('#signin-sect a') as HTMLElement;
signInLink.addEventListener('click', (e) => switchForm(e, 'signup-sect', 'signin-sect'));

const signUpLink = document.querySelector('#signup-sect a') as HTMLElement;
signUpLink.addEventListener('click', (e) => switchForm(e, 'signin-sect', 'signup-sect'));

function switchForm(event: MouseEvent, sectionToShowId: string, sectionToHideId: string) {
  event.preventDefault();

  const sectionToShow = document.getElementById(sectionToShowId) as HTMLElement;
  const sectionToHide = document.getElementById(sectionToHideId) as HTMLElement;

  sectionToShow.style.display = 'flex';
  sectionToHide.style.display = 'none';
}



// Theme mode
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('theme-mode');

  if (!toggleButton) {
      throw new Error(`Theme mode button does not exist.`);
  }

  toggleButton.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      switchTheme(currentTheme);
  });

  function switchTheme(currentTheme: string | null) {
      if (currentTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'light');
      } else {
          document.documentElement.setAttribute('data-theme', 'dark');
      }
  }
});


// Magnetic circle
document.addEventListener('DOMContentLoaded', () => {
  const circle = document.getElementById('circle') as HTMLElement;
  const circleText = document.getElementById('circle-text') as HTMLElement;

  circle.addEventListener('mousemove', (event) => {
    const rect = circle.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // elements ratio 
    const ratioCircle = 0.8;  
    const ratioText = 0.1; 

    const moveXCircle = (x - rect.width / 2) * ratioCircle;
    const moveYCircle = (y - rect.height / 2) * ratioCircle;

    const moveXText = (x - rect.width / 2) * ratioText;
    const moveYText = (y - rect.height / 2) * ratioText;

    // transform
    circle.style.transform = `scale(1.5) translate3d(${moveXCircle}px, ${moveYCircle}px, 0)`;
    circleText.style.transform = `translate3d(${moveXText}px, ${moveYText}px, 0)`;
  });

  circle.addEventListener('mouseleave', () => {
    circle.style.transform = `translate3d(0, 0, 0)`;
    circleText.style.transform = `translate3d(0, 0, 0)`;
  });
});
