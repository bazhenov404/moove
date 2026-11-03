import { calcolaCosto } from "../config/calcolaCosto.js";
export class Mezzo {
    constructor(tipo, id) {
        this.tipo = tipo;
        this.id = id;
        this.stato = "disponibile";
        this.utenteAssegnato = null;
        this.inizioCorsa = null;
        this.tariffaCorsa = null;
    }
    assegnaUtente(utente, tariffa) {
        if (this.stato === "in uso") {
            return {
                successo: false,
                messaggio: `Il mezzzo ${this.id} è gia in uso.`,
            };
        }
        this.stato = "in uso";
        this.utenteAssegnato = utente;
        this.inizioCorsa = new Date();
        this.tariffaCorsa = tariffa;
        return {
            successo: true,
            messaggio: `Il mezzo ${this.id} di tipo ${this.tipo} è stato assegnato all'utente ${utente.nome} ${utente.cognome}.`,
        };
    }
    liberaMezzo(utente) {
        if (this.stato === "disponibile") {
            return {
                successo: false,
                messaggio: `Il mezzo ${this.id} è già disponibile.`,
            };
        }
        if (this.utenteAssegnato?.email !== utente.email) {
            return {
                successo: false,
                messaggio: `Il mezzo ${this.id} non può essere liberato da ${utente.nome}: non è l'utente che lo ha prenotato.`,
            };
        }
        if (!this.inizioCorsa || !this.tariffaCorsa) {
            return {
                successo: false,
                messaggio: `Il mezzo ${this.id} non ha una corsa valida da terminare.`,
            };
        }
        const costo = calcolaCosto(this.tariffaCorsa, this.inizioCorsa, new Date());
        this.stato = "disponibile";
        this.utenteAssegnato = null;
        this.inizioCorsa = null;
        this.tariffaCorsa = null;
        return {
            successo: true,
            messaggio: `Corsa terminata. Totale ${costo.toFixed(2)} € con ${utente.metodoPagamento}.`,
            costo,
        };
    }
}
//# sourceMappingURL=Mezzo.js.map