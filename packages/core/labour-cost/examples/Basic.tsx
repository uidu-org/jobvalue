import React from 'react';
import LabourCost, { LabourCostDescription } from '..';
import { labourCost } from '../examples-utils';

export default function Basic() {
  return (
    <>
      <div className="card mb-5">
        <div className="card-header border-bottom">
          Valore e costo del tuo lavoro annuo
        </div>
        <div className="card-body">
          <LabourCost
            labourCost={labourCost}
            mySalary={34000}
            isAutonomous
            fullWidth
          />
        </div>
        <div className="card-footer small text-muted">
          <LabourCostDescription isAutonomous />
        </div>
      </div>
      <div className="card mb-5">
        <div className="card-header border-bottom">
          Valore e costo del tuo lavoro annuo
        </div>
        <div className="card-body">
          <LabourCost labourCost={labourCost} mySalary={34000} />
        </div>
        <div className="card-footer small text-muted">
          <LabourCostDescription />
        </div>
      </div>
    </>
  );
}
