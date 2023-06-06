export function themeMode() {
	const switchButton: HTMLElement | null = document.getElementById('switch');
	const switchCircle: HTMLElement | null = document.getElementById('switch-circle');
	const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');

	if (switchButton && switchButton && switchWrapper) {
		let startY = 0;
		let originalY = 0;
		let mouseDown = false;
		let dragging = false;

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
				const dy = e.clientY - startY;

				// Bottom limit based on switchWrapprer height
				const maxBottomPosition = switchWrapper.offsetHeight - switchButton.offsetHeight;
				let newTopPosition = originalY + dy;
				newTopPosition = Math.min(newTopPosition, maxBottomPosition);
				switchButton.style.top = `${newTopPosition}px`;
			}
		});

		document.addEventListener('mouseup', (e) => {
			if (dragging && mouseDown) {
				switchButton.style.top = `${originalY}px`;
				const currentTheme = document.documentElement.getAttribute('data-theme');
				switchTheme(currentTheme);
			}
			dragging = false;
			mouseDown = false;
		});

		function switchTheme(currentTheme: string | null) {
			if (currentTheme === 'dark') {
				document.documentElement.setAttribute('data-theme', 'light');
			} else {
				document.documentElement.setAttribute('data-theme', 'dark');
			}
		}
	}
}