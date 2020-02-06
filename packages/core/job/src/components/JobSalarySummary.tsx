import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { toEur, toPerc } from '@jobvalue/utils';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

export default class JobSalarySummary extends PureComponent<any> {
  private chart: am4charts.TreeMap = undefined;
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
      const chart = am4core.create(this.uuid, am4charts.TreeMap);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.paddingTop = 5;
      chart.paddingLeft = 5;
      chart.paddingRight = 5;
      chart.paddingBottom = 5;
      chart.tooltip.disabled = true;

      chart.data = [
        {
          country: 'Lithuania',
          value: 401,
        },
        {
          country: 'Czech Republic',
          value: 300,
        },
      ];
      //  chart.radius = am4core.percent(70);
      //  chart.innerRadius = am4core.percent(40);
      //  chart.startAngle = 180;
      //  chart.endAngle = 360;

      chart.dataFields.value = 'value';
      chart.dataFields.name = 'country';

      var level1 = chart.seriesTemplates.create('0');
      level1.tooltip.disabled = true;

      var level1_column = level1.columns.template;
      level1_column.column.cornerRadius(10, 10, 10, 10);
      level1_column.fillOpacity = 0.8;
      level1_column.stroke = am4core.color('#f8f9fa');
      level1_column.strokeWidth = 10;
      level1_column.strokeOpacity = 1;

      let level1_bullet = level1.bullets.push(new am4charts.LabelBullet());
      level1_bullet.locationY = 0.5;
      level1_bullet.locationX = 0.5;
      level1_bullet.label.text = '{name}\n{value}';
      level1_bullet.label.fill = am4core.color('#fff');

      // let series = chart.series.push(new am4charts.PieSeries());
      //  series.slices.template.cornerRadius = 10;
      //  series.slices.template.innerCornerRadius = 7;
      //  series.slices.template.draggable = true;
      //  series.slices.template.inert = true;
      //  series.alignLabels = false;

      //  series.hiddenState.properties.startAngle = 90;
      //  series.hiddenState.properties.endAngle = 90;

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
          style={{ width: '100%', height: 150 }}
        />
        <table className="table">
          <tbody>
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
              <th scope="row">
                RAL <small>Retribuzione annua lorda</small>
              </th>
              <th scope="row" className="text-right text-nowrap">
                {toEur(mySalary.ral)}
              </th>
            </tr>
            <tr>
              <td>Retribuzione variabile (€)</td>
              <td className="text-right text-nowrap">
                {toEur(mySalary.addToRal)}
              </td>
            </tr>
            <tr>
              <td>Retribuzione variabile (%)</td>
              <td className="text-right text-nowrap">
                {toPerc(mySalary.addToRal / mySalary.ral)}
              </td>
            </tr>
            <tr>
              <th scope="row">
                RGA <small>Retribuzione globale annua</small>
              </th>
              <th scope="row" className="text-right text-nowrap">
                {toEur(mySalary.rga)}
              </th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
