import { PREZZI } from "../config/prezzi.js";
export class Utente {
    constructor(nome, cognome, email, metodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
        this.mezzoAttuale = null;
        this.scadenzaAbbonamento = null;
    }
    prenotaMezzo(mezzo, tariffa) {
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
        const tariffaEffettiva = this.haAbbonamentoAttivo()
            ? "mensile"
            : tariffa;
        const risultato = mezzo.assegnaUtente(this, tariffaEffettiva);
        if (risultato.successo) {
            this.mezzoAttuale = mezzo;
        }
        return risultato;
    }
    terminaCorsa() {
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
    haAbbonamentoAttivo() {
        return (this.scadenzaAbbonamento !== null && this.scadenzaAbbonamento > new Date());
    }
    attivaAbbonamento() {
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
//# sourceMappingURL=Utente.js.map