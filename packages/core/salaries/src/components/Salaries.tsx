import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { SalariesProps } from '../types';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

export default class Salaries extends PureComponent<SalariesProps> {
  private chart: am4charts.XYChart = undefined;
  private uuid = uuid();

  static defaultProps = {
    colors: {
      ral: '#386da7',
      rga: '#f28d0e',
    },
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const {
      salaryDataForChart,
      series,
      colors,
      fullWidth,
      compactMode,
    } = this.props;
    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;
      chart.paddingTop = compactMode ? 16 : 48;
      if (fullWidth) {
        chart.paddingRight = 0;
        chart.paddingLeft = 0;
      }
      chart.paddingBottom = 0;
      chart.data = salaryDataForChart;
      chart.responsive.enabled = true;

      chart.responsive.rules.push({
        relevant: function(target) {
          if (target.pixelWidth <= 400) {
            return true;
          }
          return false;
        },
        state: function(target, stateId) {
          if (target instanceof am4charts.Chart) {
            let state = target.states.create(stateId);
            state.properties.paddingTop = 0;
            state.properties.paddingRight = 0;
            state.properties.paddingBottom = 5;
            state.properties.paddingLeft = 0;
            return state;
          }
          return null;
        },
      });

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.renderer.cellStartLocation = 0.2;
      categoryAxis.renderer.cellEndLocation = 0.8;
      categoryAxis.dataFields.category = 'name';
      categoryAxis.cursorTooltipEnabled = false;

      const label = categoryAxis.renderer.labels.template;
      label.wrap = true;
      label.maxWidth = 120;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.cursorTooltipEnabled = false;
      if (fullWidth) {
        valueAxis.renderer.disabled = true;
      }
      valueAxis.renderer.opposite = true;
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = '#a';
      valueAxis.extraMax = series.length === 2 || compactMode ? 0.05 : 0.15;
      valueAxis.renderer.baseGrid.strokeOpacity = 0;
      valueAxis.renderer.labels.template.fillOpacity = 0.3;
      valueAxis.renderer.grid.template.strokeOpacity = 0.05;

      if (series.includes('ral')) {
        const ral = chart.series.push(new am4charts.ColumnSeries());
        ral.dataFields.valueY = 'ral';
        ral.dataFields.categoryX = 'name';
        ral.tooltipText = '{valueY.key}';
        ral.columns.template.width = am4core.percent(100);
        ral.fillOpacity = 0.6;
        ral.fill = am4core.color(colors.ral);
        ral.stroke = am4core.color(colors.ral);
        ral.tooltipText = 'RAL: [bold]{valueY}[/]';
        ral.columns.template.propertyFields.fill = 'color';
        ral.columns.template.propertyFields.stroke = 'color';
        ral.columns.template.column.cornerRadius(3, 3, 0, 0);
        ral.columns.template.strokeOpacity = 0.5;

        if (!series.includes('rga')) {
          ral.tooltip.disabled = true;
          var bullet = ral.bullets.push(new am4charts.LabelBullet());
          bullet.label.text = "€ {ral.formatNumber('#,###')}";
          bullet.dy = -16;
        }
      }

      if (series.includes('rga')) {
        const rga = chart.series.push(new am4charts.ColumnSeries());
        rga.dataFields.valueY = 'rga';
        rga.dataFields.categoryX = 'name';
        rga.tooltipText = '{valueY.key}';
        rga.columns.template.width = am4core.percent(100);
        rga.fill = am4core.color(colors.rga);
        rga.fillOpacity = 0.6;
        rga.stroke = am4core.color(colors.rga);
        rga.tooltipText = 'RGA: [bold]{valueY}[/]';
        rga.columns.template.propertyFields.fill = 'color';
        rga.columns.template.propertyFields.stroke = 'color';
        rga.columns.template.column.cornerRadius(3, 3, 0, 0);
        rga.columns.template.strokeOpacity = 0.5;

        if (!series.includes('ral')) {
          rga.tooltip.disabled = true;
          var bullet = rga.bullets.push(new am4charts.LabelBullet());
          bullet.label.text = "€ {ral.formatNumber('#,###')}";
          bullet.dy = -16;
        }
      }

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.xAxis = categoryAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.behavior = 'none';

      if (!compactMode) {
        this.createRange(
          categoryAxis,
          '1° Decile',
          '1° Decile',
          am4core.color('rgba(242, 141, 14, .3)'),
          'Sotto mercato',
        );
        this.createRange(
          categoryAxis,
          '1° Decile',
          '9° Decile',

          am4core.color('rgba(255, 255, 255, .5)'),
          'In linea con il mercato',
        );
        this.createRange(
          categoryAxis,
          '9° Decile',
          '9° Decile',
          am4core.color('rgba(242, 141, 14, .3)'),
          'Sopra mercato',
        );
      }

      this.chart = chart;
    }
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  createRange = (axis, from, to, color, label) => {
    const range = axis.axisRanges.create();
    range.category = from;
    range.endCategory = to;
    range.axisFill.fill = color;
    range.axisFill.fillOpacity = 0.2;
    range.label.text = label;
    range.label.wrap = false;
    // range.label.adapter.add('horizontalCenter', () => 'middle');
    // range.label.adapter.add('verticalCenter', () => 'top');
    range.label.valign = 'top';
    range.label.inside = true;
    range.grid.strokeOpacity = 0;
    range.label.dy = -40;
    // range.label.disabled = true;
  };

  render() {
    const { salaryDataForChart } = this.props;

    console.log(this.uuid);

    return (
      <>
        {salaryDataForChart ? (
          <div style={{ overflowX: 'auto' }}>
            <div id={this.uuid} style={{ width: '100%', height: 400 }} />
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
