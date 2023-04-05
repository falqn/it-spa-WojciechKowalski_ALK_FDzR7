// CartPreview.js
import { cartManager } from '../cart/cart-manager';

export function CartPreview() {

  const cartPreview = document.createElement('div');
  cartPreview.classList.add('cartPreview', 'shadow');

  cartPreview.innerHTML = `
    <p><strong>Zawartość koszyka</strong></p>
    <table class="table table-narrow"></table>
  `;

  const tableHead = document.createElement('tr');

  tableHead.innerHTML = `
    <th>usługa</th>
    <th>liczba</th>
    <th>cena jedn.</th>
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
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price} PLN</td>
      <td></td>
    `;

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
  cartPreview.querySelector('.table').append(tableHead, ...tableRows, tableFooter);

  return cartPreview;
}