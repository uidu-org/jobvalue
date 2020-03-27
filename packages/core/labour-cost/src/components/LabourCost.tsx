import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { am4themesJobValue } from '@jobvalue/utils';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { LabourCostProps, LabourCostRecord } from '../types';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

const manipulate = ({
  labourCost,
  mySalary,
  isAutonomous,
}: {
  labourCost: LabourCostRecord;
  mySalary: number;
  isAutonomous: boolean;
}) => {
  const res = [];
  res.push({
    color: 'rgb(243, 141, 13)',
    name: 'Costo Azienda',
    open: 0,
    value: isAutonomous ? mySalary : labourCost.yearlyCompany,
    stepValue: isAutonomous ? mySalary : labourCost.yearlyCompany,
    displayValue: isAutonomous ? mySalary : labourCost.yearlyCompany,
  });
  res.push({
    color: 'rgba(56, 109, 166, .7)',
    name: 'Cuneo Fiscale Azienda',
    open: isAutonomous ? labourCost.yearlyGross : mySalary,
    value: isAutonomous ? mySalary : labourCost.yearlyCompany,
    stepValue: isAutonomous ? labourCost.yearlyGross : mySalary,
    displayValue: isAutonomous
      ? mySalary - labourCost.yearlyGross
      : labourCost.yearlyCompany - mySalary,
  });
  res.push({
    color: 'rgba(56, 109, 166, .7)',
    name: 'Retribuzione Annua Lorda',
    open: 0,
    value: isAutonomous ? labourCost.yearlyGross : mySalary,
    displayValue: isAutonomous ? labourCost.yearlyGross : mySalary,
    stepValue: isAutonomous ? labourCost.yearlyGross : mySalary,
  });
  res.push({
    color: 'rgba(56, 109, 166, .3)',
    name: 'Cuneo Fiscale Lavoratore',
    open: labourCost.yearlyNet,
    value: isAutonomous ? labourCost.yearlyGross : mySalary,
    displayValue:
      (isAutonomous ? labourCost.yearlyGross : mySalary) - labourCost.yearlyNet,
    stepValue: labourCost.yearlyNet,
  });
  res.push({
    color: 'rgba(56, 109, 166, .3)',
    name: 'Retribuzione Annua Netta',
    open: 0,
    value: labourCost.yearlyNet,
    displayValue: labourCost.yearlyNet,
    stepValue: labourCost.yearlyNet,
  });
  return res;
};

export default class LabourCostChart extends PureComponent<LabourCostProps> {
  private chart: am4charts.XYChart = undefined;
  private uuid = uuid();

  static defaultProps = {
    aspect: 2,
    className: 'mt-3 mb-4',
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { labourCost, fullWidth } = this.props;
    if (labourCost && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;
      if (fullWidth) {
        chart.paddingRight = 0;
        chart.paddingLeft = 0;
      }
      chart.paddingBottom = 0;
      chart.data = manipulate(this.props as any);
      chart.responsive.enabled = true;
      chart.maskBullets = false;

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.dataFields.category = 'name';
      categoryAxis.cursorTooltipEnabled = false;

      categoryAxis.renderer.inversed = true;

      const label = categoryAxis.renderer.labels.template;
      // label.disabled = true
      label.textAlign = 'middle';
      label.wrap = true;
      label.maxWidth = 120;
      label.fillOpacity = 0.3;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.extraMax = 0.02;
      if (fullWidth) {
        valueAxis.renderer.disabled = true;
      }
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.opposite = true;
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = '#a';
      valueAxis.renderer.baseGrid.strokeOpacity = 0;
      valueAxis.renderer.labels.template.fillOpacity = 0.3;
      valueAxis.renderer.grid.template.strokeOpacity = 0;

      const ral = chart.series.push(new am4charts.ColumnSeries());
      ral.dataFields.valueY = 'value';
      ral.dataFields.openValueY = 'open';
      ral.dataFields.categoryX = 'name';
      ral.tooltip.disabled = true;
      ral.fillOpacity = 0.5;
      ral.columns.template.strokeOpacity = 0.5;

      var bullet = ral.bullets.push(new am4charts.LabelBullet());
      bullet.label.text = "€ {displayValue.formatNumber('#,###')}";
      bullet.locationY = 0.5;
      // bullet.dx = 0;

      // bullet.label.horizontalCenter = 'center';
      bullet.label.truncate = false;
      bullet.label.hideOversized = false;

      ral.tooltipText = 'RAL: [bold]{valueX}[/]';
      ral.columns.template.propertyFields.fill = 'color';
      ral.columns.template.propertyFields.stroke = 'color';
      ral.columns.template.column.cornerRadius(3, 3, 3, 3);

      let stepSeries = chart.series.push(new am4charts.StepLineSeries());
      stepSeries.dataFields.categoryX = 'name';
      stepSeries.dataFields.valueY = 'stepValue';
      stepSeries.noRisers = true;
      stepSeries.stroke = am4core.color('#ccc');
      stepSeries.strokeDasharray = '3,3';
      stepSeries.startLocation = 0.1;
      stepSeries.endLocation = 1.1;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.xAxis = categoryAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.behavior = 'none';

      this.chart = chart;
    }
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const { labourCost } = this.props;

    if (labourCost) {
      return (
        <div style={{ overflowX: 'auto' }}>
          <div id={this.uuid} style={{ width: '100%', height: 350 }} />
        </div>
      );
    }

    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: '400px' }}
      >
        <Spinner />
      </div>
    );
  }
}
