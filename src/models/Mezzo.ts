import type {IMezzo, StatoMezzo, TipoMezzo} from "../interfaces/IMezzo";
import type {IUtente} from "../interfaces/IUtente";

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

    assegnaUtente(utente: IUtente): void {
        this.stato = "in uso";
        this.utenteAssegnato = utente;

        console.log(`Il mezzo ${this.id} di tipo ${this.tipo} è stato assegnato all'utente ${utente.nome} ${utente.cognome}.`
        );
    }

    liberaMezzo(utente: IUtente): void {
        if (this.stato === "disponibile") {
            console.log(`Il mezzo ${this.id} di tipo ${this.tipo} è già disponibile.`);
            return;
        }

        if (this.utenteAssegnato?.email !== utente.email) {
            console.log(`Il mezzo ${this.id} di tipo ${this.tipo} è assegnato a un altro utente.`);
            return;
        }

        this.stato = "disponibile";
        this.utenteAssegnato = null;

        console.log(`Il mezzo ${this.id} di tipo ${this.tipo} è stato liberato dall'utente ${utente.nome} ${utente.cognome}.`);
    }
} 
