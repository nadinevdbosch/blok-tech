# Read me

![Match header](https://github.com/nadinevdbosch/blok-tech/blob/master/images/readme-header.png)

## Jobstory

**Wanneer** ik iemand tegenkom in de app die ik leuk vind, **wil** ik zien hoeveel procent wij een match zijn op basis van 10 vragen die bij het aanmelden worden gesteld **zodat** ik kan inschatten of het de moeite waard is om diegene te liken.

## Beschrijving

De bedoeling van de app is dat je bij het inschrijven 10 vragen krijgt. Op basis van je antwoorden worden er matches voor je gezocht. Heb je bij 3 vragen hetzelfde antwoord dan staat er dat je 30% een match bent, heb je bij 6 vragen hetzelfde antwoord dan staat er dat je 60% een match bent enzovoort.

## Wireflow

Dit is hoe mijn feature is opgebouwd
![wireflow](https://github.com/nadinevdbosch/blok-tech/blob/master/images/wireflow-pijltjes.png)

## Tech stack

- Runtime: Node js
- Server: Express js
- Database: MongoDB

**Voor mijn feature heb ik de volgende packages gebruikt:**

- **nodemon** - Nodemon zorgt ervoor dat mijn server opnieuw opgestart wordt wanneer ik een bestand heb aangepast. Deze package heb ik gekozen omdat dit een erg handige functie hebt als je vele aanpassingen moet doen aan je project. Zo hoef je niet telkens de server handmatig op te starten.
- **ejs** - EJS is een template engine. Deze gebruik ik om statische template files toe te passen in mijn applicatie. Waarom ik voor EJS als template engine heb gekozen heb ik al eerder beschreven.
- **express** - Express gebruik ik om mijn server op te draaien.
- **body-parser** - Body-parser gebruik ik om informatie op te halen uit het formulier. Ik heb hiermee leren werken tijdens de input opdracht van backend
- **mongodb** - Mongodb heb ik nodig om verbinding te kunnen maken met mijn database. Ook gebruik ik het om data toe te voegen, aan te passen en te verwijderen.
- **array-find** - Array-find spreekt voor zichzelf. Het vind array elementen. Deze package gebruik ik om arrays op te halen uit mijn database.
- **multer** - Multer gebruik ik om een profielfoto te kunnen uploaden voor op je profiel. Multer is hiervoor de meest bekende package.
- **dotenv** - Dotenv heb ik nodig om belangrijke informatie, die ik heb opgeslagen in een .env bestand, op te halen. Dit gebruik ik voor de naam van mijn database en mijn URI.
- **eslint** - ESlint is een tool die je code analyseert en onder andere programmeerfouten en stilistische fouten markeert.
