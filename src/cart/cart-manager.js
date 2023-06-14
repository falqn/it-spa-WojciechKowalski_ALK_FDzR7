// cart-manager.js
import { getStayDays } from '../navigation/NavDate.js';

const key = 'it-spa-cart';

export const cartManager = {

  addItem(item) {
    const cart = localStorage.getItem(key);
    let content;

    if (cart === null) {
      content = {
        [item.name]: { price: item.price, quantity: 1 }
      };
    }
    else {
      content = JSON.parse(cart);
      // np. { 'Pokój unarny': { price: 170, quantity: 2 } }
  
      // sprawdzam, czy w koszyku jest już jakiś "Pokój"
      const existingPokoj = Object.keys(content).find(name => name.startsWith('Pokój'));
  
      if (existingPokoj && item.name.startsWith('Pokój')) {
        alert('W koszyku masz już pokój, nie możesz zarezerwować więcej niż jeden pokój w jednej rezerwacji');
        return;
      }
  
      if (item.name in content) {
        content[item.name].quantity += 1;
      } else {
        const newItem = {
          [item.name]: { price: item.price, quantity: 1 }
        };

      // doklada nowy wpis (klucz: wartosc) do obiektu `content`
      Object.assign(content, newItem);
      }
    }
    //console.log(content[item.name].quantity);
    localStorage.setItem(key, JSON.stringify(content));
  },

  removeItem(item) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const content = JSON.parse(cart);

      if (item.name in content) {
        if (content[item.name].quantity > 1) {
          content[item.name].quantity -= 1;
        }
        else {
          delete content[item.name];
        }
      }

      localStorage.setItem(key, JSON.stringify(content));
    }
  },

  removeAllItems(item) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const content = JSON.parse(cart);

      if (item.name in content) {
        if (content[item.name].quantity >= 1) {
          delete content[item.name];
        }
      }

      localStorage.setItem(key, JSON.stringify(content));
    }
  },

  getAllItems() {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      return [];
    }
    else {
      const content = JSON.parse(cart);

      // entry to jest [KLUCZ, WARTOSC]
      return Object.entries(content).map(entry => {
        const [itemName, itemDetails] = entry;

        return {
          name: itemName,
          price: itemDetails.price,
          quantity: itemDetails.quantity
        };
      });
    }
  },

  getTotalPrice() {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      return '0.00';
    }
    else {
      const content = JSON.parse(cart);

      //jeśli pokój, to cene mnożymy przez liczbę dni pobytu
      for (let key in content) {
        if (key.startsWith("Pokój")) {
          content[key].price *= getStayDays();
        }
      }

      // [{ price, quantity }, { price, quantity },  { price, quantity }, ...]
      return Object
        .values(content)
        .reduce((totalPrice, item) => {
          return totalPrice + item.price * item.quantity;
        }, 0)
        .toFixed(2);
    }
  },

  getItemQuantity(item) {
    const cart = localStorage.getItem(key);
  
    if (cart !== null) {
      const content = JSON.parse(cart);
  
      if (item.name in content) {
        return content[item.name].quantity;
      }
    }
  
    return 0;
  }

};
