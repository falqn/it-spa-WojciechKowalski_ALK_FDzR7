// Cart.js
import { cartManager } from '../cart/cart-manager';
import { NavButton } from '../common/NavButton';
import { getStayDays } from '../navigation/NavDate';

export function Cart() {

  //dodanie nasłuchiwania na zmianę dni pobytu po to aby będąc w Cart na bierząco aktualizować łączną cenę
  const arrivalDateInput = document.querySelector('#dateStart');
  const departureDateInput = document.querySelector("#dateEnd");

  arrivalDateInput.addEventListener("change", () => {
    const cartElement = document.querySelector("#cart");
    if (cartElement) { // sprawdzenie, czy element o ID "cart" istnieje
      const main = document.querySelector('main');
      main.innerHTML = '';
      main.append(Cart());
    }
  });

  departureDateInput.addEventListener("change", () => {
    const cartElement = document.querySelector("#cart");
    if (cartElement) { // sprawdzenie, czy element o ID "cart" istnieje
      const main = document.querySelector('main');
      main.innerHTML = '';
      main.append(Cart());
    }
  });

  const section = document.createElement('section');
  section.id = "cart";

  section.innerHTML = `
    <h2>Twoja rezerwacja</h2>
    <h5>Zamierzasz zarezerwować pobyt w wybranym pokoju na <b>${getStayDays()} dni</b> oraz zabiegi.</h5><br>
    <table class="table"></table>
  `;

  const tableHead = document.createElement('tr');

  tableHead.innerHTML = `
    <th>usługa</th>
    <th>liczba</th>
    <th>cena jednostkowa</th>
    <th></th>
  `;

  const tableRows = cartManager.getAllItems()
  .sort((item1, item2) => {
    // sortowanie po nazwie, rozpoczynającej się od "Pokój"
    if (item1.name.startsWith('Pokój') && !item2.name.startsWith('Pokój')) {
      return -1;
    } else if (!item1.name.startsWith('Pokój') && item2.name.startsWith('Pokój')) {
      return 1;
    } else {
      return 0;
    }
  })
  .map(item => {
    // tworzenie wierszy tabeli
    const tr = document.createElement('tr');

    const addItem = NavButton('<i class="fa-sharp fa-solid fa-plus"></i>', () => {
      cartManager.addItem(item);
      return Cart();
    }, ['btn']);

    const removeItem = NavButton('<i class="fa-solid fa-minus"></i>', () => {
      cartManager.removeItem(item);
      return Cart();
    }, ['btn']);

    const removeAllItems = NavButton('<i class="fa-solid fa-trash"></i>', () => {
      cartManager.removeAllItems(item);
      return Cart();
    }, ['btn']);

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)} PLN</td>
      <td></td>
    `;

    tr.lastElementChild.append(addItem);
    tr.lastElementChild.append(removeItem);
    tr.lastElementChild.append(removeAllItems);

    return tr;
  });

  const tableFooter = document.createElement('tr');

  tableFooter.innerHTML = `
    <td></td>
    <td>
      Razem = 
    </td>
    <td>
      <strong>${cartManager.getTotalPrice()}</strong> PLN
    </td>
  `;

  // kompletujemy zawartosc tabeli
  section.querySelector('.table').append(tableHead, ...tableRows, tableFooter);

  return section;
}