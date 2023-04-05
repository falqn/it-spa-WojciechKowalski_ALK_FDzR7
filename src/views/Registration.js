// Registration.js
import { Home } from '../views/Home';

export function Registration() {
  const section = document.createElement('section');

  section.innerHTML = `
    <div class="container mt-3">
      <form id="registration-form" class="col-md-6 mx-auto">
        <div class="form-group">
          <label for="email-input">Adres e-mail</label>
          <input type="email" class="form-control" id="email-input" required>
        </div>
        <div class="form-group mb-2">
          <label for="password-input">Hasło</label>
          <input type="password" class="form-control" id="password-input" required>
        </div>
        <button type="submit" class="btn btn-sm btn-info">Zarejestruj</button>
        <button type="button" class="btn btn-sm btn-info" id="login-btn">Zaloguj</button>
      </form>
    </div>
  `;
  
  const registrationForm = section.querySelector('#registration-form');
  const emailInput = section.querySelector('#email-input');
  const passwordInput = section.querySelector('#password-input');
  const loginBtn = section.querySelector('#login-btn');

  // Po zalogowaniu, zamienia przycisk "Zaloguj lub zarejestruj" na przycisk "Wyloguj", zmienia sie takze ikona
  // Deklaracja przyciskow w sytuacji zalogowania
  const signOutButton = document.createElement('button');
  signOutButton.classList.add('btn', 'btn-sm', 'btn-outline-info');
  signOutButton.innerHTML = 'Wyloguj';
  signOutButton.addEventListener('click', () => {
    location.reload();
    alert('Zostałeś wylogowany');
  });

  const signOutIcon = document.createElement('button');
  signOutIcon.classList.add('btn', 'btn-sm', 'btn-info', 'ms-2');
  signOutIcon.innerHTML = '<i class="fa-solid fa-user"></i>';
  signOutIcon.addEventListener('click', () => {
    location.reload();
    alert('Zostałeś wylogowany');
  });

  // Wymiana przycisków, dodanie tekstu o zalogowaniu
  function onLogin(user) {
    alert(`Witaj ${user}, zalogowano pomyślnie!`);
    const header = document.querySelector('header');
    const signInButton = document.querySelector('.signInButton');
    const signInIcon = document.querySelector('.signInIcon');
    header.replaceChild(signOutButton, signInButton);
    header.replaceChild(signOutIcon, signInIcon);
    const loginText = document.createElement('span');
    loginText.classList.add('btn-outline-info', 'btn-sm', 'disabled');
    loginText.innerHTML = `Zalogowano <b>${user}<b>  `;
    header.prepend(loginText);

    const main = document.querySelector('main');
    main.innerHTML = '';
    main.append(Home());
  }

  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Sprawdzanie, czy użytkownik o podanym adresie e-mail już istnieje
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const userExists = users.some(user => user.email === emailInput.value);
        if (userExists) {
          alert('Użytkownik o podanym adresie e-mail już istnieje, może już wcześniej się zarejestrowałeś?');
          return;
        }

        // Jeśli funkcja nie została zastopowana wyżej - dodajemy użytkownika do bazy danych
        const newUser = { email: emailInput.value, password: passwordInput.value };
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        })
          .then(response => response.json())
          .then(() => alert('Użytkownik został zarejestrowany'))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  });

  loginBtn.addEventListener('click', () => {
    // Wyszukiwanie użytkownika o podanym e-mail i haśle
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.email === emailInput.value && user.password === passwordInput.value);
        const username = user.email.split('@')[0];
        if (user) {
          onLogin(username);
        } else {
          alert('Wpisałeś nieprawidłowy adres e-mail lub hasło albo nigdy się nie zarejestrowałeś');
        }
      })
      .catch(error => console.error(error));
  });

  return section;
}