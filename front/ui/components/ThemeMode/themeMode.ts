const switchButton: HTMLElement | null = document.getElementById('theme-switch');
const switchCircle: HTMLElement | null = document.getElementById('switch-circle');
const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');
const arrowArea: HTMLElement | null = document.getElementById('arrow-area');
const arrow: HTMLElement | null = document.getElementById('arrow');
const svgCircle = document.getElementById('svg-circle') as HTMLElement;

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
			switchCircle?.addEventListener('click', switchThemeOnTouch);

		} else {
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
      dragging = true;
    }

    if (mouseDown && dragging) {
      dy = ('clientY' in e ? e.clientY : e.touches[0].clientY) - startY;
      const maxBottomPosition = switchWrapper.offsetHeight - switchButton.offsetHeight;
      let newTopPosition = originalY + dy;
      newTopPosition = Math.min(newTopPosition, maxBottomPosition);
      switchButton.style.top = `${newTopPosition}px`;
    }
  }

  function endDrag() {
    if (dragging && mouseDown && Math.abs(dy) > 20) {
      switchButton.style.top = `${originalY}px`;
      const currentTheme = document.documentElement.getAttribute('data-theme');
      switchTheme(currentTheme);
      rotateCircle();
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

function switchTheme(currentTheme: string | null) {
	if (currentTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}

function switchThemeOnTouch() {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	switchButton?.classList.add('down-up-center');
	setTimeout(() => {
		switchTheme(currentTheme);
		rotateCircle();
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

// rotate circle when switch theme
function rotateCircle() {
	svgCircle.classList.add('rotate-once');
	svgCircle.addEventListener('animationend', function () {
		svgCircle.classList.remove('rotate-once');
	});
}