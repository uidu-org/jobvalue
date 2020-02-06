import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { toEur, toPerc } from '@jobvalue/utils';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

export default class JobSalarySummary extends PureComponent<any> {
  private chart: am4charts.PieChart = undefined;
  private uuid = uuid();

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { mySalary } = this.props;
    if (!this.chart) {
      const chart = am4core.create(this.uuid, am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.paddingTop = 0;
      chart.paddingBottom = 0;

      chart.data = [
        {
          country: 'Lithuania',
          value: 401,
        },
        {
          country: 'Czech Republic',
          value: 300,
        },
        {
          country: 'Ireland',
          value: 200,
        },
      ];
      chart.radius = am4core.percent(70);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = 'value';
      series.dataFields.category = 'country';

      series.slices.template.cornerRadius = 10;
      series.slices.template.innerCornerRadius = 7;
      series.slices.template.draggable = true;
      series.slices.template.inert = true;
      series.alignLabels = false;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;

      // chart.legend = new am4charts.Legend();
      this.chart = chart;
    }
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const { mySalary } = this.props;
    return (
      <>
        <div
          id={this.uuid}
          className="bg-light"
          style={{ width: '100%', height: 200 }}
        />
        <table className="table">
          <tbody>
            <tr>
              <th scope="row" colSpan={2}>
                La tua retribuzione
              </th>
            </tr>
            {/* <tr>
              <td className="font-weight-light">
                Retribuzione fissa mensile lorda
              </td>
              <td className="font-weight-light">{toEur(mySalary.ralMonthly)}</td>
            </tr>
            <tr>
              <td className="font-weight-light">Mensilità</td>
              <td className="font-weight-light">{mySalary.months}</td>
            </tr> */}
            <tr>
              <th scope="row">RAL - Retribuzione annua lorda</th>
              <th scope="row">{toEur(mySalary.ral)}</th>
            </tr>
            <tr>
              <td>Retribuzione variabile percepita nell'ultimo anno</td>
              <td>{toEur(mySalary.addToRal)}</td>
            </tr>
            <tr>
              <td>Retribuzione variabile in %</td>
              <td>{toPerc(mySalary.addToRal / mySalary.ral)}</td>
            </tr>
            <tr>
              <th scope="row">RGA - Retribuzione globale annua</th>
              <th scope="row">{toEur(mySalary.rga)}</th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
