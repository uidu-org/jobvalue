import * as am4core from '@amcharts/amcharts4/core';

export function am4themesJobValue(target) {
  if (target instanceof am4core.ColorSet) {
    target.list = [am4core.color('#386da7'), am4core.color('#f28d0e')];
    target.saturation = 1;
    target.reuse = false;
    target.minLightness = 0.2;
    target.maxLightness = 0.7;
    target.stepOptions = {
      // hue: 0.08,
      brighten: 0.4,
      lightness: 0.8,
      // lighten: 15,
      saturation: 0.5,
    };
  }
}
