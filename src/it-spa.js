// it-spa.js
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle.js';
import './it-spa.scss';

import { Home } from './views/Home';
import { Nav } from './navigation/Nav';
import { NavDate } from './navigation/NavDate';
import { CartPreview } from './views/CartPreview';
import { Header } from './navigation/Header';

const main = document.querySelector('main');

// przyczepiamy komponenty przed elementem main
main.before(Header());
main.before(Nav());
main.before(NavDate());
// uzytkownik wystartuje na Home
main.append(Home());


// reagujemy na zdarzenie `navigate`
document.body.addEventListener('navigate', event => {
  const Component = event.detail;

  //czyscimy main, podstawiamy nowy komponent
  main.innerHTML = '';
  main.append(Component());
});


// cartPreview - pokazywanie i ukrywanie
const cartButton = document.querySelector('nav').lastElementChild;
cartButton.classList.add('btn-danger');
let cartPreview = null;

cartButton.addEventListener('mouseover', () => {
  cartPreview = CartPreview();
  main.append(cartPreview);
});

cartButton.addEventListener('mouseout', () => {
  if (cartPreview) {
    cartPreview.remove();
  }
});

let stayDays = 1;