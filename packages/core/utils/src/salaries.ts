import { Salary, SalaryData, SalaryDataNameKeys } from '@jobvalue/salaries';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import { apiBaseUrl } from './index';

export const salaryDiff = (mine, other): number => (mine - other) / other;

export const salaryBySenses = (state) => {
  const { salary } = state;
  return groupBy(salary.items, 'sense_id');
};

export const salaryForChartCompactMode = (
  salaries: Array<Salary>,
  mySalary?: { abs: number; ats: number; var?: number },
  jobOffer?: { abs: number; ats: number; var?: number },
  curves = [
    { name: 'Minimo', key: 'Perc10' },
    { name: 'Medio', key: 'Average' },
    { name: 'Massimo', key: 'Perc90' },
  ],
) => salaryForChart(salaries, 0, mySalary, jobOffer, curves);

export const salaryForChart = (
  salaries: Array<Salary>,
  /** In case of PRO payment data, at 0 we have the national curve, at 1 we have the detailed one */
  salariesIndex: number,
  mySalary?: { abs: number; ats: number; var?: number },
  jobOffer?: { abs: number; ats: number; var?: number },
  curves = [
    // { name: 'Media', key: 'average' },
    { name: '1° Decile', key: 'Perc10' },
    { name: '1° Quartile', key: 'Perc25' },
    { name: 'Mediana', key: 'Perc50' },
    { name: '3° Quartile', key: 'Perc75' },
    { name: '9° Decile', key: 'Perc90' },
  ],
): SalaryData[] => {
  const out = curves.map((legend) => {
    const res: {
      name: SalaryDataNameKeys;
      ats?: number;
      abs?: number;
      varValue?: number;
      color?: string;
    } = {
      name: legend.name as SalaryDataNameKeys,
    };
    const foo = salaries.filter((s) => !s.codesense_id && !s.sense_id)[
      salariesIndex
    ];
    res.ats = foo[`ats${legend.key}`];
    res.abs = foo[`abs${legend.key}`];
    res.varValue = foo[`varValue${legend.key}`];
    return res;
  });
  if (mySalary) {
    out.push({
      name: 'Tu' as SalaryDataNameKeys,
      ats: mySalary.ats,
      abs: mySalary.abs,
      var: mySalary.var,
    });
  }
  if (jobOffer) {
    out.push({
      name: 'Offerta' as SalaryDataNameKeys,
      ats: jobOffer.ats,
      abs: jobOffer.abs,
      var: mySalary.var,
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
