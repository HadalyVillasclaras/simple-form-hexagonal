const switchButton: HTMLElement | null = document.getElementById('switch');
const switchCircle: HTMLElement | null = document.getElementById('switch-circle');
const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');
const arrowArea: HTMLElement | null = document.getElementById('arrow-area');
const arrow: HTMLElement | null = document.getElementById('arrow');
let clickedSwitch = false;
const switchClickedEvent = new Event('switchClicked');

document.addEventListener('switchClicked', () => {
    clickedSwitch = true;
    moveArrow();
});

export function themeMode() {
	if (switchButton && switchButton && switchWrapper) {

		window.onload = function () {
			bounce(switchButton)
			switchControl();
			moveArrow();
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
		} else if (dragging && mouseDown) {
			switchButton.style.top = `${originalY}px`;
		}

		dragging = false;
		mouseDown = false;
	});
}

function moveArrow() {
	arrowArea?.addEventListener('mouseenter', () => {
		if(!clickedSwitch && arrow) {
			arrow.style.opacity = '1'; 
			arrow.classList.add('switch-effect');
			switchButton?.classList.add('simpleDownUp');
			setTimeout(() => {
			arrow.style.opacity = '0'; 
			arrow.classList.remove('switch-effect');
			switchButton?.classList.remove('simpleDownUp');
				
			}, 4000);
		}
	});
}

function hoverEffect(switchButton: HTMLElement, add: boolean) {
	if (add) {
		switchButton.classList.add('switch-effect');
	} else {
		setTimeout(() => {
			switchButton.classList.remove('switch-effect');
		}, 3000);
	}
}

function switchTheme(currentTheme: string | null) {
	if (currentTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}

function bounce(switchButton: HTMLElement) {
	const startAnimation = function () {
		switchButton.classList.add('bounce');
		switchButton.addEventListener('animationend', function () {
			switchButton.classList.remove('bounce');
		});
	}

	
	setTimeout(startAnimation, 1000);
	setInterval(startAnimation, 2 * 60 * 1000);
}