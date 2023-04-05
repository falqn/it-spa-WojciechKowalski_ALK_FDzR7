// NavButton.js

export function NavButton(html, componentFn, classes = []) {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add(...classes);
  button.innerHTML = html;

  button.addEventListener('click', () => {
    const navigationEvent = new CustomEvent('navigate', {
      detail: componentFn
    });

    document.body.dispatchEvent(navigationEvent);
  });

  return button;
}