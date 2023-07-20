import { showSignInHelpCard } from '../Cards/helpCard';
import {lock, unlock} from './lock-icons';

export function initLock() {
  let lockIconSpan = document.getElementById("lock");

  if(lockIconSpan) {
    lockIconSpan.innerHTML = lock;

    lockIconSpan?.addEventListener('click', () => {
      lockIconSpan.innerHTML = unlock;
      showSignInHelpCard();
    });
  }
}

export function closeLock() {
  let lockIconSpan = document.getElementById("lock");
  if(lockIconSpan) {
    lockIconSpan.innerHTML = lock;
  }
}