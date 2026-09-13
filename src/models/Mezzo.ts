import type {IMezzo, StatoMezzo, TipoMezzo} from "../interfaces/IMezzo";
import type {IUtente} from "../interfaces/IUtente";

export class Mezzo implements IMezzo {
    tipo: TipoMezzo;
    id: string;
    stato: StatoMezzo;

    constructor(tipo: TipoMezzo, id: string) {
        this.tipo = tipo;
        this.id = id;
        this.stato = "disponibile";
    }

    assegnaUtente(utente: IUtente): void {
        this.stato = "in uso";

        console.log(`Il mezzo ${this.id} di tipo ${this.tipo} è stato assegnato all'utente ${utente.nome} ${utente.cognome}.`
        );
    }
}