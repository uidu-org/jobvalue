import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { am4themesJobValue, toEur, toPerc } from '@jobvalue/utils';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { JobSalarySummaryProps } from '../types';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

export default class JobSalarySummary extends PureComponent<
  JobSalarySummaryProps
> {
  private chart: am4charts.PieChart = undefined;
  private uuid = uuid();

  static defaultProps = {
    isAutonomous: false,
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { mySalary, isAutonomous } = this.props;
    if (!this.chart && !isAutonomous) {
      const chart = am4core.create(this.uuid, am4charts.PieChart);
      // const chart = am4core.create(this.uuid, am4charts.TreeMap);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      // chart.paddingTop = 5;
      // chart.paddingLeft = 5;
      // chart.paddingRight = 5;
      // chart.paddingBottom = 5;
      chart.tooltip.disabled = true;

      chart.data = [
        {
          country: 'RAL',
          value: mySalary.ral,
        },
        {
          country: 'Var',
          value: mySalary.addToRal,
        },
      ];
      chart.radius = am4core.percent(70);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.category = 'country';
      series.dataFields.value = 'value';
      series.slices.template.cornerRadius = 10;
      series.slices.template.innerCornerRadius = 7;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;

      this.chart = chart;
    }
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const { mySalary, isAutonomous } = this.props;
    return (
      <>
        {!isAutonomous && (
          <div
            id={this.uuid}
            className="bg-light"
            style={{ width: '100%', height: 200 }}
          />
        )}
        <table className="table mb-0">
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
            {!isAutonomous && (
              <tr>
                <th scope="row">
                  RAL <small>Retribuzione annua lorda</small>
                </th>
                <th scope="row" className="text-right text-nowrap">
                  {toEur(mySalary.ral)}
                </th>
              </tr>
            )}
            {mySalary.addToRal && (
              <>
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
              </>
            )}
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
