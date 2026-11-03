import { Mezzo } from "./models/Mezzo.js";
import { Utente } from "./models/Utente.js";
import { Citta } from "./models/Citta.js";

function titolo(testo: string): void {
  console.log(`\n=== ${testo} ===`);
}

const milano = new Citta("Milano");
const bici = new Mezzo("bici", "BIKE-001");
const scooter = new Mezzo("scooter", "SCOOTER-001");

const mario = new Utente("Mario", "Rossi", "mario.rossi@email.com", "Carta di credito");
const anna = new Utente("Anna", "Bianchi", "anna.bianchi@email.com", "PayPal");

titolo("Aggiunta di mezzi alla città");
milano.aggiungiMezzo(bici);
milano.aggiungiMezzo(scooter);
milano.aggiungiMezzo(bici); // duplicato: deve essere rifiutato

titolo("Prenotazione");
console.log(mario.prenotaMezzo(bici, "oraria").messaggio);
console.log(anna.prenotaMezzo(bici, "oraria").messaggio); // bici già in uso
console.log(mario.prenotaMezzo(scooter, "oraria").messaggio); // Mario ha già un mezzo

titolo("Mezzi ancora disponibili");
console.log(milano.getMezziDisponibili().map((m) => m.id));

titolo("Fine corsa");
console.log(anna.terminaCorsa().messaggio); // Anna non ha mezzi
console.log(mario.terminaCorsa().messaggio); // corsa terminata con costo

titolo("Abbonamento mensile");
console.log(anna.attivaAbbonamento().messaggio);
console.log(anna.prenotaMezzo(scooter, "oraria").messaggio);
console.log(anna.terminaCorsa().messaggio); // totale 0 €