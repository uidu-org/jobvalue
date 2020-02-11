import React, { PureComponent } from 'react';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import Spinner from '@uidu/spinner';
import uuid from 'uuid/v4';

export default class SalariesComparator extends PureComponent<any> {
  private chart: am4charts.XYChart = undefined;
  private uuid = uuid();

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { salaryDataForChart } = this.props;

    const data = this.transformData(salaryDataForChart);

    if (salaryDataForChart && !this.chart) {
      const chart = am4core.create(this.uuid, am4charts.XYChart);
      chart.language.locale = am4lang_it_IT;
      chart.paddingTop = 32;
      chart.paddingRight = 0;
      chart.data = data;
      chart.responsive.enabled = true;


      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "percentage";

      let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      //valueAxis.title.text = "Litres sold (M)";


      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.categoryY = "percentage";
      series.dataFields.valueX = "value";
      series.tensionX = 0.9;
    }
  }

  transformData(data: any): any {
    for (let i = 0; i < data.length; i++) {
      //Valori duplicati
      if (data[i].id === 9624 || data[i].id === 9652) {
        data[i].percentage++;
      }

      if (data[i].percentage > 50 && data[i].percentage <= 100) {
        data[i].percentage = 100 - data[i].percentage + 1;
      }
    }
    return data;
  }


  render(){
    const { salaryDataForChart } = this.props;

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
