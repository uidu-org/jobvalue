import { Salary } from '@jobvalue/salaries';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import { apiBaseUrl } from '..';

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
) => salaryForChart(salaries, mySalary, jobOffer, curves);

export const salaryForChart = (
  salaries: Array<Salary>,
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
) => {
  const out = curves.map((legend) => {
    const res: { name: string; rga?: number; ral?: number; color?: string } = {
      name: legend.name,
    };
    const foo = salaries.filter((s) => !s.codesense_id && !s.sense_id)[0];
    res.rga = foo[`ex_rga_${legend.key}`];
    res.ral = foo[`ex_ral_${legend.key}`];
    return res;
  });
  if (mySalary) {
    out.push({
      name: 'Tu',
      rga: mySalary.rga,
      ral: mySalary.ral,
    });
  }
  if (jobOffer) {
    out.push({
      name: 'Offerta',
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
