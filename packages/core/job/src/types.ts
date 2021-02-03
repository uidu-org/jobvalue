export type Job = {
  id: number;
  name: string;
  description: string;
};

export type Industry = {
  id: number;
  name: string;
};

export type FunctionalArea = {
  id: number;
  name: string;
};

export type MySalary = {
  months?: number;
  abs: number;
  addToAbs?: number;
  ats: number;
  absMonthly: number;
  partTimePerc?: number;
};

export type UserProfileProps = {
  email: string;
  job: Job;
  industry: Industry;
  functionalArea: FunctionalArea;
  province: string;
  seniority: string;
  birthdate: number;
  gender: string;
  qualification: string;
  inq: string;
  mySalary: MySalary;
};

export type JobSalarySummaryProps = {
  mySalary: MySalary;
  isAutonomous: boolean;
};
