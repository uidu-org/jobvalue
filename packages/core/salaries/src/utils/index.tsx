import axios from 'axios';
import groupBy from 'lodash/groupBy';
import numeral from 'numeral';
import 'numeral/locales/it';
import { Salary } from '../types';

numeral.locale('it');

export const apiBaseUrl = {
  development: 'http://jpanalytics.local:5000',
  staging: 'https://jpanalytics.it',
  production: 'https://jpanalytics.it',
};
export const toEur = val => numeral(val).format('$ 0,0');

export const toK = val => numeral(val).format('0a');
export const toValue = val => numeral(val).format('0,0');

export const salaryBySenses = state => {
  const { salary } = state;
  return groupBy(salary.items, 'sense_id');
};

export const salaryForChart = (
  salaries: Array<Salary>,
  mySalary?: { ral: number; rga: number; color?: string },
) => {
  const out = [
    // { name: 'Media', key: 'average' },
    { name: '1° Decile', key: 'perc_10' },
    { name: '1° Quartile', key: 'perc_25' },
    { name: 'Mediana', key: 'perc_50' },
    { name: '3° Quartile', key: 'perc_75' },
    { name: '9° Decile', key: 'perc_90' },
  ].map(legend => {
    const res: { name: string; rga?: number; ral?: number; color?: string } = {
      name: legend.name,
    };
    const foo = salaries.filter(s => !s.codesense_id && !s.id)[0];
    res.rga = foo[`ex_rga_${legend.key}`];
    res.ral = foo[`ex_ral_${legend.key}`];
    return res;
  });
  if (mySalary) {
    out.push({
      name: 'Tu',
      rga: mySalary.rga,
      ral: mySalary.ral,
      color: mySalary.color,
    });
  }
  return out.sort((a, b) => a.rga - b.rga);
};

// Action creators
export const fetchSalary = ({ report }) => {
  const { classifications } = report;
  const industryApiId = classifications.filter(
    c => c.provider === 'Jobpricing_Industries',
  )[0].value;
  const jobApiId = classifications.filter(
    c => c.provider === 'Jobpricing_Jobs',
  )[0].value;
  const regionApiId = classifications.filter(
    c => c.provider === 'Jobpricing_Regions',
  )[0].value;
  return axios
    .get(
      `${apiBaseUrl[process.env.NODE_ENV]}/api/salaries/${jobApiId}-${
        report.inqId
      }/mot?token=jobpricing&size=${
        report.sizeId
      }&industry=${industryApiId}&region=${regionApiId}`,
    )
    .then(response => response.data);
};
