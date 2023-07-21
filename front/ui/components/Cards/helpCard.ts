import {hideElement} from '../../utils/hideElement';
import {showElement} from '../../utils/showElement';
import { closeLock } from '../Lock/openCloseLock';

export function signInHelpCard() {
  const helpCard = document.getElementById("signin-help-card") as HTMLElement;
  const signInHelpWrapper = document.getElementById("signin-help-wrapper") as HTMLElement;

  helpCard.addEventListener('mouseleave', function() {
    hideSignInHelpCard();
  });
}

export function hideSignInHelpCard() {
  const helpCard = document.getElementById("signin-help-card") as HTMLElement;
  closeLock();
  helpCard && hideElement(helpCard);
}

export function showSignInHelpCard() {
  const helpCard = document.getElementById("signin-help-card") as HTMLElement;
  showElement(helpCard);
}