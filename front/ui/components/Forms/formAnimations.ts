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
    const label = p.querySelector('label');
    const input = p.querySelector('input');

    input?.addEventListener('focus', function () {
      label?.classList.add('fieldset-label-focus');
    });

    input?.addEventListener('blur', function () {
      if (input.value === '') {
        label?.classList.remove('fieldset-label-focus');
      }
    });
  })
};

