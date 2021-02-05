import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { SalaryData } from '@jobvalue/salaries';
import { am4themesJobValue } from '@jobvalue/utils';
import Spinner from '@uidu/spinner';
import React, { PureComponent } from 'react';
import { v4 as uuid } from 'uuid';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

export default class ExPerc extends PureComponent<{
  salaryDataForChart: Array<SalaryData>;
  loaded?: boolean;
}> {
  private chart: am4charts.PieChart;
  private uuid;

  constructor(props) {
    super(props);
    this.uuid = props.id || uuid();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    const { salaryDataForChart } = this.props;
    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.PieChart);
      chart.language.locale = am4lang_it_IT;

      // Add data
      chart.data = [
        {
          country: 'Percettori',
          count: (salaryDataForChart[1] as any).incumbentsWithVarPercentage,
        },
        {
          country: 'Non percettori',
          count:
            100 - (salaryDataForChart[1] as any).incumbentsWithVarPercentage,
        },
      ];

      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'count';
      pieSeries.dataFields.category = 'country';

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(70);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color('#e9ecef');
      pieSeries.slices.template.strokeWidth = 1;
      pieSeries.slices.template.strokeOpacity = 0.4;
      // pieSeries.slices.template.tooltipText = '';
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      const label = pieSeries.createChild(am4core.Label);
      label.text = `${
        (salaryDataForChart[1] as any).incumbentsWithVarPercentage
      }%`;
      label.horizontalCenter = 'middle';
      label.verticalCenter = 'middle';
      label.fontSize = 18;

      this.chart = chart;
    }
  }

  render() {
    const { loaded } = this.props;
    console.log(this.props);
    return (
      <div className="d-flex flex-row align-items-center">
        <div className="card-body">
          <p className="mb-1">Percettori</p>
          <p className="text-muted mb-0">
            La percentuale di profili analizzati che ha percepito una quota
            variabile di retribuzione.
          </p>
        </div>
        <div
          className="card-body flex-shrink-0 pl-0 text-center"
          style={{ width: '35%' }}
        >
          {loaded ? (
            <div id={this.uuid} style={{ height: 100 }}></div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    );
  }
}
