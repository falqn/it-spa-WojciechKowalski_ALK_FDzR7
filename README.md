
# IT SPA
Aplikacji Single Page Application dla ośrodka SPA dedykowanego programistom.

Aplikacja umożliwia:
- Przeglądanie dostępnych pokoi/zabiegów
- Dodawanie wybranych pokoi/zabiegów do koszyka z poziomu listy jak i z poziomu szczegółów usługi
- Liczba dodanych pokoi/zabiegów jest na bierząco aktualizowana i wyświetlana na poziomie listy, koszyka oraz podglądu koszyka
- Wybór daty przyjazdu i wyjazdu powoduję aktualizację pola z informacją o liczbie dni pobytu, a co za tym idzie całkowitej ceny za zamówienie
- Rejestrację użytkownika
- Logowanie użytkownika

## Podsumowanie zamówienia / Koszyk
Komponent koszyka wyświetla podsumowanie zamówienia. Koszyk umożliwia nanoszenie poprawek do zamówienia, można dodać pojedynczą usługę, usunąć pojedynczą usługę bądź usunąć wszystkie usługi danego typu. Koszyk jest odporny na przeładowanie strony, używa localStorage do przechowywania danych.
Całkowita cena za zamówienie uwzględnia liczbę dni pobytu w wybranym pokoju i jest na bierząco aktualizowana.
Koszyk podaje zakupione usługi w formie tabeli w ten sposób, że zamawiany pokój zawsze znajduje się na pierwszym miejscu.

## Data pobytu
Użytkownik nie może wybrać daty przyjazdu wcześniejszej niż bieżąca. Wybrana data wyjazdu nie może być bliższa niż dzień następujący po dacie przyjazdu oraz nie może być dalsza niż rok od daty przyjazdu.
Komponent na bieżąco aktualizuje liczbę dni pobytu w zależności od wybranych dat.

## Rejestracja użytkownika
Rejestracja polega na zapisaniu danych użytkownika (e-mail i hasła) w pliku `database.json`. Nie jest możliwa rejestracja użytkownika o identycznym adresie e-mail.

## Logowanie
Logowanie polega na porównaniu podanych przez użytkownika danych (e-mail i hasła) z zapisanymi w pliku `database.json` podczas rejestracji. Po zalogowaniu nazwa użytkownika jest widoczna obok przycisków, które także zmieniają swoją funkcję (z logowania na wylogowanie) oraz wyraz graficzny.

## Pokoje
Baza pokoi w ośrodku IT SPA znajduje się w pliku `database.json`.

## Zabiegi 
Baza zabiegów zabiegów ośrodka IT SPA znajduje się w pliku `database.json`.

## Podgląd koszyka
Po najechaniu myszą na sygnaturę koszyka wyświetla się podgląd zawartości koszyka: nazwa usługi, ilość w koszyku, cena jednostkowa oraz cena za całe zamówienie uwzględniająca liczbę dni pobytu.

## Technologie
- HTML, Bootstrap 5
- CSS, Sass, Font Awesome 6
- JavaScript ECMAScript 6
- Node, Express

Do interakcji z serwerem bazy danych wykorzystano `fetch`.