function checkWindowSize() {
  return window.innerWidth > 800;
}

export function magneticCircle() {
  const circle = document.getElementById('circle') as HTMLElement;
  const circleInfo = document.getElementById('circle-info') as HTMLElement;
  const svgCircle = document.getElementById('svg-circle') as HTMLElement;
  const infoCard = document.getElementById('info-card') as HTMLElement;

  circle.addEventListener('mousemove', (event) => {
    if (!checkWindowSize()) return;
    const rect = circle.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // elements ratio 
    const ratioCircle = 1.5;  
    const ratioText = 0.1; 
    const ratioCard = 1; 

    const moveXCircle = (x - rect.width / 2) * ratioCircle;
    const moveYCircle = (y - rect.height / 2) * ratioCircle;

    const moveXText = (x - rect.width / 2) * ratioText;
    const moveYText = (y - rect.height / 2) * ratioText;

    const moveXCard = (x - rect.width) * ratioCard - 50;
    const moveYCard = (y - rect.height) * ratioCard + 110;

    // transform
    circle.style.transform = `scale(1.4) translate3d(${moveXCircle}px, ${moveYCircle}px, 0)`;
    circleInfo.style.transform = `translate3d(${moveXText}px, ${moveYText}px, 0)`;

    infoCard.style.right = `${-moveXCard}px`;
    infoCard.style.bottom = `${rect.height - moveYCard}px`;

    svgCircle.classList.add('infiniteRotate');
  });

  circle.addEventListener('mouseleave', () => {
    if (!checkWindowSize()) return;
    circle.style.transform = `translate3d(0, 0, 0)`;
    circleInfo.style.transform = `translate3d(0, 0, 0)`;
    svgCircle.classList.remove('infiniteRotate');
    svgCircle.classList.remove('onDisplay');
    infoCard.style.opacity = '0';

    circleInfo.classList.replace('circle-info-enter', 'circle-info-out');

    setTimeout(() => {
      infoCard.style.display = 'none';
    }, 800);
  });

  circleInfo.addEventListener('click', (event) => {
    event.stopPropagation(); 
    infoCard.style.opacity = '0.9';
    infoCard.style.display = 'block';
    
    if(window.innerWidth < 800){
      infoCard.classList.add('cardMobileDisplay');
      infoCard.style.right = '0';
      infoCard.style.bottom = '0';
    }

    svgCircle.classList.add('onDisplay');
    circleInfo.classList.replace('circle-info-out', 'circle-info-enter');
  });

  document.addEventListener('click', (event) => {
    if (checkWindowSize() || infoCard.contains(event.target as Node)) return;
    infoCard.style.opacity = '0';
    infoCard.style.right = '0';
    infoCard.style.bottom = '0';
    svgCircle.classList.remove('onDisplay');
    circleInfo.classList.replace('circle-info-out', 'circle-info-enter');
  
    setTimeout(() => {
      infoCard.style.display = 'none';
    infoCard.classList.remove('cardMobileDisplay');

    }, 200);
  });
}