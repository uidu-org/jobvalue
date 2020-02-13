import React from 'react';
import SalariesComparator from '..';
import { salaries } from '../examples-utils/index';

export default function Basic() {
  const salaryDataForChart = salaries.filter(
    item => item.exSense === 1 && item.exCodesense === 1,
  );
  return (
    <div className="row no-gutters">
      <div className="col-lg-4">
        <SalariesComparator
          salaryDataForChart={salaryDataForChart}
          mySalary={32000}
        />
      </div>
      <div className="col-lg-4">
        <SalariesComparator
          salaryDataForChart={salaryDataForChart}
          mySalary={32000}
        />
      </div>
      <div className="col-lg-4">
        <SalariesComparator
          salaryDataForChart={salaryDataForChart}
          mySalary={32000}
        />
      </div>
    </div>
  );
}
