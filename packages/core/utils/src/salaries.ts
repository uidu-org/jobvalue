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
  mySalary?: { ral: number; rga: number },
  jobOffer?: { ral: number; rga: number },
  curves = [
    { name: 'Minimo', key: 'perc_10' },
    { name: 'Medio', key: 'average' },
    { name: 'Massimo', key: 'perc_90' },
  ],
) => salaryForChart(salaries, 0, mySalary, jobOffer, curves);

export const salaryForChart = (
  salaries: Array<Salary>,
  /** In case of PRO payment data, at 0 we have the national curve, at 1 we have the detailed one */
  salariesIndex: number,
  mySalary?: { ral: number; rga: number },
  jobOffer?: { ral: number; rga: number },
  curves = [
    // { name: 'Media', key: 'average' },
    { name: '1° Decile', key: 'perc_10' },
    { name: '1° Quartile', key: 'perc_25' },
    { name: 'Mediana', key: 'perc_50' },
    { name: '3° Quartile', key: 'perc_75' },
    { name: '9° Decile', key: 'perc_90' },
  ],
): SalaryData[] => {
  const out = curves.map((legend) => {
    const res: {
      name: SalaryDataNameKeys;
      rga?: number;
      ral?: number;
      color?: string;
    } = {
      name: legend.name as SalaryDataNameKeys,
    };
    const foo = salaries.filter((s) => !s.codesense_id && !s.sense_id)[
      salariesIndex
    ];
    res.rga = foo[`ex_rga_${legend.key}`];
    res.ral = foo[`ex_ral_${legend.key}`];
    return res;
  });
  if (mySalary) {
    out.push({
      name: 'Tu' as SalaryDataNameKeys,
      rga: mySalary.rga,
      ral: mySalary.ral,
    });
  }
  if (jobOffer) {
    out.push({
      name: 'Offerta' as SalaryDataNameKeys,
      rga: jobOffer.rga,
      ral: jobOffer.ral,
    });
  }
  return out.slice().sort((a, b) => a.rga - b.rga);
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
