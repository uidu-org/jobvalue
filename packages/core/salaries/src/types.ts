export type Salary = {
  id: number;
  absAverage: number;
  absPerc10: number;
  absPerc25: number;
  absPerc50: number;
  absPerc75: number;
  absPerc90: number;
  atsAverage: number;
  atsPerc10: number;
  atsPerc25: number;
  atsPerc50: number;
  atsPerc75: number;
  atsPerc90: number;
  varValuePerc10: number;
  varValuePerc25: number;
  varValuePerc50: number;
  varValuePerc75: number;
  varValuePerc90: number;
  incumbentsWithVarPerc?: number;
  incumbentsCount?: number;
  sense_id?: number;
  sense_name?: string;
  codesense_id?: number;
  codesense_name?: string;
};

export type SalaryDataNameKeys =
  | '1° Decile'
  | '1° Quartile'
  | 'Mediana'
  | '3° Quartile'
  | '9° Decile'
  | 'Tu'
  | 'Offerta';

export type SalaryData = {
  name: SalaryDataNameKeys;
  ats?: number;
  abs?: number;
  var?: number;
};

export type SalaryKinds = 'abs' | 'ats' | 'varValue';

export type SalariesProps = {
  salaryDataForChart: Array<SalaryData>;
  series: Array<SalaryKinds>;
  mySalary?: number;
  fullWidth?: boolean;
  compactMode?: boolean;
  colors: {
    abs?: string;
    ats?: string;
    varValue?: string;
  };
};
