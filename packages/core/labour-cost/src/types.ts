export type LabourCostRecord = {
  yearlyCompany: number;
  yearlyNet: number;
  yearlyGross: number;
};

export type LabourCostProps = {
  labourCost: LabourCostRecord;
  mySalary: number;

  fullWidth?: boolean;
  substituteKey?: string;
  substituteWith?: string;
  isAutonomous?: boolean;
};
