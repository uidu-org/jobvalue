import { toEur } from '@jobvalue/utils';
import React from 'react';

export default function SalariesTable({ salaryDataForChart }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th />
            {salaryDataForChart.map(datum => (
              <th className="text-nowrap text-right" key={datum.name}>
                {datum.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Ral</th>
            {salaryDataForChart.map(datum => (
              <td className="text-right text-nowrap" key={`${datum.name}-ral`}>
                {toEur(datum.ral)}
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row">Rga</th>
            {salaryDataForChart.map(datum => (
              <td className="text-right text-nowrap" key={`${datum.name}-rga`}>
                {toEur(datum.rga)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
