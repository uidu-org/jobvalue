export type LabourCostRecord = {
  yearlyCompany: number;
  yearlyNet: number;
  yearlyGross: number;
};

export type LabourCostProps = {
  labourCost: LabourCostRecord;
  mySalary: number;

  fullWidth?: boolean;
  isAutonomous?: boolean;
};
