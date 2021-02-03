import React from 'react';
import { ExCount, ExPerc, ExVar } from '..';
import { salaryDataForChart } from '../../salaries/examples-utils';

export default function Basic() {
  return (
    <div className="card">
      <div className="card-header">Retribuzione variabile</div>
      <div className="card-body">
        <p className="mb-1">Incidenza sulla abs</p>
        <p className="text-muted mb-0">
          Rapporto fra la retribuzione variabile media annua percepita e la abs
          media annua
        </p>
      </div>
      <ExVar
        salaryDataForChart={salaryDataForChart}
        mySalary={{ exVar: 3200, abs: 32000 }}
        mode="value"
      />
      <ExVar
        salaryDataForChart={salaryDataForChart}
        mySalary={{ exVar: 3200, abs: 32000 }}
        mode="perc"
      />
      <ExCount salaryDataForChart={salaryDataForChart} loaded />
      <ExPerc salaryDataForChart={salaryDataForChart} loaded />
    </div>
  );
}
