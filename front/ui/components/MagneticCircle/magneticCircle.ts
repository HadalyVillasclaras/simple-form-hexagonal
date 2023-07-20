import {openInfoCard, closeInfoCard} from '../Cards/infoCard'; 
import {hideSignInHelpCard} from '../Cards/helpCard';

const circle = document.getElementById('circle') as HTMLElement;
const circleInfo = document.getElementById('circle-info') as HTMLElement;
const circleTextPath = document.getElementById('circle-textpath') as HTMLElement;
const helpCard = document.getElementById("signin-help-card") as HTMLElement;

const svgCircle = document.getElementById('svg-circle') as HTMLElement;
const infoCard = document.getElementById('info-card') as HTMLElement;

function isWindowMobileSize() {
  return window.innerWidth < 800;
}

export function magneticCircle() {
  window.addEventListener('load', initMagneticCircle);
	window.addEventListener('resize', initMagneticCircle);
}

function initMagneticCircle() {
  if (!isWindowMobileSize()) {
    circle.addEventListener('mousemove', (event) => {
      moveCircle(event)
      svgCircle.classList.add('infiniteRotate');
    });

    circle.addEventListener('mouseleave', () => {
      stopCircle()
      svgCircle.classList.remove('infiniteRotate');
    });

  } else {
    svgCircle.classList.add('infiniteRotate');

   document.addEventListener('click', (event) => {
    circleActiveStyles();
      closeInfoCard();
    if (!helpCard.contains(event.target as Node) && event.target !== infoCard) {
      hideSignInHelpCard();
    }
  });
  }
  
  circleInfo.addEventListener('click', (event) => {
    event.stopPropagation(); 
    hideSignInHelpCard();
    openInfoCard();
    circleInactiveStyles();
  });
}

function moveCircle(event: MouseEvent) {
  const rect = circle.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // elements ratio 
  const ratioCircle = 1.5;  
  const ratioText = 0.1; 
  const ratioCard = 0.8; 

  const moveXCircle = (event.clientX - centerX) * ratioCircle;
  const moveYCircle = (event.clientY - centerY) * ratioCircle;

  const moveXText = (event.clientX - centerX) * ratioText;
  const moveYText = (event.clientY - centerY) * ratioText;

  const moveXCard = (moveXCircle * ratioCard) - 120;
  const moveYCard = (moveYCircle * ratioCard) - 120;

  // transform
  requestAnimationFrame(() => {
    circle.style.transform = `scale(1.4) translate(${moveXCircle}px, ${moveYCircle}px)`;
    circleInfo.style.transform = `translate(${moveXText}px, ${moveYText}px, 0)`;
    infoCard.style.transform = `translate(${moveXCard}px, ${moveYCard}px)`;
  });
}

function stopCircle() {
  requestAnimationFrame(() => {
    closeInfoCard();
    circle.style.transform = '';
    circleInfo.style.transform = '';
  });
  circleActiveStyles();
}

export function rotateCircle360() {
	svgCircle.classList.add('rotate-once');
	svgCircle.addEventListener('animationend', function () {
		svgCircle.classList.remove('rotate-once');
	});
}

function circleInactiveStyles() {
  circleTextPath.classList.add('circle-textpath-inactive');
  circleInfo.classList.replace('circle-info-out', 'circle-info-enter');
}

function circleActiveStyles() {
  circleTextPath.classList.remove('circle-textpath-inactive');
  circleInfo.classList.replace('circle-info-enter', 'circle-info-out');
}