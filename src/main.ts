import { Mezzo } from "./models/Mezzo.js";
import { Utente } from "./models/Utente.js";
import { Citta } from "./models/Citta.js";
import type { TipoMezzo } from "./interfaces/IMezzo.js";

const bici1 = new Mezzo("bici", "BIKE-001");
const scooter1 = new Mezzo("scooter", "SCOOTER-001");
const monopattino1 = new Mezzo("monopattino", "MONO-001");

const mario = new Utente(
  "Mario",
  "Rossi",
  "mario.rossi@email.com",
  "Carta di credito",
);

const milano = new Citta("Milano");

milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(scooter1);
milano.aggiungiMezzo(monopattino1);

const listaMezzi = document.querySelector<HTMLDivElement>("#lista-mezzi");

const totaleMezzi = document.querySelector<HTMLSpanElement>("#totale-mezzi");

const mezziDisponibili =
  document.querySelector<HTMLSpanElement>("#mezzi-disponibili");

const nomiVisualizzati: Record<TipoMezzo, string> = {
  bici: "Bici",
  scooter: "Scooter elettrico",
  monopattino: "Monopattino",
};

function renderMezzi(): void {
  if (!listaMezzi || !totaleMezzi || !mezziDisponibili) {
    throw new Error("Elementi dell'interfaccia non trovati");
  }

  listaMezzi.innerHTML = "";

  milano.mezzi.forEach((mezzo) => {
    const card = document.createElement("article");

    card.classList.add("card-mezzo");
    card.dataset.id = mezzo.id;

    const isMioMezzo = mezzo.utenteAssegnato?.email === mario.email;

    let testoBottone: string;
    let disabledAttr: string;
    let azione: string;

    if (mezzo.stato === "disponibile") {
      testoBottone = "Prenota";
      disabledAttr = "";
      azione = "prenota";
    } else if (isMioMezzo) {
      testoBottone = "Termina corsa";
      disabledAttr = "";
      azione = "termina";
    } else {
      testoBottone = "Non disponibile";
      disabledAttr = "disabled";
      azione = "";
    }

    card.innerHTML = `
      <div class="parte-superiore-card">

        <span class="icona-mezzo">
          ${
            mezzo.tipo === "bici"
              ? "🚲"
              : mezzo.tipo === "monopattino"
                ? "🛴"
                : "🛵"
          }
        </span>

        <span class="stato ${
          mezzo.stato === "disponibile" ? "disponibile" : "non-disponibile"
        }">
          ${mezzo.stato === "disponibile" ? "Disponibile" : "In uso"}
        </span>

      </div>

      <div class="informazioni-mezzo">
        <h3>${nomiVisualizzati[mezzo.tipo]}</h3>
        <p class="id-mezzo">${mezzo.id}</p>
      </div>

      <button
  class="pulsante-prenota"
  data-id="${mezzo.id}"
  data-azione="${azione}"
  ${disabledAttr}
>
  ${testoBottone}
  <span>→</span>
</button>

    `;

    const pulsantePrenota =
      card.querySelector<HTMLButtonElement>(".pulsante-prenota");

    if (!pulsantePrenota) {
      return;
    }

    pulsantePrenota.addEventListener("click", () => {
      const mezzoId = pulsantePrenota.dataset.id;
      const azioneClick = pulsantePrenota.dataset.azione;
      const mezzoSelezionato = milano.mezzi.find(
        (mezzo) => mezzo.id === mezzoId,
      );

      if (!mezzoSelezionato) {
        console.error("mezzo non trovato");
        return;
      }

      if(azioneClick === "prenota") {
        const risultato = mario.prenotaMazzo(mezzoSelezionato);
        console.log(risultato.messaggio);
      } else if (azioneClick === "termina") {
        const risultato = mario.terminaCorsa();
        console.log(risultato.messaggio);
      }

      renderMezzi();
    });

    listaMezzi.appendChild(card);
  });

  totaleMezzi.textContent = `${milano.mezzi.length} mezzi`;

  const numeroDisponibili = milano.getMezziDisponibili().length;

  mezziDisponibili.textContent = `${numeroDisponibili} ${
    numeroDisponibili === 1 ? "disponibile" : "disponibili"
  }`;
}

renderMezzi();
