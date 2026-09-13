import type { IMezzo } from "./IMezzo";

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

    prenotaMezzo(mezzo: IMezzo): void;
}