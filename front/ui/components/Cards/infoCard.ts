import { hideElement } from "../../utils/hideElement";
import { showElement } from "../../utils/showElement";

const infoCard = document.getElementById('info-card') as HTMLElement;

export function openInfoCard() {
  showElement(infoCard);
}

export function closeInfoCard() {
  hideElement(infoCard)
}

export function closeInfoCardOnMobile(event: MouseEvent) {
  if (infoCard.contains(event.target as Node)) return;
  infoCard.style.opacity = '0';
  infoCard.style.right = '0';
  infoCard.style.bottom = '0';

  setTimeout(() => {
    infoCard.style.display = 'none';
  }, 200);
}