import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { am4themesJobValue } from '@jobvalue/utils';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

export type ExVarProps = {
  mode: 'perc' | 'value';
  mySalary: {
    exVar: number;
    ral: number;
  };
  salaryDataForChart?: any;
};

export default class ExVar extends PureComponent<ExVarProps> {
  private chart: am4charts.XYChart;
  private uuid = uuid();

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  drawChart() {
    const { salaryDataForChart, mySalary, mode } = this.props;
    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;

      // Add data
      if (mode === 'value') {
        chart.data = [
          {
            name: 'VAR di mercato (€)',
            value:
              ((salaryDataForChart[1] as any).ex_var *
                (salaryDataForChart[1] as any).ex_ral_average) /
              100,
            color: 'rgb(243, 141, 13)',
          },
          {
            name: 'La tua VAR (€)',
            value: mySalary.exVar,
            color: 'rgba(56, 109, 166, .7)',
          },
        ];
      } else {
        chart.data = [
          {
            name: 'VAR di mercato (% RAL)',
            value: (salaryDataForChart[1] as any).ex_var,
            color: 'rgb(243, 141, 13)',
          },
          {
            name: 'La tua VAR (% RAL)',
            value: ((mySalary.exVar / mySalary.ral) * 100).toFixed(2),
            color: 'rgba(56, 109, 166, .7)',
          },
        ];
      }

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;
      categoryAxis.dataFields.category = 'name';
      categoryAxis.cursorTooltipEnabled = false;

      // categoryAxis.renderer.inversed = true;

      const label = categoryAxis.renderer.labels.template;
      label.wrap = true;
      label.width = 200;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.disabled = true;
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = '#a';
      // valueAxis.extraMax = 0.1;
      valueAxis.renderer.baseGrid.strokeOpacity = 0;
      valueAxis.renderer.labels.template.fillOpacity = 0.3;
      valueAxis.renderer.grid.template.strokeOpacity = 0.05;

      // Add and configure Series
      const ral = chart.series.push(new am4charts.ColumnSeries());
      ral.dataFields.valueX = 'value';
      ral.dataFields.categoryY = 'name';
      ral.columns.template.width = am4core.percent(100);
      ral.fillOpacity = 0.6;
      ral.fill = am4core.color('rgb(243, 141, 13)');
      ral.stroke = am4core.color('rgb(243, 141, 13)');
      // ral.tooltipText = 'RAL: [bold]{valueX}[/]';
      ral.columns.template.propertyFields.fill = 'color';
      ral.columns.template.propertyFields.stroke = 'color';
      ral.columns.template.column.cornerRadius(0, 3, 0, 3);
      ral.columns.template.strokeOpacity = 0.5;

      var bullet = ral.bullets.push(new am4charts.LabelBullet());
      if (mode === 'value') {
        bullet.label.text = "€ {valueX.formatNumber('#,###')}";
      } else {
        bullet.label.text = "% {valueX.formatNumber('#,###')}";
      }
      bullet.locationX = 1;
      bullet.dx = 8;

      bullet.label.horizontalCenter = 'left';
      bullet.label.truncate = false;
      bullet.label.hideOversized = false;

      this.chart = chart;
    }
  }

  render() {
    return (
      <>
        <div className="" id={this.uuid} style={{ height: 140 }}></div>
      </>
    );
  }
}
