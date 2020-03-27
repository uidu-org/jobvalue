export const closest = (array, num) => {
  var minDiff = 1000;
  var ans;
  for (let i = 0; i < array.length; i++) {
    var m = Math.abs(num - array[i]);
    if (m < minDiff) {
      minDiff = m;
      ans = array[i];
    }
  }
  return ans;
};

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
