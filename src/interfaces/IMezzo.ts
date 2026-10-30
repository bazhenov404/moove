import type { IUtente } from "./IUtente.js";
import type { RisultatoAzione } from "./RisultatoAzione.js";
import type { Tariffa } from "./Tariffa.js";

export type TipoMezzo = "bici" | "scooter" | "monopattino";
export type StatoMezzo = "disponibile" | "in uso";

export interface IMezzo {
    tipo: TipoMezzo;
    id: string;
    stato: StatoMezzo;
    utenteAssegnato: IUtente | null;
    inizioCorsa: Date | null;
    tariffaCorsa: Tariffa | null;

    assegnaUtente(utente: IUtente, tariffa: Tariffa): RisultatoAzione;
    liberaMezzo(utente: IUtente): RisultatoAzione;
}