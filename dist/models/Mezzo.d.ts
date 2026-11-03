import type { IMezzo, StatoMezzo, TipoMezzo } from "../interfaces/IMezzo.js";
import type { IUtente } from "../interfaces/IUtente.js";
import type { RisultatoAzione } from "../interfaces/RisultatoAzione.js";
import type { Tariffa } from "../interfaces/Tariffa.js";
export declare class Mezzo implements IMezzo {
    tipo: TipoMezzo;
    id: string;
    stato: StatoMezzo;
    utenteAssegnato: IUtente | null;
    inizioCorsa: Date | null;
    tariffaCorsa: Tariffa | null;
    constructor(tipo: TipoMezzo, id: string);
    assegnaUtente(utente: IUtente, tariffa: Tariffa): RisultatoAzione;
    liberaMezzo(utente: IUtente): RisultatoAzione;
}
//# sourceMappingURL=Mezzo.d.ts.map