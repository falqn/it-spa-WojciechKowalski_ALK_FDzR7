import { RoomList } from './RoomList.js';
import { TreatmentList } from './TreatmentList.js';

// Home.js
export function Home() {
  const section = document.createElement('section');

  section.innerHTML = `
    <div class="jumbotron">
      <div class="heading col-12">
        <h2 class="text-center"><br>Zobacz co Cię u nas czeka...</h2>
        <br>
      </div>
    <hr />
    <div class="row text-center">
      <div class="col-md-6">
        <div class="row">
          <div class="col-lg-4 col-sm-4">
            <img id="zabiegi1" class="home-image shadow" alt="zabiegi">
          </div>
          <div class="col-lg-8 col-sm-8">
            <blockquote class="blockquote text-center">
              <p>Odkryj najwspanialsze <strong>zabiegi</strong> jakie możesz sobie wyobrazić. Znane Ci przyrządy i akcesoria programisty dostarczą Ci niezapomnianych wrażeń, a chwile spędzone w naszych gabinetach zabiegowych na długo pozostaną w Twojej pamięci!</p>
            </blockquote>
            <footer class="blockquote-footer">
              <cite>Maurycy Pompka, główny fizjorelaksator</cite>
            </footer>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-lg-4 col-sm-4">
            <img id="pokoje1" class="home-image shadow" alt="pokoje">
          </div>
          <div class="col-lg-8 col-sm-8">
            <blockquote class="blockquote text-center">
              <p>Przestronne i pełne udogodnień <strong>pokoje</strong> pozwolą Ci wypocząć w sposób jakiego jeszcze nie znałeś! Łóżka typu king-size, panoramiczne okna, balkony z zestawem wypoczynkowym - spóbuj a zostaniesz na dłużej.</p>
            </blockquote>
            <footer class="blockquote-footer">
              <cite>Ernest Golibroda, główny komfortmaker</cite>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="jumbotron">
      <hr />
      <div class="row text-center">
        <div class="col-lg-3">
          <div class="resource">
            <i class="fa-solid fa-star fa-2x"></i>
            <h2>Niskie ceny</h2>
            <p>U nas nie przepłacisz, wyjątkowa jakość usług w cenach nie do przebicia!</p>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="resource">
            <i class="fa-solid fa-star fa-2x"></i>
            <h2>Kuchnia</h2>
            <p>Zachwyć się potrawami jakie serwują nasi kuchmistrzowie. Smacznie i zdrowo!</p>
          </div>	
        </div>
        <div class="col-lg-3">
          <div class="resource">
            <i class="fa-solid fa-star fa-2x"></i>
            <h2>Atmosfera</h2>
            <p>O każdej porzed dnia i nocy możesz liczyć na naszą pomoc, opiekę, dyskrecję i życzliwość!</p>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="resource">
            <i class="fa-solid fa-star fa-2x"></i>
            <h2>Dojazd</h2>
            <p>Świetna lokalizacja tuż przy węźle "Relaksowo Wielkie" na autostradzie A2 - szybko dotrzesz!</p>
          </div>
      </div>
    </div>	
  `;

  const zabiegi1 = section.querySelector('#zabiegi1');
  const pokoje1 = section.querySelector('#pokoje1');
//   zabiegi1.src = require('../assets/zabiegi1.jpg');
//   pokoje1.src = require('../assets/pokoje1.jpg');

const zabiegi1Img = new Image();
zabiegi1Img.src = 'src/assets/zabiegi1.jpg';
zabiegi1.src = zabiegi1Img.src;

const pokoje1Img = new Image();
pokoje1Img.src = 'src/assets/pokoje1.jpg';
pokoje1.src = pokoje1Img.src;
  

  zabiegi1.onclick = function() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.append(TreatmentList());
  }
  
  pokoje1.onclick = function() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.append(RoomList());
  }

  return section;
}
