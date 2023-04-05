// RoomList.js

import { RoomDetails } from './RoomDetails';
import { NavButton } from '../common/NavButton';
import { cartManager } from '../cart/cart-manager';

export function RoomList() {

  const section = document.createElement('section');
  const ul = document.createElement('ul');
  
  section.innerHTML = `
    <h2>Dostępne pokoje</h2>
    <p>Wybierz pokój odpowiedni dla Ciebie i Twoich towarzyszy</p>
    <p class="loading">Ładuję listę pokoi...</p>
  `;

  // pobieramy liste pokoi z serwera
  fetch('http://localhost:3000/rooms')
    .then(response => response.json())
    .then(rooms => {
      const lis = rooms.map(room => {
        const li = document.createElement('li');
        li.classList.add('shadow')

        li.innerHTML = `
          <h4>${room.name}</h4>
          <h4>
            <strong>${room.price.toFixed(2)} PLN</strong>
          </h4>
          <footer>
            <span class="cart-quantity">w koszyku: <strong>${cartManager.getItemQuantity(room)}</strong></span>
          </footer>
        `;

        const addToCartButton = document.createElement('button');
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
        addToCartButton.classList.add('btn');
        addToCartButton.addEventListener("click", () => {
            cartManager.addItem(room);
            const span = li.querySelector('.cart-quantity');
            span.innerHTML = `w koszyku: <strong>${cartManager.getItemQuantity(room)}</strong>`;
          }
        );

        const removeFromCartButton = document.createElement('button');
        removeFromCartButton.innerHTML = '<i class="fa-solid fa-trash fa-lg"></i>';
        removeFromCartButton.classList.add('btn');
        removeFromCartButton.addEventListener("click", () => {
            cartManager.removeItem(room);
            const span = li.querySelector('.cart-quantity');
            span.innerHTML = `w koszyku: <strong>${cartManager.getItemQuantity(room)}</strong>`;
          }
        );

        const detailsButton = NavButton('Dowiedz się więcej...', () => RoomDetails(room.id), ['btn']);
        
        li.querySelector('footer').append(detailsButton, removeFromCartButton, addToCartButton);

        return li;
      });

      ul.append(...lis);

      // usuwamy element mowiacy o ladowaniu
      section.querySelector('.loading').remove();
      // podstawiamy gotowa liste z pokojami
      section.append(ul);
    });

  return section;
}