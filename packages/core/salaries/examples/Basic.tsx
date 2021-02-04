import { salaryForChart, salaryForChartCompactMode } from '@jobvalue/utils';
import React from 'react';
import Salaries, { SalariesTable } from '..';
import { salaryDataForChart } from '../examples-utils';

export default function Basic() {
  const salaries = salaryForChart(salaryDataForChart, 0);
  const compactSalaries = salaryForChartCompactMode(salaryDataForChart, {
    abs: 22000,
    ats: 22000,
  });

  return (
    <>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (abs e ats)</div>
        <Salaries salaryDataForChart={salaries} series={['ats', 'abs']} />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (ats)</div>
        <Salaries
          salaryDataForChart={salaryForChart(
            salaryDataForChart,
            0,
            {
              abs: 24000,
              ats: 25000,
            },
            {
              abs: 32000,
              ats: 37000,
            },
          )}
          series={['ats', 'abs']}
        />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (abs)</div>
        <Salaries
          salaryDataForChart={salaries}
          series={['abs']}
          colors={{ ats: '#f28d0e', abs: '#f28d0e' }}
        />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (var value)</div>
        <Salaries
          salaryDataForChart={salaries}
          series={['varValue']}
          colors={{ varValue: '#f28d0e', abs: '#f28d0e' }}
        />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (ats) compact mode</div>
        <Salaries
          compactMode
          salaryDataForChart={compactSalaries}
          series={['ats']}
        />
        <SalariesTable
          salaryDataForChart={salaryForChartCompactMode(salaryDataForChart, {
            abs: 24000,
            ats: 25000,
          })}
        />
      </div>
    </>
  );
}
