const closestReducer = (g) => (a, b) =>
  Math.abs(g - a) < Math.abs(g - b) ? a : b;

export const closest = (array, num) => array.reduce(closestReducer(num));

export const manipulateSalariesData = (salaries, mySalary) => {
  const valueData = salaries.map((d) => d.value);
  // salaries is an array
  const previousPercentage =
    salaries[valueData.indexOf(closest(valueData, mySalary))].percentage;

  return [
    {
      category: 'A',
      value: salaries[0].value,
      lessThan: previousPercentage,
      greaterThan: 100 - previousPercentage,
    },
  ];
  return salaries;
};
