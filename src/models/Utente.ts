import type { IMezzo } from "../interfaces/IMezzo.js";
import type { IUtente, MetodoPagamento } from "../interfaces/IUtente.js";
import type { RisultatoAzione } from "../interfaces/RisultatoAzione.js";
import type { Tariffa } from "../interfaces/Tariffa.js";

import { PREZZI } from "../config/prezzi.js";

export class Utente implements IUtente {
  nome: string;
  cognome: string;
  email: string;
  metodoPagamento: MetodoPagamento;
  mezzoAttuale: IMezzo | null;
  scadenzaAbbonamento: Date | null;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    metodoPagamento: MetodoPagamento,
  ) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.metodoPagamento = metodoPagamento;
    this.mezzoAttuale = null;
    this.scadenzaAbbonamento = null;
  }

  prenotaMezzo(mezzo: IMezzo, tariffa: Tariffa): RisultatoAzione {
    if (this.mezzoAttuale) {
      return {
        successo: false,
        messaggio: `${this.nome} ${this.cognome} ha già un mezzo assegnato (${this.mezzoAttuale.id}).`,
      };
    }

    if (mezzo.stato !== "disponibile") {
      return {
        successo: false,
        messaggio: `Il mezzo ${mezzo.id} non è disponibile per la prenotazione.`,
      };
    }

    const tariffaEffettiva: Tariffa = this.haAbbonamentoAttivo()
      ? "mensile"
      : tariffa;
    const risultato = mezzo.assegnaUtente(this, tariffaEffettiva);

    if (risultato.successo) {
      this.mezzoAttuale = mezzo;
    }

    return risultato;
  }

  terminaCorsa(): RisultatoAzione {
    if (!this.mezzoAttuale) {
      return {
        successo: false,
        messaggio: `${this.nome} ${this.cognome} non ha nessun mezzo da restituire.`,
      };
    }

    const risultato = this.mezzoAttuale.liberaMezzo(this);

    if (risultato.successo) {
      this.mezzoAttuale = null;
    }

    return risultato;
  }

  haAbbonamentoAttivo(): boolean {
    return (
      this.scadenzaAbbonamento !== null && this.scadenzaAbbonamento > new Date()
    );
  }

  attivaAbbonamento(): RisultatoAzione {
    if (this.haAbbonamentoAttivo()) {
      return {
        successo: false,
        messaggio: `${this.nome} ${this.cognome} ha già un abbonamento attivo.`,
      };
    }

    const scadenza = new Date();
    scadenza.setDate(scadenza.getDate() + 30);
    this.scadenzaAbbonamento = scadenza;

    return {
      successo: true,
      messaggio: `Abbonamento mensile attivato ${PREZZI.mensile.toFixed(2)} € con ${this.metodoPagamento}.`,
      costo: PREZZI.mensile,
    };
  }
}
