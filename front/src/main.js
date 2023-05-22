// import { handleSignUp} from './Application/signUp.js';
// import { handleSignIn} from './Application/signIn.js';

// const signupForm = document.getElementById('signup-form');
// const signinForm = document.getElementById('signin-form');

// signupForm.addEventListener("submit", event => handleSignUp(event));
// signinForm.addEventListener("submit", event => handleSignIn(event));


import SignUpService from './Application/SignUpService.js';
const form = document.getElementById('signup-form');

const signUpService = new SignUpService();

form.addEventListener('submit', async (event) => {
    try {
        const response = await signUpService.signUp(event);
        console.log(response);
        // Procesa la respuesta aquí (muestra un mensaje de éxito, redirecciona, etc.)
    } catch(error) {
        console.error('Error:', error);
        // Procesa el error aquí (muestra un mensaje de error, etc.)
    }
});