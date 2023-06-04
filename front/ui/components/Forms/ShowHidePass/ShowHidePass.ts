import { eyeIconSVG, closeIconSVG, eyeNoneSvg } from './eye-icons';
export function showHidePassword(event: any) {
  let passwordInput = event.target;
  let eyeIcon:Element | null =  document.querySelector('.eye-icon');

  if (eyeIcon) {
    if (passwordInput.value.length > 0) {
      eyeIcon.classList.add('visible');
      eyeIcon.innerHTML = eyeIconSVG;
    } else {
      eyeIcon.innerHTML = "";
    }
    
    if (passwordInput) {
      eyeIcon.addEventListener('mousedown', function () {
        passwordInput.type = 'text';
        eyeIcon.innerHTML = eyeNoneSvg;
      });
      eyeIcon.addEventListener('mouseup', function () {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = eyeIconSVG;
      });
      eyeIcon.addEventListener('mouseout', function () {
        passwordInput.type = 'password';
        eyeIcon.innerHTML = eyeIconSVG;
      });
    }
  }
};