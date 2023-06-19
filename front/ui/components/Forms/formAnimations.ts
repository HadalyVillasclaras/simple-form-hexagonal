import {showHidePassword} from './ShowHidePass/ShowHidePass'

export function formAnimations() {
  labelGoesTop();

  //Show hide pass eye icon
  const passwordInput = document.querySelector('input[name="password"]');
  passwordInput?.addEventListener('input', showHidePassword);
}

function labelGoesTop() {
  const fieldsetPs = document.querySelectorAll('fieldset p');
  fieldsetPs.forEach(p => {
    const label = p.querySelector('.label-main');
    const input = p.querySelector('input');

    input?.addEventListener('focus', function () {
      label?.classList.add('label-main-focus');
    });

    input?.addEventListener('blur', function () {
      if (input.value === '') {
        label?.classList.remove('label-main-focus');
      }
    });
  })
};

