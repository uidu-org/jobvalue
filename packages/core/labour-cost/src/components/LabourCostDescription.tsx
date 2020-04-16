import React from 'react';

export default function LabourCostDescription({ isAutonomous = false }) {
  return (
    <>
      {isAutonomous && (
        <span className="d-block">
          Pensiamo ti possa essere utile confrontare la tua situazione con
          quella di un lavoratore dipendente. Nel grafico trovi la conversione
          del tuo compenso (ipotizzato come costo del lavoro dell’azienda,
          qualora fossi un dipendente), in una retribuzione annua lorda e netta.
        </span>
      )}
      <span>
        Il dato può presentare uno scarto del 3% in funzione delle
        caratteristiche aziendali/contrattuali, delle aliquote regionali e
        comunali e delle singole situazioni individuali
      </span>
    </>
  );
}
