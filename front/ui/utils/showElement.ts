// Proggressively hide element

export function showElement(element: HTMLElement, time:number = 400) {
  if (element && element.classList.contains('display-none')) {
    element.classList.remove('display-none');
    element.classList.add('display');
    
    setTimeout(() => {
      element.classList.remove('hidden');
      element.classList.add('visible');
    }, time);  
  }
}