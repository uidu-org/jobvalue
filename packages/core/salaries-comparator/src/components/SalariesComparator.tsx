import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { manipulateSalariesData } from '../utils';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

function createGrid(valueAxis: am4charts.ValueAxis, value, text) {
  let range = valueAxis.axisRanges.create();
  range.value = value;
  range.label.text = `${text}`;
  range.grid.disabled = true;
}

export default class SalariesComparator extends PureComponent<any> {
  private chart: am4charts.XYChart = undefined;
  private uuid = uuid();

  static defaultProps = {
    height: 64,
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  createSeries = (chart: am4charts.XYChart, field, name, color) => {
    console.log(chart.series);
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.name = name;
    series.dataFields.valueX = field;
    series.dataFields.categoryY = 'category';
    series.dataFields.valueXShow = 'totalPercent';
    series.dataItems.template.locations.categoryY = 0.5;
    series.sequencedInterpolation = true;

    // Make it stacked
    series.stacked = true;

    // Configure columns
    series.columns.template.width = am4core.percent(60);
    series.columns.template.fill = am4core.color(color);
    series.columns.template.strokeWidth = 0;
    // series.columns.template.tooltipText =
    //   '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}';

    let label = series.columns.template.createChild(am4core.Label);
    label.text = '{valueX}%';
    label.fontWeight = 'bold';
    label.align = 'center';
    label.valign = 'middle';
    label.zIndex = 2;
    label.fill = am4core.color('#000');
    label.strokeWidth = 0;

    let bullet = series.columns.template.createChild(am4core.Circle);
    // bullet.locationY = 0.5;
    bullet.align = 'center';
    bullet.valign = 'middle';
    bullet.fill = am4core.color('#fff');
    bullet.strokeWidth = 0;
    bullet.fillOpacity = 0.3;
    bullet.radius = 20;
  };

  drawChart = () => {
    const { salaryDataForChart, mySalary } = this.props;

    const data = manipulateSalariesData(salaryDataForChart, mySalary);

    console.log(data);

    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.paddingRight = 0;
      chart.paddingLeft = 0;
      chart.data = data;
      chart.maskBullets = true;
      chart.responsive.enabled = true;

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      //valueAxis.title.text = "Litres sold (M)";

      // createGrid(valueAxis, 0, 'Minimo');
      // createGrid(valueAxis, data[99].value, 'Massimo');

      this.createSeries(chart, 'lessThan', 'Minimo', 'rgba(243, 141, 13, .7)');
      this.createSeries(
        chart,
        'greaterThan',
        'MAssimo',
        'rgba(56, 109, 166, .7)',
      );

      // const series = chart.series.push(new am4charts.ColumnSeries());
      // series.fillOpacity = 0.3;
      // series.dataFields.categoryY = 'category';
      // series.dataFields.valueX = 'percentageX';

      // const series2 = chart.series.push(new am4charts.ColumnSeries());
      // series2.fillOpacity = 0.3;
      // series2.dataFields.categoryY = 'category';
      // series2.dataFields.valueX = 'percentageY';

      // series.stacked = true;
      // series2.stacked = true;
      // series.sequencedInterpolation = true;
      // series2.sequencedInterpolation = true;

      // var columnTemplate = series.columns.template;

      // var bullet = columnTemplate.createChild(am4charts.CircleBullet);
      // bullet.locationX = 0.5;
      // bullet.locationY = 0.5;
      // bullet.circle.radius = 30;
      // bullet.valign = 'middle';
      // bullet.align = 'center';
      // bullet.isMeasured = true;
      // // // bullet.mouseEnabled = false;
      // bullet.verticalCenter = 'bottom';
      // bullet.interactionsEnabled = false;
      // series.tensionY = 1;
      // const previousPercentage =
      //   data[
      //     valueData.indexOf(
      //       closest(
      //         data.map(d => d.value),
      //         mySalary,
      //       ),
      //     )
      //   ].percentage;

      // const previousRange = valueAxis.createSeriesRange(series);
      // previousRange.value = data[0].value;
      // previousRange.endValue = mySalary;
      // previousRange.contents.stroke = am4core.color('#396478');
      // previousRange.contents.fill = previousRange.contents.stroke;
      // previousRange.contents.fillOpacity = 0.3;
      // previousRange.label.disabled = false;
      // previousRange.label.inside = true;
      // previousRange.label.text = `${previousPercentage}%`;

      // const rangeGuide = valueAxis.axisRanges.create();
      // rangeGuide.value = mySalary;
      // rangeGuide.grid.stroke = am4core.color('#A96478');
      // rangeGuide.grid.strokeWidth = 2;
      // rangeGuide.grid.strokeOpacity = 1;
      // rangeGuide.label.text = 'La mia RGA\n{value}';
      // rangeGuide.label.location = 0.5;
      // rangeGuide.label.fill = rangeGuide.grid.stroke;

      // const nextRange = valueAxis.createSeriesRange(series);
      // nextRange.value = mySalary;
      // nextRange.endValue = data[99].value;
      // // nextRange.contents.stroke = am4core.color('#396478');
      // nextRange.contents.fill = nextRange.contents.stroke;
      // nextRange.contents.fillOpacity = 0.3;
      // nextRange.label.disabled = false;
      // nextRange.label.inside = true;
      // nextRange.label.text = `${100 - previousPercentage}%`;
    }
  };

  render() {
    const { salaryDataForChart, height } = this.props;

    return (
      <>
        {salaryDataForChart ? (
          <div style={{ overflowX: 'auto' }}>
            <div id={this.uuid} style={{ width: '100%', height: height }} />
          </div>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: height }}
          >
            <Spinner />
          </div>
        )}
      </>
    );
  }
}
