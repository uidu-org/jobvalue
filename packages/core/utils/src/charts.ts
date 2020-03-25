import * as am4core from '@amcharts/amcharts4/core';

export function am4themesJobValue(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [
      // am4core.color('#f28d0e', 0.7),
      am4core.color('#386da7', 0.7),
    ];
    target.saturation = 1;
    target.stepOptions = {
      hue: 0.2,
      lightness: 50,
      lighten: 50,
      // saturation: 1,
    };
  }
}
