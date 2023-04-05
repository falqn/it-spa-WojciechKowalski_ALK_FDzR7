// Header.js
import { NavButton } from '../common/NavButton';
import { Registration } from '../views/Registration';
import { Home } from '../views/Home';


export function Header() {
  const header = document.createElement('header');
  header.classList.add('container-fluid', 'text-end');

  const signInButton = NavButton('Zaloguj lub zarejestruj', Registration, ['btn', 'btn-sm', 'btn-outline-info', 'signInButton']);
  const signInIcon = NavButton('<i class="fa-regular fa-user fa-lg"></i>', Registration, ['btn', 'btn-sm', 'btn-outline-info', 'ms-2', 'signInIcon']);

  header.append(signInButton);
  header.append(signInIcon);
  return header;
}
