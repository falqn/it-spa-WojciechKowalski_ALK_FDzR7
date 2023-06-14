// Nav.js
import { NavButton } from '../common/NavButton.js';
import { Cart } from '../views/Cart.js';
import { Home } from '../views/Home.js';
import { RoomList } from '../views/RoomList.js';
import { TreatmentList } from '../views/TreatmentList.js';

const navItems = [
  { name: '<i class="fa-solid fa-house fa-xl"></i>', component: Home },
  { name: 'Pokoje <i class="fa-solid fa-bed fa-lg"></i>', component: RoomList },
  { name: 'Zabiegi <i class="fa-solid fa-spa fa-lg"></i>', component: TreatmentList },
  { name: '<i class="fa-solid fa-cart-shopping fa-bounce fa-xl"></i>', component: Cart }
];

export function Nav() {
  const nav = document.createElement('nav');
  nav.classList.add('navbar');

  const navButtons = navItems.map(navItem => {
    return NavButton(navItem.name, navItem.component, ['btn', 'btn-info', 'btn-lg', 'shadow']);
  });

  nav.append(...navButtons);

  return nav;
}
