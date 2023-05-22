import { handleSubmit} from './signUp.js';

const form = document.querySelector('form');

form.addEventListener("submit", event => handleSubmit(event));

