import UserRepository from './src/Infrastructure/UserRepository';
import SignUpService from './src/Application/SignUpService';
import SignInService from './src/Application/SignInService';
const signupForm = document.getElementById('signup-form') as HTMLFormElement;
const signinForm = document.getElementById('signin-form') as HTMLFormElement;

signupForm.addEventListener('submit', event => handleSignUp(event));
signinForm.addEventListener("submit", event => handleSignIn(event));


async function handleSignUp(event: Event) {
  event.preventDefault();

  const inputFields = document.querySelectorAll('.input-field');

  const formData = new FormData(event.target as HTMLFormElement);
  const userRepository = new UserRepository();
  const signUpService = new SignUpService(userRepository);

  const response = await signUpService.signUp(formData);
  console.log(response);
}

async function handleSignIn(event: Event) {
  event.preventDefault();

  const inputFields = document.querySelectorAll('.input-field');
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    const userRepository = new UserRepository();
    const signInService = new SignInService(userRepository);
    const response = await signInService.signIn(formData);
    console.log(response);
  } catch (error) {
    console.log(error); 
  }
}