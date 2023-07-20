// import {formAnimations} from '../formAnimations';
// import {handleSignUpSubmit, handleSignInSubmit} from '../../../main'

// let currentTemplate;
// const signupTemplate:any = document.getElementById('signup-template');
// const signinTemplate:any = document.getElementById('signin-template');
// const formSection = document.getElementById('forms-sect');


// function setDefaultTemplate() {
//   currentTemplate = signupTemplate?.content.cloneNode(true);
//   formSection?.appendChild(currentTemplate); // Default template

//   setLinks();
//   handleSignUpSubmit();
//   setTimeout(formAnimations, 0);
// }


// function setLinks() {
//   const signInLink = document.getElementById('signin-link');
//   const signUpLink = document.getElementById('signup-link');
//   signInLink?.addEventListener('click', (e) => switchTemplates(e, signinTemplate));
//   signUpLink?.addEventListener('click', (e) => switchTemplates(e, signupTemplate));
// }

// function switchTemplates(event: MouseEvent, templateToShow: any) {
//   event.preventDefault();

//   while(formSection?.firstChild){
//     formSection?.firstChild.remove();
//   }

//   currentTemplate = templateToShow?.content.cloneNode(true);
//   formSection?.appendChild(currentTemplate);

//   if(formSection?.classList.contains('fade-in')) {
//     formSection?.classList.remove('fade-in');
//   }

//   void formSection?.offsetWidth;
//   formSection?.classList.add('fade-in');

//   // Update links, elements and events
//   setLinks();
//   formAnimations();

//   if (templateToShow === signinTemplate) {
//     handleSignInSubmit();
//     signInHelpCard();
//     initLock)
//   } else if (templateToShow === signupTemplate) {
//   handleSignUpSubmit();
//   }
// }