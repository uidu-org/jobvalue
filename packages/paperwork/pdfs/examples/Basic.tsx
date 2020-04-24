import * as am4core from '@amcharts/amcharts4/core';
import SalariesComparator from '@jobvalue/salaries-comparator';
import React, { useState } from 'react';
import { preparePDF, savePDF } from '..';
import Benefits from '../../../core/benefits';
import { salaries } from '../../../core/salaries-comparator/examples-utils/index';

export default function Basic() {
  const [pdf, setPdf] = useState(null);
  const openDownload = () => {
    preparePDF({
      charts: am4core.registry.baseSprites,
      docProps: () => {},
    }).then(setPdf);
  };

  const saveDownload = () => {
    const name = 'Example';
    savePDF(pdf, name);
  };

  return (
    <>
      <p>Example button for pdf</p>
      <Benefits />
      <SalariesComparator
        salaryDataForChart={salaries.filter(
          (item) => item.exSense === 1 && item.exCodesense === 1,
        )}
        mySalary={88000}
      />
      {pdf ? (
        <button onClick={saveDownload}>Scarica</button>
      ) : (
        <button onClick={openDownload}>Scarica .pdf</button>
      )}
    </>
  );
}
