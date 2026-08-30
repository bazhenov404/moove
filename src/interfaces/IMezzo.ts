import type { IUtente } from "./IUtente";

export type TipoMezzo = "bici" | "scooter" | "monopattino";
export type StatoMezzo = "disponibile" | "in uso";

export interface IMezzo {
    typo: TipoMezzo;
    id: string;
    stato: StatoMezzo;

    assegnaUtente(utente: IUtente): void;
}