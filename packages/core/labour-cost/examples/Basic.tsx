import React from 'react';
import LabourCost from '..';
import { labourCost } from '../examples-utils';

export default function Basic() {
  return (
    <>
      <LabourCost labourCost={labourCost} mySalary={34000} isAutonomous />
      <LabourCost labourCost={labourCost} mySalary={34000} />
    </>
  );
}
