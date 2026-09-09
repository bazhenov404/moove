import type { ICitta } from "../interfaces/ICitta";
import type { IMezzo } from "../interfaces/IMezzo";

export class Citta implements ICitta {
    nome: string;
    mezziDisponibili: IMezzo[];

    constructor(nome: string) {
        this.nome = nome;
        this.mezziDisponibili = [];
    }

    aggiungiMezzo(mezzo: IMezzo): void {
        this.mezziDisponibili.push(mezzo);
        console.log(`Il mezzo ${mezzo.id} di tipo ${mezzo.tipo} è stato aggiunto alla città ${this.nome}.`);
    };
}
