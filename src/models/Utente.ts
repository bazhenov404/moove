import type { IMezzo } from "../interfaces/IMezzo";
import type { IUtente, MetodoPagamento } from "../interfaces/IUtente";

export class Utente implements IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: MetodoPagamento;
    mezzoAttuale: IMezzo | null;

    constructor(nome: string, cognome: string, email: string, metodoPagamento: MetodoPagamento) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.metodoPagamento = metodoPagamento;
        this.mezzoAttuale = null;
    }

    prenotaMezzo(mezzo: IMezzo): void {
        if (this.mezzoAttuale) {
            console.log(`L'utente ${this.nome} ${this.cognome} ha già prenotato un mezzo.`);
            return;
        }
        if(mezzo.stato === "disponibile") {
            mezzo.assegnaUtente(this);
            this.mezzoAttuale = mezzo;

            console.log(`L'utente ${this.nome} ${this.cognome} ha prenotato il mezzo ${mezzo.id} di tipo ${mezzo.tipo}.`);
        } else {
            console.log(`Il mezzo ${mezzo.id} di tipo ${mezzo.tipo} non è disponibile per la prenotazione.`);
        };
    }
    terminaCorsa(): void {
        if(!this.mezzoAttuale) {
            console.log(`L'utente ${this.nome} ${this.cognome} non ha un mezzo attualmente in uso.`);
            return;
        }
        this.mezzoAttuale.liberaMezzo(this);
        this.mezzoAttuale = null;
    }
}
