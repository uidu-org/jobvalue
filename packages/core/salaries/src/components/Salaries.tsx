import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import { v4 as uuid } from 'uuid';
import { SalariesProps } from '../types';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;
am4core.options.commercialLicense = true;

export default class Salaries extends PureComponent<SalariesProps> {
  private chart: am4charts.XYChart = undefined;
  private uuid;

  constructor(props) {
    super(props);
    this.uuid = props.id || uuid();
  }

  static defaultProps = {
    colors: {
      abs: '#386da7',
      ats: '#f28d0e',
      varValue: '#f28d0e',
    },
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    const { salaryDataForChart } = this.props;
    this.drawChart();
    this.chart.data = salaryDataForChart;
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
      chart.paddingTop = compactMode ? 32 : 48;
      if (fullWidth) {
        chart.paddingRight = 0;
        chart.paddingLeft = 0;
      }
      chart.paddingBottom = 0;
      chart.data = salaryDataForChart;
      chart.responsive.enabled = true;

      chart.responsive.rules.push({
        relevant: function (target) {
          if (target.pixelWidth <= 400) {
            return true;
          }
          return false;
        },
        state: function (target, stateId) {
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
      valueAxis.renderer.grid.template.strokeOpacity = 0;

      if (series.includes('abs')) {
        const abs = chart.series.push(new am4charts.ColumnSeries());
        abs.dataFields.valueY = 'abs';
        abs.dataFields.categoryX = 'name';
        abs.tooltipText = '{valueY.key}';
        abs.columns.template.width = am4core.percent(100);
        abs.fillOpacity = 0.4;
        abs.fill = am4core.color(colors.abs);
        abs.stroke = am4core.color(colors.abs);
        abs.tooltipText = 'abs: [bold]{valueY}[/]';
        abs.columns.template.propertyFields.fill = 'color';
        // abs.columns.template.propertyFields.stroke = 'color';
        abs.columns.template.column.cornerRadius(3, 3, 0, 0);
        abs.columns.template.strokeOpacity = 0.5;

        abs.columns.template.adapter.add('fillOpacity', (fill, target) => {
          // @ts-ignore
          if (target.dataItem && target.dataItem.categoryX === 'Tu') {
            return 1;
          } else {
            return fill;
          }
        });

        abs.columns.template.adapter.add('fill', (fill, target) => {
          // @ts-ignore
          if (target.dataItem && target.dataItem.categoryX === 'Offerta') {
            return am4core.color('rgba(56,109,166,0.3)');
          } else {
            return fill;
          }
        });

        if (!series.includes('ats')) {
          abs.tooltip.disabled = true;
          var bullet = abs.bullets.push(new am4charts.LabelBullet());
          bullet.label.text = "€ {abs.formatNumber('#,###')}";
          bullet.label.fontSize = 14;
          bullet.dy = -16;
        }
      }

      if (series.includes('ats')) {
        const ats = chart.series.push(new am4charts.ColumnSeries());
        ats.dataFields.valueY = 'ats';
        ats.dataFields.categoryX = 'name';
        ats.tooltipText = '{valueY.key}';
        ats.columns.template.width = am4core.percent(100);
        ats.fill = am4core.color(colors.ats);
        ats.fillOpacity = 0.4;
        ats.stroke = am4core.color(colors.ats);
        ats.tooltipText = 'ats: [bold]{valueY}[/]';
        ats.columns.template.propertyFields.fill = 'color';
        // ats.columns.template.propertyFields.stroke = 'color';
        ats.columns.template.column.cornerRadius(3, 3, 0, 0);
        ats.columns.template.strokeOpacity = 0.5;

        ats.columns.template.adapter.add('fillOpacity', (fill, target) => {
          // @ts-ignore
          if (target.dataItem && target.dataItem.categoryX === 'Tu') {
            return 1;
          } else {
            return fill;
          }
        });

        ats.columns.template.adapter.add('fill', (fill, target) => {
          // @ts-ignore
          if (target.dataItem && target.dataItem.categoryX === 'Offerta') {
            return am4core.color('rgba(242,141,12,0.15)');
          } else {
            return fill;
          }
        });

        if (!series.includes('abs')) {
          ats.tooltip.disabled = true;
          var bullet = ats.bullets.push(new am4charts.LabelBullet());
          bullet.label.text = "€ {ats.formatNumber('#,###')}";
          bullet.label.fontSize = 14;
          bullet.dy = -16;
        }
      }

      if (series.includes('varValue')) {
        const varValue = chart.series.push(new am4charts.ColumnSeries());
        varValue.dataFields.valueY = 'varValue';
        varValue.dataFields.categoryX = 'name';
        varValue.tooltipText = '{valueY.key}';
        varValue.columns.template.width = am4core.percent(100);
        varValue.fill = am4core.color(colors.varValue);
        varValue.fillOpacity = 0.4;
        varValue.stroke = am4core.color(colors.varValue);
        varValue.tooltipText = 'varValue: [bold]{valueY}[/]';
        varValue.columns.template.propertyFields.fill = 'color';
        // ats.columns.template.propertyFields.stroke = 'color';
        varValue.columns.template.column.cornerRadius(3, 3, 0, 0);
        varValue.columns.template.strokeOpacity = 0.5;
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

    return (
      <>
        {salaryDataForChart ? (
          <div>
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
