import { handleSignUp} from './signUp.js';
import { handleSignIn} from './signIn.js';

const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');

// signupForm.addEventListener("submit", event => handleSignUp(event));
signinForm.addEventListener("submit", event => handleSignIn(event));


