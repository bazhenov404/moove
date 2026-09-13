import { Mezzo } from "./models/Mezzo";
import { Utente } from "./models/Utente";
import { Citta } from "./models/Citta";

const bici1 = new Mezzo("bici", "BIKE-001");
const scooter1 = new Mezzo("scooter", "SCOOTER-001");
const monopattino1 = new Mezzo("monopattino", "MONO-001");

const mario = new Utente("Mario", "Rossi", "mario.rossi@email.com", "Carta di credito");
const anna = new Utente("Anna", "Bianchi", "anna.bianchi@email.com", "PayPal");

const milano = new Citta("Milano");

milano.aggiungiMezzo(bici1);
milano.aggiungiMezzo(scooter1);
milano.aggiungiMezzo(monopattino1);

mario.prenotaMezzo(bici1);
anna.prenotaMezzo(scooter1);

console.log(milano.mezziDisponibili);