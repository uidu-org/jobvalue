import * as am4core from '@amcharts/amcharts4/core';
import React, { useState } from 'react';
import { preparePDF, savePDF } from '..';
import Benefits from '../../../core/benefits';

export default function Basic() {
  const [pdf, setPdf] = useState(null);
  const openDownload = () => {
    preparePDF({
      charts: am4core.registry.baseSprites,
    }).then(setPdf);
  };

  const saveDownload = () => {
    const name = 'Example';
    savePDF(pdf, name);
  };

  console.log(pdf);

  return (
    <>
      <p>Example button for pdf</p>
      <Benefits />
      {pdf ? (
        <button onClick={saveDownload}>Scarica</button>
      ) : (
        <button onClick={openDownload}>Scarica .pdf</button>
      )}
    </>
  );
}
