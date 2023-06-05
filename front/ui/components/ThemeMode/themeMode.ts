export function themeMode() {
	const switchButton: HTMLElement | null = document.getElementById('switch');
	const switchWrapper: HTMLElement | null = document.getElementById('theme-mode');
	let startY = 0;
	let originalY = 0;
	let dragging = false;

	switchButton?.addEventListener('mousedown', (e) => {
		startY = e.clientY;
		originalY = switchButton.offsetTop;
		dragging = true;

		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (dragging) {
			const dy = e.clientY - startY;
			// Bottom limit based on switchWrapprer height
			const maxBottomPosition = switchWrapper.offsetHeight - switchButton.offsetHeight;

			let newTopPosition = originalY + dy;
			newTopPosition = Math.min(newTopPosition, maxBottomPosition);

			switchButton.style.top = `${newTopPosition}px`;
		}
	});

	document.addEventListener('mouseup', (e) => {
		if (dragging) {
			dragging = false;
			switchButton.style.top = `${originalY}px`;

			switchButton.classList.add('rebound');
			const currentTheme = document.documentElement.getAttribute('data-theme');
			switchTheme(currentTheme);
		}
	});

	function switchTheme(currentTheme: string | null) {
		if (currentTheme === 'dark') {
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	}
}
