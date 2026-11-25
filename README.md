# Moove

Web app di micromobilità condivisa: l'utente sceglie un mezzo disponibile
(bici, scooter o monopattino elettrico) in una città, lo prenota e termina
la corsa pagando secondo la tariffa scelta.

**Sito online:** https://mo0ove.netlify.app/

## Cosa fa

- Mostra i mezzi di una città con il loro stato (disponibile / in uso)
- Permette di prenotare un mezzo e di terminare la corsa
- Calcola il costo della corsa: tariffa oraria (1 €/ora), giornaliera
  (5 €/giorno) oppure abbonamento mensile (20 €, corse a 0 €)
- Mostra l'esito di ogni azione con un messaggio nella pagina
- Layout pensato prima per il telefono (mobile-first)

## Tecnologie

TypeScript (strict), HTML e CSS. Nessuna libreria esterna, (solo il font Manrope da Google Fonts).

## Struttura del progetto

```
src/
  interfaces/   IMezzo, IUtente, ICitta, Tariffa, RisultatoAzione
  models/       Mezzo, Utente, Citta
  config/       prezzi e calcolo del costo
  main.ts       collega le classi alla pagina
  demo.ts       dimostrazione della logica in console
```

## Scelte di progettazione

- **Interfacce e classi:** ogni classe implementa la sua interfaccia
  (`Mezzo` → `IMezzo`, ecc.), così il resto del codice dipende dal
  contratto e non dall'implementazione.
- **Le classi proteggono il proprio stato:** `Mezzo` rifiuta di essere
  assegnato se è già in uso, e può essere liberato solo dall'utente che
  lo ha prenotato.
- **Ogni azione ha il suo inverso:** `assegnaUtente` / `liberaMezzo`,
  `prenotaMezzo` / `terminaCorsa`.
- **`RisultatoAzione`:** i metodi che possono fallire restituiscono un
  oggetto con esito e messaggio, invece di stampare in console. Così la
  logica non decide dove mostrare il messaggio.
- **Prezzi in un solo file** (`config/prezzi.ts`), e calcolo del costo in
  una funzione separata.
  
## Come provarlo

Installa le dipendenze e compila:

```
npm install
npx tsc
```

Poi apri `index.html` nel browser (per esempio con Live Server).

Per vedere la logica in console, senza pagina:

```
node dist/demo.js
```
