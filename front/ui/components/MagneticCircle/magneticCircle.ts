export function magneticCircle() {
  const circle = document.getElementById('circle') as HTMLElement;
  const circleText = document.getElementById('circle-text') as HTMLElement;

  circle.addEventListener('mousemove', (event) => {
    const rect = circle.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // elements ratio 
    const ratioCircle = 0.8;  
    const ratioText = 0.1; 

    const moveXCircle = (x - rect.width / 2) * ratioCircle;
    const moveYCircle = (y - rect.height / 2) * ratioCircle;

    const moveXText = (x - rect.width / 2) * ratioText;
    const moveYText = (y - rect.height / 2) * ratioText;

    // transform
    circle.style.transform = `scale(1.5) translate3d(${moveXCircle}px, ${moveYCircle}px, 0)`;
    circleText.style.transform = `translate3d(${moveXText}px, ${moveYText}px, 0)`;
  });

  circle.addEventListener('mouseleave', () => {
    circle.style.transform = `translate3d(0, 0, 0)`;
    circleText.style.transform = `translate3d(0, 0, 0)`;
  });
}