// RoomDetails.js
import { NavButton } from '../common/NavButton.js';
import { RoomList } from '../views/RoomList.js';
import { cartManager } from '../cart/cart-manager.js';

export function RoomDetails(roomId) {

  const section = document.createElement('section');
  
  section.innerHTML = `
    <h2>Room</h2>
    <p class="loading">Ładuję pokój...</p>
  `;

  // pobieramy wybrany pokoj z serwera
  fetch(`http://localhost:3000/rooms/${roomId}`)
    .then(response => response.json())
    .then(room => {
        const details = document.createElement('article');

        details.innerHTML = `
          <h3>${room.name}</h3>
          <br>
          <p><strong>Liczba łóżek: ${room.beds}</strong></p>
          <p><strong>Liczba gości: ${room.guests}</strong></p>
          <p>${room.description}</p>
          <h5>
            <strong>${room.price.toFixed(2)} PLN</strong>
          </h5>
          <footer></footer>
        `;

        const backToRoomList = NavButton('Wróć do listy pokoi', () => RoomList(), ['btn', 'btn-info', 'shadow']);

        const addToCartButton = document.createElement('button');
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
        addToCartButton.classList.add('btn', 'btn-info', 'shadow');
        addToCartButton.addEventListener('click', () => cartManager.addItem(room));

        details.querySelector('footer').append(addToCartButton, backToRoomList);

        // usuwamy element mowiacy o ladowaniu
        section.querySelector('.loading').remove();
        // podstawiamy gotowa liste z pokojami
        section.append(details);
    });

  return section;
}
