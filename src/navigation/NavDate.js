// NavDate.js
let stayDays = 1;

export function NavDate() {
  const section = document.createElement('section');
  section.classList.add('nav-date', 'shadow');

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = String(now.getMonth() + 1).padStart(2, '0');
  const nowDate = String(now.getDate()).padStart(2, '0');

  const nextDay = new Date();
  nextDay.setDate(now.getDate() + 1);
  const nextDate = nextDay.toISOString().slice(0, 10);

  const nextYear = now.getFullYear() + 1;

  const minDate = nowYear + "-" + nowMonth + "-" + nowDate;
  const maxDate = nextYear + "-" + nowMonth + "-" + nowDate;

  section.innerHTML = `
    <form class="pt-3 pb-3">
      <label for="dateStart" class="ms-4 me-2">Data przyjazdu:</label>
      <input type="date" id="dateStart" value=${minDate} min=${minDate} class="me-5" onkeydown="return false">

      <label for="dateEnd" class="me-2">Data wyjazdu:</label>
      <input type="date" id="dateEnd" value=${nextDate} min=${minDate} max=${maxDate} class="me-5" onkeydown="return false">
      Czeka Cię <b><span id="stayDays" class="ms-2 me-2">1</span></b> dni pobytu
    </form>
  `;

// zarzadzanie datami
  const arrivalDateInput = section.querySelector('#dateStart');
  const departureDateInput = section.querySelector("#dateEnd");
  const stayDaysOutput = section.querySelector("#stayDays");

  function updateStayLength() {
    const arrivalTime = new Date(arrivalDateInput.value).getTime();
    const departureTime = new Date(departureDateInput.value).getTime();
    const stayLength = Math.ceil((departureTime - arrivalTime) / (1000 * 60 * 60 * 24));
    stayDaysOutput.innerHTML = stayLength;

    //tak było gdy eventlistenerami nie obstawiliśmy sytuacji gdy czas wpobytu był < 0
    stayDaysOutput.innerHTML = stayLength < 0 ? "-" : stayLength;
    
    stayDays = stayLength; // przypisujemy wartość do zmiennej globalnej;
    //console.log(stayDays);
  }

  arrivalDateInput.addEventListener("change", () => {
    const arrivalDate = new Date(arrivalDateInput.value);
    arrivalDate.setDate(arrivalDate.getDate() + 1);
    const minDepartureDate = arrivalDate.toISOString().slice(0, 10);

    const maxDeparture = new Date(arrivalDate);
    maxDeparture.setFullYear(maxDeparture.getFullYear() + 1);
    const maxDepartureDate = maxDeparture.toISOString().slice(0, 10);

    departureDateInput.min = minDepartureDate;
    departureDateInput.max = maxDepartureDate;

    //jesli wybierana data przyjazdu jest pozniejsza niz chwilowa data wyjazdu, zaktualizuj date wyjazdu w sposob
    //data wyjazdu = data przyjazdu +1
    if (arrivalDate > new Date(departureDateInput.value)) {
      departureDateInput.value = minDepartureDate;
    }

    updateStayLength();
  });

  departureDateInput.addEventListener("change", () => {
    updateStayLength();
  });

  return section;
}

//funkcja do zwracania globalnie liczby dni pobytu, np. po to aby obliczyć koszt pokojów z uwzględnieniem dni pobytu
export function getStayDays() {
  //console.log(stayDays);
  return stayDays;
}