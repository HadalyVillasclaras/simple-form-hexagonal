// Proggressively hide element

export function hideElement(element: HTMLElement, time:number = 400) {
  if (element && element.classList.contains('visible')) {
    element.classList.remove('visible');
    element.classList.add('hidden');

    setTimeout(() => {
      element.classList.remove('display');
      element.classList.add('display-none');
    }, time);
  }
}