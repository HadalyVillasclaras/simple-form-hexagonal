export function themeMode() {
	const switchButton: HTMLElement | null = document.getElementById('switch');
	const switchCircle: HTMLElement | null = document.getElementById('switch-circle');
	const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');

	window.onload = function () {
		bounce(switchButton)
	}

	if (switchButton && switchButton && switchWrapper) {
		let startY = 0;
		let originalY = 0;
		let mouseDown = false;
		let dragging = false;
		let dy = 0;

		switchCircle?.addEventListener('mousedown', (e) => {
			startY = e.clientY;
			originalY = switchButton.offsetTop;
			mouseDown = true;

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

		switchWrapper.addEventListener('mouseenter', () => hoverEffect(switchButton, true));
    switchWrapper.addEventListener('mouseleave', () => hoverEffect(switchButton, false));
    switchButton.addEventListener('mouseenter', () => hoverEffect(switchButton, false));

	}
}
function hoverEffect(switchButton, add: boolean) {
  if (add) {
    switchButton.classList.add('switch-effect');
  } else {
    switchButton.classList.remove('switch-effect');
  }
}

function switchTheme(currentTheme: string | null) {
	if (currentTheme === 'dark') {
		document.documentElement.setAttribute('data-theme', 'light');
	} else {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
}

function bounce(switchButton) {
	const startAnimation = function () {
		switchButton.classList.add('bounce');
		switchButton.addEventListener('animationend', function () {
			switchButton.classList.remove('bounce');
		});
	}

	startAnimation();
	setInterval(startAnimation, 1 * 80 * 1000);
}