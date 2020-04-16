import React from 'react';
import SalariesComparator from '..';
import { salaries } from '../examples-utils/index';

export default function Basic() {
  return (
    <div>
      <div className="mb-4">
        <SalariesComparator
          salaryDataForChart={salaries.filter(
            (item) => item.exSense === 1 && item.exCodesense === 1,
          )}
          mySalary={28000}
        />
      </div>
      <div className="mb-4">
        <SalariesComparator
          salaryDataForChart={salaries.filter(
            (item) => item.exSense === 9 && item.exCodesense === 1,
          )}
          mySalary={32000}
        />
      </div>
      <div className="mb-4">
        <SalariesComparator
          salaryDataForChart={salaries.filter(
            (item) => item.exSense === 1 && item.exCodesense === 1,
          )}
          mySalary={32000}
        />
      </div>
    </div>
  );
}
