import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

function createGrid(valueAxis: am4charts.ValueAxis, value, text) {
  let range = valueAxis.axisRanges.create();
  range.value = value;
  range.label.text = `${text}`;
  range.grid.disabled = true;
}

function closest(array, num) {
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
}

export default class SalariesComparator extends PureComponent<any> {
  private chart: am4charts.XYChart = undefined;
  private uuid = uuid();

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { salaryDataForChart, mySalary } = this.props;

    const data = this.transformData(salaryDataForChart);
    const valueData = data.map(d => d.value);

    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.paddingRight = 32;
      chart.paddingLeft = 32;
      chart.data = data;
      chart.responsive.enabled = true;

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'percentage';
      categoryAxis.renderer.disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.strictMinMax = true;
      valueAxis.logarithmic = true;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      //valueAxis.title.text = "Litres sold (M)";

      createGrid(valueAxis, 0, 'Minimo');
      createGrid(valueAxis, data[99].value, 'Massimo');

      const series = chart.series.push(new am4charts.LineSeries());
      series.fillOpacity = 0.3;
      series.dataFields.categoryY = 'percentage';
      series.dataFields.valueX = 'value';
      series.tensionY = 1;
      const previousPercentage =
        data[
          valueData.indexOf(
            closest(
              data.map(d => d.value),
              mySalary,
            ),
          )
        ].percentage;

      const previousRange = valueAxis.createSeriesRange(series);
      previousRange.value = data[0].value;
      previousRange.endValue = mySalary;
      previousRange.contents.stroke = am4core.color('#396478');
      previousRange.contents.fill = previousRange.contents.stroke;
      previousRange.contents.fillOpacity = 0.3;
      previousRange.label.disabled = false;
      previousRange.label.inside = true;
      previousRange.label.text = `${previousPercentage}%`;

      const rangeGuide = valueAxis.axisRanges.create();
      rangeGuide.value = mySalary;
      rangeGuide.grid.stroke = am4core.color('#A96478');
      rangeGuide.grid.strokeWidth = 2;
      rangeGuide.grid.strokeOpacity = 1;
      rangeGuide.label.text = 'La mia RGA\n{value}';
      rangeGuide.label.location = 0.5;
      rangeGuide.label.fill = rangeGuide.grid.stroke;

      const nextRange = valueAxis.createSeriesRange(series);
      nextRange.value = mySalary;
      nextRange.endValue = data[99].value;
      // nextRange.contents.stroke = am4core.color('#396478');
      nextRange.contents.fill = nextRange.contents.stroke;
      nextRange.contents.fillOpacity = 0.3;
      nextRange.label.disabled = false;
      nextRange.label.inside = true;
      nextRange.label.text = `${100 - previousPercentage}%`;
    }
  };

  transformData(data: any): any {
    for (let i = 0; i < data.length; i++) {
      if (data[i].percentage > 50 && data[i].percentage <= 100) {
        data[i].percentage = 100 - data[i].percentage + 1;
      }
    }
    console.log(data);
    return data;
  }

  render() {
    const { salaryDataForChart } = this.props;

    return (
      <>
        {salaryDataForChart ? (
          <div style={{ overflowX: 'auto' }}>
            <div id={this.uuid} style={{ width: '100%', height: 300 }} />
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
