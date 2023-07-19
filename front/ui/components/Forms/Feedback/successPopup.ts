export function openPopup(successMessage: string) {
  const popUpArea = document.getElementById('popup-area');
  const successTemplate = document.getElementById('feedback-success');

  if (successTemplate && popUpArea) {
    const clonedSuccessTemp = document.importNode(successTemplate.content, true);
    const successMessageElement = clonedSuccessTemp.querySelector('#feedback-success-msg');
    if (successMessageElement) {
      successMessageElement.textContent = successMessage;
    }

    popUpArea.appendChild(clonedSuccessTemp);
    popUpArea.style.display = 'flex';
    setTimeout(() => {
      popUpArea.classList.replace('hidden', 'visible');
    }, 400);

    // Close on click anywhere else
    document.addEventListener('click', (event) => closePopup(event, popUpArea));
  }
}

function closePopup(event: MouseEvent, targetElement: any) {
  const successPopup = document.getElementById('success-popup');
  if (!successPopup?.contains(event?.target)) {
    targetElement.classList.replace('visible', 'hidden');
    setTimeout(function () {
      targetElement.style.display = 'none';
      while (targetElement.firstChild) {
        targetElement.removeChild(targetElement.firstChild);
      }
      location.reload();
    }, 600);
  }
}