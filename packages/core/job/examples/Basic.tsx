import React from 'react';
import Job, { JobCustomizations, JobSalarySummary } from '..';
import { mockUser } from '../examples-utils';

export default function Basic() {
  return (
    <div className="card">
      <div className="card-body pb-0">
        <Job {...mockUser} />
        <JobCustomizations {...mockUser} />
      </div>
      <JobSalarySummary mySalary={mockUser.mySalary} />
    </div>
  );
}
