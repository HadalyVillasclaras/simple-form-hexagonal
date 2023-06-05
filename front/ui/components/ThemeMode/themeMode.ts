export function themeMode() {
	const toggleButton = document.getElementById('switch');
	const wrapperElement = document.getElementById('theme-mode');
	let startY = 0;
	let originalY = 0;
	let dragging = false;

	toggleButton?.addEventListener('mousedown', (e) => {
		startY = e.clientY;
		originalY = toggleButton.offsetTop;
		dragging = true;

		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (dragging) {
			const dy = e.clientY - startY;
			console.log(wrapperElement.offsetHeight);
			const maxBottomPosition = wrapperElement.offsetHeight - toggleButton.offsetHeight;

			let newTopPosition = originalY + dy;
			newTopPosition = Math.min(newTopPosition, maxBottomPosition);

			toggleButton.style.top = `${newTopPosition}px`;
		}
	});

	document.addEventListener('mouseup', (e) => {
		if (dragging) {
			dragging = false;
			toggleButton.style.top = `${originalY}px`;

			toggleButton.classList.add('rebound');
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
