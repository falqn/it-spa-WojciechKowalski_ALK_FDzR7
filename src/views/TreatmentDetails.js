// TreatmentDetails.js
import { NavButton } from '../common/NavButton';
import { TreatmentList } from '../views/TreatmentList';
import { cartManager } from '../cart/cart-manager';

export function TreatmentDetails(treatmentId) {
  const section = document.createElement('section');
  
  section.innerHTML = `
    <h2>Zabieg</h2>
    <p class="loading">Ładuję zabieg...</p>
  `;

  // pobieramy wybrany zabieg z serwera
  fetch(`http://localhost:3000/treatments/${treatmentId}`)
    .then(response => response.json())
    .then(treatment => {
        const details = document.createElement('article');

        details.innerHTML = `
          <h3>${treatment.name}</h3>
          <br>
          <p><strong>Zabieg na: ${treatment.area}</strong></p>
          <p><strong>Czas trwania: ${treatment.time}</strong></p>
          <h5>
            <strong>${treatment.price.toFixed(2)} PLN</strong>
          </h5>
          <footer></footer>
        `;

        const addToCartButton = document.createElement('button');
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
        addToCartButton.classList.add('btn', 'btn-info', 'shadow');
        addToCartButton.addEventListener('click', () => cartManager.addItem(treatment));

        const backToTreatmentList = NavButton('Wróć do listy zabiegów', () => TreatmentList(), ['btn', 'btn-info', 'shadow']);

        details.querySelector('footer').append(addToCartButton, backToTreatmentList);

        // usuwamy element mowiacy o ladowaniu
        section.querySelector('.loading').remove();
        // podstawiamy gotowa liste z pokojami
        section.append(details);
    });

  return section;
}