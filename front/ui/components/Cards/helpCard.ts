export function signInHelpCard() {
  const lockIcon = document.getElementById("lock") as HTMLElement;
  const helpCard = document.getElementById("signin-help-card") as HTMLElement;
  const signInHelpWrapper = document.getElementById("signin-help-wrapper") as HTMLElement;
  
  lockIcon.addEventListener('click', function() {
    helpCard.classList.remove('display-none');
    helpCard.classList.add('display');
    setTimeout(() => {
      helpCard.classList.remove('hidden');
      helpCard.classList.add('visible');
    }, 100);  
  });

  helpCard.addEventListener('mouseleave', function() {
    hideSignInHelpCard();
  });
}

export function hideSignInHelpCard() {
  const helpCard = document.getElementById("signin-help-card") as HTMLElement;

  if (helpCard && helpCard.classList.contains('visible')) {
    helpCard.classList.remove('visible');
    helpCard.classList.add('hidden');

    setTimeout(() => {
      helpCard.classList.remove('display');
      helpCard.classList.add('display-none');
    }, 500);
  }
}
