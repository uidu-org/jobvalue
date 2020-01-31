import { toEur, toPerc } from '@jobvalue/utils';
import React from 'react';

export default function JobSalarySummary({ mySalary }) {
  console.log(mySalary);
  return (
    <>
      TODO: torta
      <table className="table">
        <tbody>
          <tr>
            <th scope="row" colSpan={2}>
              La tua retribuzione
            </th>
          </tr>
          {/* <tr>
            <td className="font-weight-light">
              Retribuzione fissa mensile lorda
            </td>
            <td className="font-weight-light">{toEur(mySalary.ralMonthly)}</td>
          </tr>
          <tr>
            <td className="font-weight-light">Mensilità</td>
            <td className="font-weight-light">{mySalary.months}</td>
          </tr> */}
          <tr>
            <th scope="row">RAL - Retribuzione annua lorda</th>
            <th scope="row">{toEur(mySalary.ral)}</th>
          </tr>
          <tr>
            <td>Retribuzione variabile percepita nell'ultimo anno</td>
            <td>{toEur(mySalary.addToRal)}</td>
          </tr>
          <tr>
            <td>Retribuzione variabile in %</td>
            <td>{toPerc(mySalary.addToRal / mySalary.ral)}</td>
          </tr>
          <tr>
            <th scope="row">RGA - Retribuzione globale annua</th>
            <th scope="row">{toEur(mySalary.rga)}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
}
