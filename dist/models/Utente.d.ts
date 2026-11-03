import type { IMezzo } from "../interfaces/IMezzo.js";
import type { IUtente, MetodoPagamento } from "../interfaces/IUtente.js";
import type { RisultatoAzione } from "../interfaces/RisultatoAzione.js";
import type { Tariffa } from "../interfaces/Tariffa.js";
export declare class Utente implements IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: MetodoPagamento;
    mezzoAttuale: IMezzo | null;
    scadenzaAbbonamento: Date | null;
    constructor(nome: string, cognome: string, email: string, metodoPagamento: MetodoPagamento);
    prenotaMezzo(mezzo: IMezzo, tariffa: Tariffa): RisultatoAzione;
    terminaCorsa(): RisultatoAzione;
    haAbbonamentoAttivo(): boolean;
    attivaAbbonamento(): RisultatoAzione;
}
//# sourceMappingURL=Utente.d.ts.map