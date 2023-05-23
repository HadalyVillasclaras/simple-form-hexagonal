// import { handleSignUp} from './Application/signUp.js';
// import { handleSignIn} from './Application/signIn.js';

// const signupForm = document.getElementById('signup-form');
// const signinForm = document.getElementById('signin-form');

// signupForm.addEventListener("submit", event => handleSignUp(event));
// signinForm.addEventListener("submit", event => handleSignIn(event));


import SignUpService from './Application/SignUpService.js';
const form = document.getElementById('signup-form');


form.addEventListener('submit', async (event) => {
    const signUpService = new SignUpService();
    const response = await signUpService.signUp(event);
    console.log(response);
   
});