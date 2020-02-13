import React from 'react';
import SalariesComparator from '..';
import { salaries } from '../examples-utils/index';

export default function Basic() {
    const salaryDataForChart = salaries.filter(item =>  item.exSense === 1 && item.exCodesense === 1 );
    return <SalariesComparator salaryDataForChart = {salaryDataForChart} series={['rga', 'ral']} />;
}
