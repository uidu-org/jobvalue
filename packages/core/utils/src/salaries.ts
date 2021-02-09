import { Salary, SalaryData, SalaryDataNameKeys } from '@jobvalue/salaries';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import { apiBaseUrl } from './index';

export const salaryDiff = (mine, other): number => (mine - other) / other;

export const salaryBySenses = (state) => {
  const { salary } = state;
  return groupBy(salary.items, 'sense_id');
};

export const salaryForChartCompactMode = ({
  salaries,
  mySalary,
  jobOffer,
  curves = [
    { name: 'Minimo', key: 'Perc10' },
    { name: 'Medio', key: 'Average' },
    { name: 'Massimo', key: 'Perc90' },
  ],
  mySalaryName,
}: {
  salaries: Array<Salary>;
  mySalary?: { abs: number; ats: number; varPerc?: number; varValue?: number };
  jobOffer?: { abs: number; ats: number; varPerc?: number; varValue?: number };
  curves: Array<any>;
  mySalaryName?: string;
}) =>
  salaryForChart({
    salaries,
    salariesIndex: 0,
    mySalary,
    jobOffer,
    curves,
    mySalaryName,
  });

export const salaryForChart = ({
  salaries,
  /** In case of PRO payment data, at 0 we have the national curve, at 1 we have the detailed one */
  salariesIndex,
  mySalary,
  jobOffer,
  curves = [
    // { name: 'Media', key: 'average' },
    { name: '1° Decile', key: 'Perc10' },
    { name: '1° Quartile', key: 'Perc25' },
    { name: 'Mediana', key: 'Perc50' },
    { name: '3° Quartile', key: 'Perc75' },
    { name: '9° Decile', key: 'Perc90' },
  ],
  mySalaryName = 'Tu',
}: {
  salaries: Array<Salary>;
  salariesIndex: number;
  mySalary?: { abs: number; ats: number; varPerc?: number; varValue?: number };
  jobOffer?: { abs: number; ats: number; varPerc?: number; varValue?: number };
  curves: Array<any>;
  mySalaryName?: string;
}): SalaryData[] => {
  const out = curves.map((legend) => {
    const res: {
      name: SalaryDataNameKeys;
      ats?: number;
      abs?: number;
      varPerc?: number;
      varValue?: number;
      color?: string;
    } = {
      name: legend.name as SalaryDataNameKeys,
      label: legend.name as SalaryDataNameKeys,
    };
    const foo = salaries.filter((s) => !s.codesense_id && !s.sense_id)[
      salariesIndex
    ];
    res.ats = foo[`ats${legend.key}`];
    res.abs = foo[`abs${legend.key}`];
    res.varPerc = foo[`varPerc${legend.key}`];
    res.varValue = foo[`varValue${legend.key}`];
    return res;
  });
  if (mySalary) {
    out.push({
      name: 'Tu' as SalaryDataNameKeys,
      ats: mySalary.ats,
      abs: mySalary.abs,
      varPerc: mySalary.varPerc,
      varValue: mySalary.varValue,
      labelName: mySalaryName,
    });
  }
  if (jobOffer) {
    out.push({
      name: 'Offerta' as SalaryDataNameKeys,
      ats: jobOffer.ats,
      abs: jobOffer.abs,
      varPerc: mySalary.varPerc,
      varValue: mySalary.varValue,
    });
  }
  return out.slice().sort((a, b) => a.ats - b.ats);
};

// Action creators
export const fetchSalary = ({ report }) => {
  const { classifications } = report;
  const industryApiId = classifications.filter(
    (c) => c.provider === 'Jobpricing_Industries',
  )[0].value;
  const jobApiId = classifications.filter(
    (c) => c.provider === 'Jobpricing_Jobs',
  )[0].value;
  const regionApiId = classifications.filter(
    (c) => c.provider === 'Jobpricing_Regions',
  )[0].value;
  return axios
    .get(
      `${apiBaseUrl[process.env.NODE_ENV]}/api/salaries/${jobApiId}-${
        report.inqId
      }/mot?token=jobpricing&size=${
        report.sizeId
      }&industry=${industryApiId}&region=${regionApiId}`,
    )
    .then((response) => response.data);
};
