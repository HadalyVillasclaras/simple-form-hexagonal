export function themeMode() {
    const toggleButton = document.getElementById('theme-mode');
  const circlePath = document.getElementById('switch');
  const pullchain: any = document.getElementById('pullchain');

  if (!toggleButton) {
      throw new Error(`Theme mode button does not exist.`);
  }

//   toggleButton.addEventListener('click', () => {
//       const currentTheme = document.documentElement.getAttribute('data-theme');
//       switchTheme(currentTheme);
//   });

let initialY = 0;

circlePath?.addEventListener('dragstart', (event) => {
  initialY = event.clientY;
});

circlePath?.addEventListener('drag', (event) => {
  const deltaY = event.clientY - initialY;
  const newLineY2 = parseInt(pullchain?.getAttribute('y2')) + deltaY;

  pullchain?.setAttribute('y2', newLineY2);
});

circlePath?.addEventListener('dragend', () => {
  initialY = 0;
});

toggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  switchTheme(currentTheme);
});


  function switchTheme(currentTheme: string | null) {
      if (currentTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'light');
      } else {
          document.documentElement.setAttribute('data-theme', 'dark');
      }
  }
}