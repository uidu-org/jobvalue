import { UserProfileProps } from '..';

export const mockUser: UserProfileProps = {
  email: 'andrea.vanini@uidu.org',
  job: {
    id: 1,
    name: 'Web developer',
    description:
      "Ha la responsabilità di presidiare i rischi legali dell'azienda, secondo le indicazioni della direzione; costituisce il punto di riferimento di tutte le tematiche di natura legale, coordinando un team di risorse interne ed esterne. Di norma è un dirigente di una grande impresa.",
  },
  industry: {
    id: 24,
    name: 'Media, web, comunicazione ed editoria',
  },
  functionalArea: {
    id: 10,
    name: 'Marketing e comunicazione',
  },
  province: 'BG',
  seniority: 'da 5 a 10 anni',
  birthdate: 1987,
  gender: 'Maschio',
  qualification: 'Laurea magistrale',
  inq: 'Quadro',
  mySalary: {
    months: 13,
    abs: 18000,
    addToAbs: 10000,
    ats: 28000,
    absMonthly: 1200,
    partTimePerc: null,
  },
};
