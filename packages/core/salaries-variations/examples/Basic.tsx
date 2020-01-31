import React from 'react';
import { ExCount, ExPerc, ExVar } from '..';
import { salaryDataForChart } from '../../salaries/examples-utils';

export default function Basic() {
  return (
    <>
      <ExCount salaryDataForChart={salaryDataForChart} loaded />
      <ExVar salaryDataForChart={salaryDataForChart} loaded />
      <ExPerc salaryDataForChart={salaryDataForChart} loaded />
    </>
  );
}
