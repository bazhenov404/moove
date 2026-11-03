import { Mezzo } from "./models/Mezzo.js";
import { Utente } from "./models/Utente.js";
import { Citta } from "./models/Citta.js";
import { PREZZI } from "./config/prezzi.js";
const bici1 = new Mezzo("bici", "BIKE-001");
const scooter1 = new Mezzo("scooter", "SCOOTER-001");
const monopattino1 = new Mezzo("monopattino", "MONO-001");
const mario = new Utente("Mario", "Rossi", "mario.rossi@email.com", "Carta di credito");
const milano = new Citta("Milano");
milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(scooter1);
milano.aggiungiMezzo(monopattino1);
const bannerMessaggio = document.querySelector("#banner-messaggio");
const listaMezzi = document.querySelector("#lista-mezzi");
const totaleMezzi = document.querySelector("#totale-mezzi");
const mezziDisponibili = document.querySelector("#mezzi-disponibili");
const opzioniTariffa = document.querySelectorAll(".opzione-tariffa");
const pulsanteAbbonamento = document.querySelector("#pulsante-abbonamento");
const nomiVisualizzati = {
    bici: "Bici",
    scooter: "Scooter elettrico",
    monopattino: "Monopattino",
};
let tariffaScelta = "oraria";
function mostraBanner(risultato) {
    if (!bannerMessaggio)
        return;
    bannerMessaggio.textContent = risultato.messaggio;
    bannerMessaggio.className = "banner-messaggio";
    bannerMessaggio.classList.add(risultato.successo ? "successo" : "errore");
    bannerMessaggio.hidden = false;
    setTimeout(() => {
        bannerMessaggio.hidden = true;
    }, 3000);
}
function renderMezzi() {
    if (!listaMezzi || !totaleMezzi || !mezziDisponibili || !bannerMessaggio) {
        throw new Error("Elementi dell'interfaccia non trovati");
    }
    listaMezzi.innerHTML = "";
    milano.mezzi.forEach((mezzo) => {
        const card = document.createElement("article");
        card.classList.add("card-mezzo");
        card.dataset.id = mezzo.id;
        const isMioMezzo = mezzo.utenteAssegnato?.email === mario.email;
        let testoBottone;
        let disabledAttr;
        let azione;
        if (mezzo.stato === "disponibile") {
            testoBottone = "Prenota";
            disabledAttr = "";
            azione = "prenota";
        }
        else if (isMioMezzo) {
            testoBottone = "Termina corsa";
            disabledAttr = "";
            azione = "termina";
        }
        else {
            testoBottone = "Non disponibile";
            disabledAttr = "disabled";
            azione = "";
        }
        card.innerHTML = `
      <div class="parte-superiore-card">

        <span class="icona-mezzo">
          ${mezzo.tipo === "bici"
            ? "🚲"
            : mezzo.tipo === "monopattino"
                ? "🛴"
                : "🛵"}
        </span>

        <span class="stato ${mezzo.stato === "disponibile" ? "disponibile" : "non-disponibile"}">
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
        const pulsantePrenota = card.querySelector(".pulsante-prenota");
        if (!pulsantePrenota) {
            return;
        }
        pulsantePrenota.addEventListener("click", () => {
            const mezzoId = pulsantePrenota.dataset.id;
            const azioneClick = pulsantePrenota.dataset.azione;
            const mezzoSelezionato = milano.mezzi.find((mezzo) => mezzo.id === mezzoId);
            if (!mezzoSelezionato) {
                console.error("mezzo non trovato");
                return;
            }
            if (azioneClick === "prenota") {
                const risultato = mario.prenotaMezzo(mezzoSelezionato, tariffaScelta);
                mostraBanner(risultato);
            }
            else if (azioneClick === "termina") {
                const risultato = mario.terminaCorsa();
                mostraBanner(risultato);
            }
            renderMezzi();
        });
        listaMezzi.appendChild(card);
    });
    totaleMezzi.textContent = `${milano.mezzi.length} mezzi`;
    const numeroDisponibili = milano.getMezziDisponibili().length;
    mezziDisponibili.textContent = `${numeroDisponibili} ${numeroDisponibili === 1 ? "disponibile" : "disponibili"}`;
}
function aggiornaPannelloTariffe() {
    if (!pulsanteAbbonamento)
        return;
    const abbonato = mario.haAbbonamentoAttivo();
    opzioniTariffa.forEach((opzione) => {
        const selezionata = opzione.dataset.tariffa === tariffaScelta;
        opzione.classList.toggle("attiva", selezionata && !abbonato);
        opzione.setAttribute("aria-pressed", String(selezionata));
        opzione.disabled = abbonato;
    });
    if (abbonato && mario.scadenzaAbbonamento) {
        pulsanteAbbonamento.textContent = `Abbonamento attivo fino al ${mario.scadenzaAbbonamento.toLocaleDateString("it-IT")}`;
        pulsanteAbbonamento.disabled = true;
    }
    else {
        pulsanteAbbonamento.textContent = `Attiva abbonamento · ${PREZZI.mensile} € al mese`;
        pulsanteAbbonamento.disabled = false;
    }
}
opzioniTariffa.forEach((opzione) => {
    opzione.addEventListener("click", () => {
        const valore = opzione.dataset.tariffa;
        if (valore === "oraria" || valore === "giornaliera") {
            tariffaScelta = valore;
            aggiornaPannelloTariffe();
        }
    });
});
pulsanteAbbonamento?.addEventListener("click", () => {
    const risultato = mario.attivaAbbonamento();
    mostraBanner(risultato);
    aggiornaPannelloTariffe();
});
aggiornaPannelloTariffe();
renderMezzi();
//# sourceMappingURL=main.js.map