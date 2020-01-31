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
  ral: number;
  addToRal?: number;
  rga: number;
  ralMonthly: number;
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
