export function themeMode() {
  const toggleButton = document.getElementById('theme-mode');

  if (!toggleButton) {
      throw new Error(`Theme mode button does not exist.`);
  }

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