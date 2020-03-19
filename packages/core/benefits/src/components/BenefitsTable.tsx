import React from 'react';

export default function BenefitsTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead></thead>
        <tbody>
          {data.map(datum => (
            <tr>
              <td>{datum.name}</td>
              <td className="text-right">{datum.value}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
