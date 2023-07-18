const infoCard = document.getElementById('info-card') as HTMLElement;

export function openInfoCard() {
  infoCard.classList.remove('display-none');
    infoCard.classList.add('display');
    setTimeout(() => {
      infoCard.classList.remove('hidden');
      infoCard.classList.add('visible');
    }, 700);  
}

export function closeInfoCard() {
  if (infoCard && infoCard.classList.contains('visible')) {
    infoCard.classList.remove('visible');
    infoCard.classList.add('hidden');

    setTimeout(() => {
      infoCard.classList.remove('display');
      infoCard.classList.add('display-none');
    }, 800);
}}

export function closeInfoCardOnMobile(event: MouseEvent) {
  if (infoCard.contains(event.target as Node)) return;
  infoCard.style.opacity = '0';
  infoCard.style.right = '0';
  infoCard.style.bottom = '0';

  setTimeout(() => {
    infoCard.style.display = 'none';
  }, 200);
}