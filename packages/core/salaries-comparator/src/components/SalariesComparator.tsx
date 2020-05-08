import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { am4themesJobValue } from '@jobvalue/utils';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import { manipulateSalariesData } from '../utils';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

function createGrid(valueAxis: am4charts.ValueAxis, value, text) {
  let range = valueAxis.axisRanges.create();
  range.value = value;
  range.label.text = `${text}`;
  range.grid.disabled = true;
}

export default class SalariesComparator extends PureComponent<any> {
  private chart: am4charts.XYChart = undefined;
  private uuid;

  constructor(props) {
    super(props);
    this.uuid = props.id || uuid();
  }

  static defaultProps = {
    height: 128,
  };

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

  createSeries = (
    chart: am4charts.XYChart,
    data,
    valueAxis: am4charts.ValueAxis,
    field,
    name,
    color,
  ) => {
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
    series.columns.template.height = 24;
    // series.columns.template.fill = am4core.color(color);
    // series.columns.template.stroke = am4core.color(color);
    series.columns.template.fillOpacity = 0.6;
    // series.columns.template.strokeWidth = 0;
    if (field === 'lessThan') {
      series.columns.template.column.cornerRadius(3, 0, 3, 0);
    } else {
      series.columns.template.column.cornerRadius(0, 3, 0, 3);
    }
    // series.columns.template.tooltipText =
    //   '[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}';

    let label = series.columns.template.createChild(am4core.Label);
    label.text = name;
    label.align = field === 'lessThan' ? 'left' : 'right';
    label.valign = 'bottom';
    label.zIndex = 2;
    label.fontSize = 14;
    label.fill = am4core.color('#000');
    label.strokeWidth = 0;
    label.dx = field === 'lessThan' ? -24 : 24;
    label.dy = 24;

    // percentage
    let percentage_range = valueAxis.axisRanges.create();
    percentage_range.value = data[0].lessThan;
    percentage_range.label.valign = 'top';
    percentage_range.label.fontWeight = 'bold';
    percentage_range.label.text = `${data[0][field]}%`;
    percentage_range.label.disabled = false;
    percentage_range.label.rotation = 0;
    percentage_range.label.dy = 16;
    percentage_range.label.wrap = false;
    percentage_range.label.fontSize = 14;
    if (field === 'lessThan') {
      percentage_range.label.dx = data[0][field] > 10 ? -56 : -48;
    } else {
      percentage_range.label.dx = data[0][field] > 10 ? 56 : 48;
    }
    // percentage_range.label.fill = am4core.color('#0c0');
    percentage_range.label.adapter.add('horizontalCenter', function () {
      return field === 'lessThan' ? 'left' : 'right';
    });

    percentage_range.grid.above = true;
    percentage_range.grid.stroke = am4core.color('#000');
    percentage_range.grid.strokeWidth = 2;
    percentage_range.grid.strokeOpacity = 1;

    var pin = new am4plugins_bullets.PinBullet();
    percentage_range.bullet = pin;

    // Configure
    pin.dy = -74;
    pin.layout = 'none';
    pin.valign = 'top';
    pin.horizontalCenter = 'left';
    pin.background.pointerAngle = 90;
    pin.background.pointerBaseWidth = 10;
    pin.background.pointerY = 10;
    pin.background.radius = 14;
    pin.background.fill = am4core.color('#868e96');
    pin.label = new am4core.Label();
    pin.label.fontSize = 14;

    pin.label.text = 'Tu';
    // pin.image = new am4core.Image();
    // pin.image.href =
    //   'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/cat.png';
  };

  drawChart = () => {
    const { salaryDataForChart, mySalary } = this.props;

    const data = manipulateSalariesData(salaryDataForChart, mySalary);

    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;
      chart.paddingTop = 0;
      chart.paddingBottom = 0;
      chart.paddingRight = 0;
      chart.paddingLeft = 0;
      chart.data = data;
      chart.maskBullets = true;
      chart.responsive.enabled = true;

      // chart.exporting.menu = new am4core.ExportMenu();
      // let options = chart.exporting.getFormatOptions('jpg');
      // options.keepTainted = true;

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.disabled = true;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = -20;
      valueAxis.max = 120;
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      //valueAxis.title.text = "Litres sold (M)";

      // createGrid(valueAxis, 0, 'Minimo');
      // createGrid(valueAxis, data[99].value, 'Massimo');

      this.createSeries(
        chart,
        data,
        valueAxis,
        'lessThan',
        'Meno di me',
        '#386da7',
      );
      this.createSeries(
        chart,
        data,
        valueAxis,
        'greaterThan',
        'Più di me',
        '#f28d0e',
      );
      this.chart = chart;
    }
  };

  render() {
    const { salaryDataForChart, height } = this.props;

    return (
      <>
        {salaryDataForChart ? (
          <div>
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
