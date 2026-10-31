import type { Tariffa } from "../interfaces/Tariffa.js";
import { PREZZI } from "../config/prezzi.js";

const MS_ORA = 60 * 60 * 1000; // Millisecondi in un'ora
const MS_GIORNO = 24 * MS_ORA; // Millisecondi in un giorno

export function calcolaCosto(tariffa: Tariffa, inizio: Date, fine: Date): number {
    if (tariffa === "mensile") {
        return 0;
    }

    const durata = fine.getTime() - inizio.getTime();
    const unita = tariffa === "oraria" ? MS_ORA : MS_GIORNO;
    const unitaIniziate = Math.max(1, Math.ceil(durata / unita));

    return unitaIniziate * PREZZI[tariffa];

}