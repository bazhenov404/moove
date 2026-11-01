import type { IMezzo } from "./IMezzo.js";
import type { RisultatoAzione } from "./RisultatoAzione.js";
import type { Tariffa } from "./Tariffa.js";

export type MetodoPagamento =
    | "Carta di credito"
    | "PayPal"
    | "Apple pay"
    | "Google pay";

export interface IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: MetodoPagamento;
    mezzoAttuale: IMezzo | null;
    scadenzaAbbonamento: Date | null;

    prenotaMezzo(mezzo: IMezzo, tariffa: Tariffa): RisultatoAzione;
    terminaCorsa(): RisultatoAzione;
    haAbbonamentoAttivo(): boolean;
    attivaAbbonamento(): RisultatoAzione;
}