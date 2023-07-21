import { hideSignInHelpCard, showSignInHelpCard } from '../Cards/helpCard';
import { lock, unlock } from './lock-icons';

export function initLock() {
  let lockIconSpan = document.getElementById("lock");
  const helpCard = document.getElementById("signin-help-card") as HTMLElement;
  if (lockIconSpan) {
    lockIconSpan.innerHTML = lock;

    lockIconSpan?.addEventListener('click', (event) => {
      event.stopPropagation(); 
      lockIconSpan.innerHTML = unlock;
      showSignInHelpCard();
    });

    document.addEventListener('click', (event) => {
      if (event.target == helpCard || helpCard.contains(event.target)) {
        return;
      }

      hideSignInHelpCard();
    });
  }
}

export function closeLock() {
  let lockIconSpan = document.getElementById("lock");
  if (lockIconSpan) {
    lockIconSpan.innerHTML = lock;
  }
}