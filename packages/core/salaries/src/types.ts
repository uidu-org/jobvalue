export type Salary = {
  id: number;
  ex_ral_average: number;
  ex_ral_perc_10: number;
  ex_ral_perc_25: number;
  ex_ral_perc_50: number;
  ex_ral_perc_75: number;
  ex_ral_perc_90: number;
  ex_rga_average: number;
  ex_rga_perc_10: number;
  ex_rga_perc_25: number;
  ex_rga_perc_50: number;
  ex_rga_perc_75: number;
  ex_rga_perc_90: number;
  ex_perc?: number;
  ex_count?: number;
  ex_var?: number;
  sense_id?: number;
  sense_name?: string;
  codesense_id?: number;
  codesense_name?: string;
};

export type SalaryData = {
  name:
    | '1° Decile'
    | '1° Quartile'
    | 'Mediana'
    | '3° Quartile'
    | '9° Decile'
    | 'Tu';
  rga: number;
  ral: number;
};

export type SalaryKinds = 'ral' | 'rga';

export type SalariesProps = {
  salaryDataForChart: Array<SalaryData>;
  series: Array<SalaryKinds>;
  mySalary?: number;
  fullWidth?: boolean;
  compactMode?: boolean;
  colors: {
    ral?: string;
    rga?: string;
  };
};
