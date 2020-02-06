import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

const manipulate = ({ labourCost, mySalary, isAutonomous }) => {
  return labourCost.reduce((res, item) => {
    res.push({
      color: 'rgb(243, 141, 13)',
      name: 'Costo Azienda',
      open: 0,
      value: isAutonomous ? mySalary : item.yearlyCompany,
      stepValue: isAutonomous ? mySalary : item.yearlyCompany,
      displayValue: isAutonomous ? mySalary : item.yearlyCompany,
    });
    res.push({
      color: 'rgba(56, 109, 166, .7)',
      name: 'Costo del lavoro',
      open: isAutonomous ? item.yearlyGross : mySalary,
      value: isAutonomous ? mySalary : item.yearlyCompany,
      stepValue: isAutonomous ? item.yearlyGross : mySalary,
      displayValue: isAutonomous
        ? mySalary - item.yearlyGross
        : item.yearlyCompany - mySalary,
    });
    res.push({
      color: 'rgba(56, 109, 166, .7)',
      name: 'Retribuzione Annua Lorda',
      open: 0,
      value: isAutonomous ? item.yearlyGross : mySalary,
      displayValue: isAutonomous ? item.yearlyGross : mySalary,
      stepValue: isAutonomous ? item.yearlyGross : mySalary,
    });
    res.push({
      color: 'rgba(56, 109, 166, .3)',
      name: 'Imposte sul lavoro',
      open: item.yearlyNet,
      value: isAutonomous ? item.yearlyGross : mySalary,
      displayValue:
        (isAutonomous ? item.yearlyGross : mySalary) - item.yearlyNet,
      stepValue: item.yearlyNet,
    });
    res.push({
      color: 'rgba(56, 109, 166, .3)',
      name: 'Retribuzione Annua Netta',
      open: 0,
      value: item.yearlyNet,
      displayValue: item.yearlyNet,
      stepValue: item.yearlyNet,
    });
    return res;
  }, []);
};

export default class LabourCostChart extends PureComponent<any> {
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
    console.log(labourCost);
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
    const {
      labourCost,
      substituteKey,
      substituteWith,
      isAutonomous,
    } = this.props;

    if (!labourCost.length) {
      return null;
    }

    const labourCostWithCorrectedValues = labourCost;
    labourCostWithCorrectedValues[0][substituteKey] = substituteWith;

    return (
      <>
        {labourCost ? (
          <div style={{ overflowX: 'auto' }}>
            <div id={this.uuid} style={{ width: '100%', height: 350 }} />
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '400px' }}
          >
            <Spinner />
          </div>
        )}
      </>
    );
  }
}
