import { ArrowUpDown, salaryDiff, toEur, toPerc } from '@jobvalue/utils';
import React from 'react';

export default function CompanyBenchmarks({ companyBenchmarks, mySalary }) {
  return (
    <table className="table mb-0">
      <tbody>
        {companyBenchmarks.map(size => {
          const diff: number = salaryDiff(mySalary, size.ex_rga_average);

          return (
            <tr key={size.codesense_name}>
              <th scope="row" className="w-50">
                {size.codesense_name}
              </th>
              <td className="w-25">{toEur(size.ex_rga_average)}</td>
              <td className="w-25">
                <div className="d-flex align-items-center">
                  <ArrowUpDown
                    direction={diff > 0 ? 'up' : 'down'}
                    className="mr-2"
                  />
                  {toPerc(Math.abs(diff))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
