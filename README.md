### Creare componenti

1. `cd packages/core`
2. `mkdir nome-componente`
3. `cd nome-componente`
4. `bolt init`. Ricordarsi di modificare il nome con il namespace @jobvalue/nome-componente e di mettere una versione 0.1.0
5. Copiare da `packages/core/salaries` i seguenti file

- build
- index.ts
- tsconfig.json

6. Creare le seguenti cartelle

- src/components/NomeComponente.tsx
- src/index.ts
- docs
- examples

7. per aggiungere dependencies al nuovo pacchetto `bolt w @jobvalue/nome-componente add @amcharts/amcharts4`
