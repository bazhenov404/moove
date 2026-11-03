export class Citta {
    constructor(nome) {
        this.nome = nome;
        this.mezzi = [];
    }
    aggiungiMezzo(mezzo) {
        const mezzoEsistente = this.mezzi.find((m) => m.id === mezzo.id);
        if (mezzoEsistente) {
            console.log(`Il mezzo con ID ${mezzo.id} esiste già nella città di ${this.nome}`);
            return;
        }
        this.mezzi.push(mezzo);
        console.log(`${mezzo.tipo} ${mezzo.id} aggiunto alla città di ${this.nome}`);
    }
    getMezziDisponibili() {
        return this.mezzi.filter((mezzo) => mezzo.stato === "disponibile");
    }
}
//# sourceMappingURL=Citta.js.map