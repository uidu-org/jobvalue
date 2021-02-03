import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { am4themesJobValue, toEur, toPerc } from '@jobvalue/utils';
import React, { PureComponent } from 'react';
import { v4 as uuid } from 'uuid';
import { JobSalarySummaryProps } from '../types';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

export default class JobSalarySummary extends PureComponent<
  JobSalarySummaryProps
> {
  private chart: am4charts.PieChart = undefined;
  private uuid;

  constructor(props) {
    super(props);
    this.uuid = props.id || uuid();
  }

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
      chart.language.locale = am4lang_it_IT;
      // const chart = am4core.create(this.uuid, am4charts.TreeMap);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      // chart.paddingTop = 5;
      // chart.paddingLeft = 5;
      // chart.paddingRight = 5;
      // chart.paddingBottom = 5;
      chart.tooltip.disabled = true;
      const data = [
        {
          category: 'RAL',
          value: mySalary.abs,
        },
      ];
      if (mySalary.addToAbs) {
        data.push({
          category: 'VAR',
          value: mySalary.addToAbs,
        });
      }
      chart.data = data;
      chart.radius = am4core.percent(70);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;

      let series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.category = 'category';
      series.dataFields.value = 'value';
      series.slices.template.cornerRadius = 10;
      series.slices.template.innerCornerRadius = 7;

      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;
      series.ticks.template.disabled = true;
      series.alignLabels = false;
      series.labels.template.fontSize = 14;
      series.labels.template.textAlign = 'middle';
      series.labels.template.text =
        "[bold]{category}[/]\n{value.percent.formatNumber('#.0')}%";
      series.labels.template.radius = am4core.percent(-20);
      series.labels.template.fill = am4core.color('white');

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
              <td className="font-weight-light">{toEur(mySalary.absMonthly)}</td>
            </tr>
            <tr>
              <td className="font-weight-light">Mensilità</td>
              <td className="font-weight-light">{mySalary.months}</td>
            </tr> */}
            {!isAutonomous && (
              <tr>
                <th scope="row">
                  abs <small>Retribuzione annua lorda</small>
                </th>
                <th scope="row" className="text-right text-nowrap">
                  {toEur(mySalary.abs)}
                </th>
              </tr>
            )}
            {mySalary.addToAbs && (
              <>
                <tr>
                  <td>Retribuzione variabile (€)</td>
                  <td className="text-right text-nowrap">
                    {toEur(mySalary.addToAbs)}
                  </td>
                </tr>
                <tr>
                  <td>Retribuzione variabile (% su abs)</td>
                  <td className="text-right text-nowrap">
                    {toPerc(mySalary.addToAbs / mySalary.abs)}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <th scope="row">
                RGA <small>Retribuzione globale annua</small>
              </th>
              <th scope="row" className="text-right text-nowrap">
                {toEur(mySalary.ats)}
              </th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
