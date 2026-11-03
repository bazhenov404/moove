import type { ICitta } from "../interfaces/ICitta.js";
import type { IMezzo } from "../interfaces/IMezzo.js";
export declare class Citta implements ICitta {
    nome: string;
    mezzi: IMezzo[];
    constructor(nome: string);
    aggiungiMezzo(mezzo: IMezzo): void;
    getMezziDisponibili(): IMezzo[];
}
//# sourceMappingURL=Citta.d.ts.map