import { eyeIconSVG, closeIconSVG, eyeNoneSvg } from './eye-icons';
export function showHidePassword(event: any) {
  let passwordInput = event.target;
  let eyeIcon:Element | null =  document.querySelector('.eye-icon');
  let passwordVisible = false;

  if (eyeIcon) {
    if (passwordInput.value.length > 0) {
      eyeIcon.classList.add('visible');
      eyeIcon.innerHTML = eyeIconSVG;
    } else {
      eyeIcon.innerHTML = "";
    }
    
    if (passwordInput) {
      eyeIcon.addEventListener('click', function () {
        // If password is currently visible, hide it
        if (passwordVisible) {
          passwordInput.type = 'password';
          eyeIcon.innerHTML = eyeIconSVG;
        }
        // If password is currently hidden, show it
        else {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = eyeNoneSvg;
        }
        // Update passwordVisible for next click
        passwordVisible = !passwordVisible;
      });
    }
  }
};

