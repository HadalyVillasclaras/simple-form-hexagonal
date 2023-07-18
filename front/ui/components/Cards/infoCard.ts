const infoCard = document.getElementById('info-card') as HTMLElement;

export function openInfoCard() {
  infoCard.style.opacity = '0.9';
  infoCard.style.display = 'block';
}

export function closeInfoCard() {
  infoCard.style.opacity = '0';

  setTimeout(() => {
    infoCard.style.display = 'none';
  }, 800);
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