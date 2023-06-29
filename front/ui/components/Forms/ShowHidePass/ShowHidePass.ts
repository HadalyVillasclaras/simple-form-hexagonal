import { eyeIconSVG, closeIconSVG, eyeNoneSvg } from './eye-icons';
export function showHidePassword(event: any) {
  let passwordInput = event.target;
  let eyeIcon:Element | null =  document.querySelector('.eye-icon');
  let passwordVisible = false;

  if (eyeIcon) {
    if (passwordInput.value.length > 0) {
      eyeIcon.classList.replace('hidden', 'visible');
      eyeIcon.innerHTML = eyeIconSVG;
    } else {
      eyeIcon.classList.replace('visible', 'hidden');
      setTimeout(function() {
        eyeIcon.innerHTML = "";
    }, 400);
    }
    
    if (passwordInput) {
      eyeIcon.addEventListener('click', function () {
        if (passwordVisible) {
          passwordInput.type = 'password';
          eyeIcon.innerHTML = eyeIconSVG;
        }
        else {
          passwordInput.type = 'text';
          eyeIcon.innerHTML = eyeNoneSvg;
        }

        passwordVisible = !passwordVisible;
      });
    }
  }
};

