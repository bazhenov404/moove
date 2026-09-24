import type { IMezzo } from "./IMezzo.js";

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

    prenotaMezzo(mezzo: IMezzo): void;
    terminaCorsa(): void;
}