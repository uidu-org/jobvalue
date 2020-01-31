import numeral from 'numeral';
import 'numeral/locales/it';

numeral.locale('it');

export const toEur = val => numeral(val).format('$ 0,0');
export const toK = val => numeral(val).format('0a');
export const toValue = val => numeral(val).format('0,0');
export const toPerc = val => numeral(val).format('0%');
