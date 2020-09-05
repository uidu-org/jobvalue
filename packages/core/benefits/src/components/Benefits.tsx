import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import { v4 as uuid } from 'uuid';

am4core.useTheme(am4themesAnimated);
// am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

export default class Benefits extends PureComponent<any> {
  private chart: am4charts.XYChart = undefined;
  private star: am4core.Image;
  private uuid;

  constructor(props) {
    super(props);
    this.uuid = props.id || uuid();
  }

  static defaultProps = {
    currentBenefits: [],
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate(oldProps) {
    const { data } = this.props;
    if (data !== oldProps.data) {
      this.drawChart();
      this.chart.data = data;
      this.showStars();
    }
  }

  drawChart = () => {
    const { data, currentBenefits } = this.props;
    if (data && !this.chart) {
      // Create chart instance
      let chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;
      // chart.scrollbarX = new am4core.Scrollbar();
      chart.maskBullets = true;
      chart.paddingLeft = 24;

      // let options = chart.exporting.getFormatOptions('jpg');
      // options.keepTainted = true;
      // chart.startAngle = -170;
      // chart.endAngle = -10;
      // chart.innerRadius = am4core.percent(50);
      //  let data = [];
      //  for (var i = 0; i < 20; i++) {
      //    data.push({
      //      category: i,
      //      value: Math.round(Math.random() * 100),
      //    });
      //  }
      chart.data = data.sort((a, b) => a.value - b.value);
      // chart.radius = am4core.percent(100);
      // chart.innerRadius = am4core.percent(50);
      // Create axes
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'identifier';
      categoryAxis.renderer.disabled = true;
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.dx = -40;
      // categoryAxis.renderer.minWidth = 120;
      categoryAxis.renderer.tooltip.dx = -40;

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.fillOpacity = 0.3;
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.baseGrid.strokeOpacity = 0;
      valueAxis.renderer.labels.template.dy = 20;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      // valueAxis.tooltip.disabled = true;
      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.sequencedInterpolation = true;
      series.dataFields.valueX = 'value';
      series.fillOpacity = 0.5;
      series.tooltip.dy = -30;
      series.columnsContainer.zIndex = 100;

      const columnTemplate = series.columns.template;
      series.dataFields.categoryY = 'identifier';
      series.columns.template.strokeWidth = 0;
      series.columns.template.column.cornerRadius(0, 3, 0, 3);
      series.tooltipText = '{valueX}';
      series.columns.template.adapter.add('fill', function (fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
      });
      series.heatRules.push({
        target: columnTemplate,
        property: 'fill',
        dataField: 'valueX',
        min: am4core.color('#a6ddff'),
        max: am4core.color('#386da7'),
      });

      series.mainContainer.mask = undefined;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = '{name}: [bold]{valueX}%[/]';
      categoryLabel.label.horizontalCenter = 'left';
      categoryLabel.label.dx = 24;
      categoryLabel.locationX = 1;
      categoryLabel.label.truncate = false;

      columnTemplate.height = am4core.percent(70);
      columnTemplate.maxHeight = 30;
      columnTemplate.strokeOpacity = 0;

      const bullet = columnTemplate.createChild(am4charts.CircleBullet);
      bullet.circle.radius = 15;
      bullet.valign = 'middle';
      bullet.align = 'left';
      bullet.isMeasured = true;
      bullet.interactionsEnabled = false;
      bullet.horizontalCenter = 'right';
      bullet.interactionsEnabled = false;
      bullet.fillOpacity = 1;

      const star = bullet.createChild(am4core.Image);
      star.href = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/star.svg';
      star.width = 14;
      star.height = 14;
      star.horizontalCenter = 'left';
      star.verticalCenter = 'bottom';
      star.dx = 6;
      star.dy = -3;
      star.zIndex = 20;
      this.star = star;

      this.showStars();

      const image = bullet.createChild(am4core.Image);
      image.horizontalCenter = 'middle';
      image.verticalCenter = 'middle';
      image.width = 20;
      image.height = 20;
      image.verticalCenter = 'middle';
      image.fill = am4core.color('white');
      image.propertyFields.href = 'image';

      this.chart = chart;
    }
  };

  showStars = () => {
    const { currentBenefits } = this.props;
    this.star.adapter.add('disabled', function (center, target) {
      if (!target.dataItem) {
        return true;
      }
      // @ts-ignore
      return !currentBenefits.includes(target.dataItem.categoryY);
    });
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    const { data, height } = this.props;
    return (
      <>
        {data ? (
          <>
            <div style={{ overflowX: 'auto' }}>
              <div
                id={this.uuid}
                style={{ width: '100%', height: height || data.length * 48 }}
              />
            </div>
          </>
        ) : (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: 400 }}
          >
            <Spinner />
          </div>
        )}
      </>
    );
  }
}
