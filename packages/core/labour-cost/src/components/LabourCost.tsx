import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { toEur } from '@jobvalue/utils';
import Spinner from '@uidu/spinner';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';

am4core.useTheme(am4themesAnimated);
am4core.options.commercialLicense = true;

const getPath = (x, y, width, height, offsetTop, offsetBottom) => {
  return `M${width / 2},${y}
          L${width},${y}
          L${width},${y + height}
          L${x},${y + height}
          L${x},${y}
          Z`;
};

const TriangleBar = props => {
  const { fill, x, y, width, height, offsetTop, offsetBottom } = props;
  return (
    <path
      d={getPath(x, y, width, height, offsetTop, offsetBottom)}
      stroke="#fff"
      fill={fill}
    />
  );
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

const renderCustomizedLabel = (props, text, unstackedValue) => {
  const { x, y, width, height } = props;

  return (
    <g>
      <text
        fontSize="14"
        x={x + 16}
        y={y + height / 2 - 8}
        fill="#343a40"
        textAnchor="left"
        fontWeight="400"
        dominantBaseline="middle"
      >
        {text}
      </text>
      <text
        fontSize="14"
        x={x + 16}
        y={y + height / 2 + 12}
        fill="#343a40"
        textAnchor="left"
        dominantBaseline="middle"
      >
        {toEur(unstackedValue)}
      </text>
    </g>
  );
};

const manipulate = ({ labourCost, mySalary, isAutonomous }) => {
  return labourCost.reduce((res, item) => {
    res.push({
      color: 'rgb(243, 141, 13)',
      name: 'Costo Azienda',
      value: isAutonomous ? mySalary : item.yearlyCompany,
    });
    res.push({
      color: 'rgba(56, 109, 166, .7)',
      name: 'Retribuzione Annua Lorda',
      value: isAutonomous ? item.yearlyGross : mySalary,
    });
    res.push({
      color: 'rgba(56, 109, 166, .3)',
      name: 'Retribuzione Annua Netta',
      value: item.yearlyNet,
    });
    return res;
  }, []);
};

export default class LabourCostChart extends PureComponent<any> {
  private chart: am4charts.XYChart = undefined;
  private uuid = uuid();
  
  static defaultProps = {
    aspect: 2,
  className: 'mt-3 mb-4',
  margin: { top: 0, right: 0, left: 0, bottom: 0 },
  }
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { labourCost, series, colors } = this.props;
    console.log(labourCost);
    if (labourCost && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;
      chart.paddingTop = 0;
      chart.paddingRight = 32;
      chart.paddingBottom = 0;
      chart.data = manipulate(this.props as any);
      chart.responsive.enabled = true;
      chart.maskBullets = false;

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.renderer.ticks.template.disabled = true;
      categoryAxis.dataFields.category = 'name';
      categoryAxis.cursorTooltipEnabled = false;

      categoryAxis.renderer.inversed = true;

      const label = categoryAxis.renderer.labels.template;
      label.disabled = true;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.renderer.baseGrid.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.opposite = true;
      valueAxis.numberFormatter = new am4core.NumberFormatter();
      valueAxis.numberFormatter.numberFormat = '#a';
      valueAxis.renderer.baseGrid.strokeOpacity = 0;
      valueAxis.renderer.labels.template.fillOpacity = 0.3;
      valueAxis.renderer.grid.template.strokeOpacity = 0;

      const ral = chart.series.push(new am4charts.ColumnSeries());
      ral.dataFields.valueX = 'value';
      ral.dataFields.categoryY = 'name';
      ral.tooltipText = '{valueX}';
      ral.tooltip.disabled = true;
      ral.columns.template.width = am4core.percent(3);
      ral.fillOpacity = 0.5;
      ral.columns.template.strokeOpacity = 0.5;

      var bullet = ral.bullets.push(new am4charts.LabelBullet());
      bullet.label.text = "[bold]{name}[/]\n€ {valueX.formatNumber('#,###')}";
      bullet.locationX = 1;
      bullet.dx = 16;

      bullet.label.horizontalCenter = 'left';
      bullet.label.truncate = false;
      bullet.label.hideOversized = false;

      ral.tooltipText = 'RAL: [bold]{valueX}[/]';
      ral.columns.template.propertyFields.fill = 'color';
      ral.columns.template.propertyFields.stroke = 'color';
      ral.columns.template.column.cornerRadius(0, 3, 0, 3);

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true;
      chart.cursor.xAxis = categoryAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.behavior = 'none';

      this.chart = chart;
    }
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const {
      labourCost,
      substituteKey,
      substituteWith,
      isAutonomous,
    } = this.props;

    if (!labourCost.length) {
      return null;
    }

    const labourCostWithCorrectedValues = labourCost;
    labourCostWithCorrectedValues[0][substituteKey] = substituteWith;

    return (
      <>
        {labourCost ? (
          <div style={{ overflowX: 'auto' }}>
            TODO: Waterfall https://amcharts.com/demos/waterfall-chart
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


