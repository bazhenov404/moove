import type { ICitta } from "../interfaces/ICitta.js";
import type { IMezzo } from "../interfaces/IMezzo.js";

export class Citta implements ICitta {
  nome: string;
  mezzi: IMezzo[];

  constructor(nome: string) {
    this.nome = nome;
    this.mezzi = [];
  }

  aggiungiMezzo(mezzo: IMezzo): void {
    const mezzoEsistente = this.mezzi.find((m) => m.id === mezzo.id);

    if (mezzoEsistente) {
      console.log(
        `Il mezzo con ID ${mezzo.id} esiste già nella città di ${this.nome}`,
      );
      return;
    }

    this.mezzi.push(mezzo);

    console.log(
      `${mezzo.tipo} ${mezzo.id} aggiunto alla città di ${this.nome}`,
    );
  }

  getMezziDisponibili(): IMezzo[] {
    return this.mezzi.filter((mezzo) => mezzo.stato === "disponibile");
  }
}
