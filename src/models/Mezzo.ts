import type {IMezzo, StatoMezzo, TipoMezzo} from "../interfaces/IMezzo.js";
import type {IUtente} from "../interfaces/IUtente.js";
import type { RisultatoAzione } from "../interfaces/RisultatoAzione.js";

export class Mezzo implements IMezzo {
    tipo: TipoMezzo;
    id: string;
    stato: StatoMezzo;
    utenteAssegnato: IUtente | null;


    constructor(tipo: TipoMezzo, id: string) {
        this.tipo = tipo;
        this.id = id;
        this.stato = "disponibile";
        this.utenteAssegnato = null;
    }

    assegnaUtente(utente: IUtente): RisultatoAzione {
        if (this.stato === "in uso") {
            return {
                successo: false,
                messaggio: `Il mezzzo ${this.id} è gia in uso.`
            };
        }

        this.stato = "in uso";
        this.utenteAssegnato = utente;

        return {
            successo: true,
            messaggio: `Il mezzo ${this.id} di tipo ${this.tipo} è stato assegnato all'utente ${utente.nome} ${utente.cognome}.`
        }
    }

    liberaMezzo(utente: IUtente): RisultatoAzione {
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

    this.stato = "disponibile";
    this.utenteAssegnato = null;

    return {
        successo: true,
        messaggio: `Il mezzo ${this.id} di tipo ${this.tipo} è stato liberato.`,
        };
    }
} 
