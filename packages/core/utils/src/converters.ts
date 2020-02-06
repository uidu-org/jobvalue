export const calculateAge = (birthDate: number) => {
  const today = new Date();
  const age = today.getFullYear() - birthDate;
  return age;
};

export const ageRange = age => {
  if (age <= 24) {
    return '15-24 anni';
  }

  if (age <= 34) {
    return '25-34 anni';
  }

  if (age <= 44) {
    return '35-44 anni';
  }

  if (age <= 54) {
    return '45-54 anni';
  }

  return '55 anni e più';
};

export const ageRangeFromBirthdate = (birthdate: number) => {
  return ageRange(calculateAge(birthdate));
};
