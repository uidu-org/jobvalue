import React from 'react';
import CompanyBenchmarks from '..';
import { companyBenchmarks } from '../examples-utils';

export default function Basic() {
  return (
    <CompanyBenchmarks companyBenchmarks={companyBenchmarks} mySalary={34000} />
  );
}
