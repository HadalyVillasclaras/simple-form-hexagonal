import { rotateCircle360 } from "../MagneticCircle/magneticCircle";
const switchButton: HTMLElement | null = document.getElementById('theme-switch');
const switchCircle: HTMLElement | null = document.getElementById('switch-circle');
const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');
const arrowArea: HTMLElement | null = document.getElementById('arrow-area');
const arrow: HTMLElement | null = document.getElementById('arrow');

const switchClickedEvent = new Event('switchClicked');
let clickedSwitch = false;
let initialAnimationActive = false;

document.addEventListener('switchClicked', () => {
	clickedSwitch = true;
	moveArrow();
});

function isWindowMobileSize() {
  return window.innerWidth < 800;
}

export function themeMode() {
	window.addEventListener('load', initThemeMode);
	window.addEventListener('resize', initThemeMode);
}

function initThemeMode() {
	if (switchButton && switchWrapper) {
		switchRegularBounce(switchButton);
	
		if (isWindowMobileSize()) {
			console.log('on touch');
			switchCircle?.addEventListener('click', switchThemeOnTouch);

		} else {
			console.log('grab');
			switchCircle?.removeEventListener('click', switchThemeOnTouch);
			arrowArea?.addEventListener('mouseenter', moveArrow);
			switchControl();
		}
	}
}

function switchControl() {
  let startY = 0;
  let originalY = 0;
  let mouseDown = false;
  let dragging = false;
  let dy = 0;

  function startDrag(e: MouseEvent) {
		e.preventDefault();
    startY = e.clientY;
    originalY = switchButton.offsetTop;
    mouseDown = true;
    document.dispatchEvent(switchClickedEvent);
  }

  function drag(e: MouseEvent) {
    if (mouseDown) {
			console.log(mouseDown);
      dragging = true;
    }

    if (mouseDown && dragging) {
			dy = ('clientY' in e ? e.clientY : e.touches[0].clientY) - startY;
			console.log(dy); // 2 4 8 11 21 
      const maxBottomPosition = switchWrapper.offsetHeight - switchButton.offsetHeight;
			console.log(maxBottomPosition); // -96
      let newTopPosition = originalY + dy;
      newTopPosition = Math.min(newTopPosition, maxBottomPosition);
			console.log(newTopPosition); //  -96

      switchButton.style.top = `${newTopPosition}px`;
    }
  }

  function endDrag() {
    if (dragging && mouseDown && Math.abs(dy) > 20) {
      switchButton.style.top = `${originalY}px`;
      switchTheme();
      rotateCircle360();
    } else if (dragging && mouseDown) {
      switchButton.style.top = `${originalY}px`;
    }

    dragging = false;
    mouseDown = false;
  }

  switchCircle?.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', endDrag);
}

function switchTheme() {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	if (currentTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}

function switchThemeOnTouch() {
	switchButton?.classList.add('down-up-center');
	setTimeout(() => {
		switchTheme();
		rotateCircle360();
	}, 1000);
		switchButton.addEventListener('animationend', function () {
		switchButton.classList.remove('down-up-center');
	});
}

// ANIMATIONS //
//move arrow until user clicks switch
function moveArrow() {
	if (!clickedSwitch && arrow && !initialAnimationActive) {
		arrow.style.opacity = '1';
		arrow.classList.add('down-up');
		switchButton?.classList.add('simple-down-up');


		setTimeout(() => {
			arrow.style.opacity = '0';
			arrow.classList.remove('down-up');
			switchButton?.classList.remove('simple-down-up');
		}, 4000);
	}
}

// switch bouncing (on load and every 2 mins)
function switchRegularBounce(switchButton: HTMLElement) {
	const startAnimation = function () {
		initialAnimationActive = true;
		switchButton.classList.add('bounce');
		switchButton.addEventListener('animationend', function () {
			switchButton.classList.remove('bounce');
			initialAnimationActive = false;
		});
	}

	setTimeout(startAnimation, 1500);
	setInterval(startAnimation, 2 * 60 * 1000);
}

