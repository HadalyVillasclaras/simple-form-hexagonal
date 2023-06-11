const switchButton: HTMLElement | null = document.getElementById('switch');
const switchCircle: HTMLElement | null = document.getElementById('switch-circle');
const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');
const arrowArea: HTMLElement | null = document.getElementById('arrow-area');
const arrow: HTMLElement | null = document.getElementById('arrow');
const svgCircle = document.getElementById('svg-circle') as HTMLElement;


let clickedSwitch = false;
const switchClickedEvent = new Event('switchClicked');
let initialAnimationActive = false;

document.addEventListener('switchClicked', () => {
    clickedSwitch = true;
    enterArrowArea();
});

export function themeMode() {
	if (switchButton && switchButton && switchWrapper) {

		window.onload = function () {
			switchInitialBounce(switchButton)
			switchControl();
			enterArrowArea();
		}
	}
}

function switchControl() {
	let startY = 0;
	let originalY = 0;
	let mouseDown = false;
	let dragging = false;
	let dy = 0;

	switchCircle?.addEventListener('mousedown', (e) => {
		startY = e.clientY;
		originalY = switchButton.offsetTop;
		mouseDown = true;
		document.dispatchEvent(switchClickedEvent);
		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (mouseDown) {
			dragging = true;
		}
		if (mouseDown && dragging) {
			dy = e.clientY - startY;

			// Bottom limit based on switchWrapprer height
			const maxBottomPosition = switchWrapper.offsetHeight - switchButton.offsetHeight;
			let newTopPosition = originalY + dy;
			newTopPosition = Math.min(newTopPosition, maxBottomPosition);
			switchButton.style.top = `${newTopPosition}px`;
		}
	});

	document.addEventListener('mouseup', (e) => {
		// if props true and mouse moved more than 20px vertically 
		if (dragging && mouseDown && Math.abs(dy) > 20) {
			switchButton.style.top = `${originalY}px`;
			const currentTheme = document.documentElement.getAttribute('data-theme');
			switchTheme(currentTheme);
			svgCircle.classList.add('rotate-once');
			svgCircle.addEventListener('animationend', function () {
				svgCircle.classList.remove('rotate-once');
			});
		} else if (dragging && mouseDown) {
			switchButton.style.top = `${originalY}px`;
		}

		dragging = false;
		mouseDown = false;
	});
}

function enterArrowArea() {
	arrowArea?.addEventListener('mouseenter', () => {
		if(!clickedSwitch && arrow && !initialAnimationActive) {
			arrow.style.opacity = '1'; 
			arrow.classList.add('down-up');
			switchButton?.classList.add('simple-down-up');
			setTimeout(() => {
			arrow.style.opacity = '0'; 
			arrow.classList.remove('down-up');
			switchButton?.classList.remove('simple-down-up');
				
			}, 4000);
		}
	});
}


function switchInitialBounce(switchButton: HTMLElement) {
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

function switchTheme(currentTheme: string | null) {
	if (currentTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}