import type { ICitta } from "../interfaces/ICitta";
import type { IMezzo } from "../interfaces/IMezzo";

export class Citta implements ICitta {
  nome: string;
  mezziDisponibili: IMezzo[];

  constructor(nome: string) {
    this.nome = nome;
    this.mezziDisponibili = [];
  }

  aggiungiMezzo(mezzo: IMezzo): void {
    const mezzoEsistente = this.mezziDisponibili.find((m) => m.id === mezzo.id);

    if (mezzoEsistente) {
      console.log(
        `Il mezzo con ID ${mezzo.id} esiste già nella città di ${this.nome}`,
      );
      return;
    }

    this.mezziDisponibili.push(mezzo);

    console.log(
      `${mezzo.tipo} ${mezzo.id} aggiunto alla città di ${this.nome}`,
    );
  }
}
