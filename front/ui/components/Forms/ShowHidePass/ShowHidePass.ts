import { eyeIconSVG, closeIconSVG, eyeNoneSvg } from './eye-icons';

export function showHidePassword(event: any) {
  let passwordInput = event.target;
  let eyeIconSpan: Element | null = document.querySelector('.eye-icon');
  let passwordVisible = false;

  if (eyeIconSpan) {
    if (passwordInput.value.length > 0) {
      eyeIconSpan.classList.replace('hidden', 'visible');
      eyeIconSpan.innerHTML = eyeIconSVG;
    } else {
      eyeIconSpan.classList.replace('visible', 'hidden');
      setTimeout(function () {
        eyeIconSpan.innerHTML = "";
      }, 400);
    }

    if (passwordInput) {
      eyeIconSpan.addEventListener('click', function () {
        if (passwordVisible) {
          passwordInput.type = 'password';
          eyeIconSpan.innerHTML = eyeIconSVG;
        }
        else {
          passwordInput.type = 'text';
          eyeIconSpan.innerHTML = eyeNoneSvg;
        }
        passwordVisible = !passwordVisible;
      });
    }
  }
};