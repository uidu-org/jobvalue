import { salaryForChart, salaryForChartCompactMode } from '@jobvalue/utils';
import React from 'react';
import Salaries, { SalariesTable } from '..';
import { salaryDataForChart } from '../examples-utils';

export default function Basic() {
  const salaries = salaryForChart(salaryDataForChart);
  return (
    <>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (RAL e RGA)</div>
        <Salaries
          salaryDataForChart={salaryForChart(salaryDataForChart)}
          series={['rga', 'ral']}
        />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (RGA)</div>
        <Salaries
          salaryDataForChart={salaryForChart(
            salaryDataForChart,
            {
              ral: 24000,
              rga: 25000,
            },
            {
              ral: 32000,
              rga: 37000,
            },
          )}
          series={['rga', 'ral']}
        />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (RAL)</div>
        <Salaries
          salaryDataForChart={salaries}
          series={['ral']}
          colors={{ rga: '#f28d0e', ral: '#f28d0e' }}
        />
        <SalariesTable salaryDataForChart={salaries} />
      </div>
      <div className="card mb-5">
        <div className="card-header">Dati retributivi (RGA) compact mode</div>
        <Salaries
          compactMode
          salaryDataForChart={salaryForChartCompactMode(salaryDataForChart, {
            color: '#386da7',
            ral: 24000,
            rga: 25000,
          })}
          series={['rga']}
          colors={{ rga: '#f28d0e', ral: '#f28d0e' }}
        />
        <SalariesTable
          salaryDataForChart={salaryForChartCompactMode(salaryDataForChart, {
            color: '#386da7',
            ral: 24000,
            rga: 25000,
          })}
        />
      </div>
    </>
  );
}
