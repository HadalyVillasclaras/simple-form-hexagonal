import { hideElement } from "../../utils/hideElement";
import { showElement } from "../../utils/showElement";

const infoCard = document.getElementById('info-card') as HTMLElement;

export function openInfoCard() {
  showElement(infoCard);
}

export function closeInfoCard() {
  hideElement(infoCard)
}