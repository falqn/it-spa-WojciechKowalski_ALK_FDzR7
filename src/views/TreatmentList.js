// TreatmentList.js

import { TreatmentDetails } from "./TreatmentDetails";
import { NavButton } from "../common/NavButton";
import { cartManager } from "../cart/cart-manager";

export function TreatmentList() {
  const section = document.createElement("section");
  const ul = document.createElement("ul");
  ul.classList.add('treatments-list');

  section.innerHTML = `
    <h2>Dostępne zabiegi</h2>
    <p>Wybierz coś odpowiedniego dla siebie</p>
    <p class="loading">Ładuję listę zabiegów...</p>
  `;

  // pobieramy liste zabiegow z serwera
  fetch("http://localhost:3000/treatments")
    .then((response) => response.json())
    .then((treatments) => {
      const lis = treatments.map((treatment) => {
        const li = document.createElement("li");
        li.classList.add('shadow');

        li.innerHTML = `
          <h4>${treatment.name}</h4>
          <h4>
            <strong>${treatment.price.toFixed(2)} PLN</strong>
          </h4>
          <footer>
            <span class="cart-quantity">w koszyku: <strong>${cartManager.getItemQuantity(treatment)}</strong></span>
          </footer>
        `;

        const addToCartButton = document.createElement("button");
        addToCartButton.innerHTML = '<i class="fa-solid fa-cart-plus fa-lg"></i>';
        addToCartButton.classList.add("btn");
        addToCartButton.addEventListener("click", () => {
            cartManager.addItem(treatment);
            const span = li.querySelector('.cart-quantity');
            span.innerHTML = `dodałeś i masz już: <strong>${cartManager.getItemQuantity(treatment)}</strong>`;
          }
        );

        const detailsButton = NavButton("Dowiedz się więcej...", () => TreatmentDetails(treatment.id), ["btn"]);

        li.querySelector("footer").append(detailsButton, addToCartButton);

        return li;
      });

      ul.append(...lis);

      // usuwamy element mowiacy o ladowaniu
      section.querySelector(".loading").remove();
      // podstawiamy gotowa liste z pokojami
      section.append(ul);
    });

  return section;
}