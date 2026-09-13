import type { IMezzo } from "../interfaces/IMezzo";
import type { IUtente, MetodoPagamento } from "../interfaces/IUtente";

export class Utente implements IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: MetodoPagamento;

    constructor(nome: string, cognome: string, email: string, metodoPagamento: MetodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
    }

    prenotaMezzo(mezzo: IMezzo): void {
        if (mezzo.stato === "disponibile") {
            mezzo.assegnaUtente(this);

            console.log(`L'utente ${this.nome} ${this.cognome} ha prenotato il mezzo ${mezzo.id} di tipo ${mezzo.tipo}.`);
        } else {
            console.log(`Il mezzo ${mezzo.id} di tipo ${mezzo.tipo} non è disponibile per la prenotazione.`);
        };
    }
}
