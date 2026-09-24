import type { IUtente } from "./IUtente.js";

export type TipoMezzo = "bici" | "scooter" | "monopattino";
export type StatoMezzo = "disponibile" | "in uso";

export interface IMezzo {
    tipo: TipoMezzo;
    id: string;
    stato: StatoMezzo;
    utenteAssegnato: IUtente | null;

    assegnaUtente(utente: IUtente): void;
    liberaMezzo(utente: IUtente): void;
}