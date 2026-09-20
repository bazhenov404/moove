import { Mezzo } from "./models/Mezzo";
import { Utente } from "./models/Utente";
import { Citta } from "./models/Citta";

const bici1 = new Mezzo("bici", "BIKE-001");
const scooter1 = new Mezzo("scooter", "SCOOTER-001");
const monopattino1 = new Mezzo("monopattino", "MONO-001");

const mario = new Utente("Mario", "Rossi", "mario.rossi@email.com", "Carta di credito");
const anna = new Utente("Anna", "Bianchi", "anna.bianchi@email.com", "PayPal");

const milano = new Citta("Milano");

milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(scooter1);
milano.aggiungiMezzo(monopattino1);

mario.prenotaMezzo(bici1);
anna.prenotaMezzo(scooter1);

console.log(milano.mezzi);
console.log(milano.getMezziDisponibili());

const listaMezzi = document.querySelector<HTMLDivElement>("#lista-mezzi");

const totaleMezzi =
  document.querySelector<HTMLSpanElement>("#totale-mezzi");

const mezziDisponibili =
  document.querySelector<HTMLSpanElement>("#mezzi-disponibili");

  if (!listaMezzi || !totaleMezzi || !mezziDisponibili) {
  throw new Error("Elementi dell'interfaccia non trovati");
}

milano.mezzi.forEach((mezzo) => {
  const card = document.createElement("article");

  card.classList.add("card-mezzo");

  card.innerHTML = `
    <div class="parte-superiore-card">

      <span class="icona-mezzo">
        ${mezzo.tipo === "bici"
          ? "🚲"
          : mezzo.tipo === "monopattino"
            ? "🛴"
            : "🛵"}
      </span>

      <span class="stato ${
        mezzo.stato === "disponibile"
          ? "disponibile"
          : "non-disponibile"
      }">
        ${
          mezzo.stato === "disponibile"
            ? "Disponibile"
            : "In uso"
        }
      </span>

    </div>

    <div class="informazioni-mezzo">
      <h3>${mezzo.tipo}</h3>
      <p class="id-mezzo">${mezzo.id}</p>
    </div>

    <button
      class="pulsante-prenota"
      ${mezzo.stato !== "disponibile" ? "disabled" : ""}
    >
      ${mezzo.stato === "disponibile"
        ? "Prenota"
        : "Non disponibile"}

      <span>→</span>
    </button>
  `;

  listaMezzi.appendChild(card);
});

totaleMezzi.textContent =
  `${milano.mezzi.length} mezzi`;

mezziDisponibili.textContent =
  `${milano.getMezziDisponibili().length} disponibili`;