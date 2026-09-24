import type { IMezzo } from "./IMezzo.js";

export interface ICitta {
    nome: string;
    mezzi: IMezzo[];

    aggiungiMezzo(mezzo: IMezzo): void;
    getMezziDisponibili(): IMezzo[];
}

