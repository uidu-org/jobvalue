import * as am4core from '@amcharts/amcharts4/core';
import am4lang_it_IT from '@amcharts/amcharts4/lang/it_IT';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { am4themesJobValue } from '@jobvalue/utils';
import React, { PureComponent } from 'react';
import uuid from 'uuid/v4';
import provinces from '../data/provinces';

am4core.useTheme(am4themesAnimated);
am4core.useTheme(am4themesJobValue);
am4core.options.commercialLicense = true;

export default class LabourCostChart extends PureComponent<any> {
  private chart: am4maps.MapChart = undefined;
  private uuid = uuid();

  static defaultProps = {
    aspect: 2,
    className: 'mt-3 mb-4',
    margin: { top: 0, right: 0, left: 0, bottom: 0 },
  };

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart = () => {
    const { province } = this.props;

    if (!this.chart) {
      const chart = am4core.create(this.uuid, am4maps.MapChart);
      chart.language.locale = am4lang_it_IT;
      chart.geodata = provinces;
      chart.projection = new am4maps.projections.Miller();
      const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      const polygonTemplate = polygonSeries.mapPolygons.template;
      const hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#386da7');
      polygonTemplate.tooltipText = '{SIGLA}';
      polygonSeries.data = [
        {
          id: province.code,
          name: province.name,
          fill: am4core.color('#386da7'),
        },
      ];

      // chart.exporting.adapter.add('zoomLevel', data => {
      //   return data;
      // });

      chart.events.on('ready', () => {
        chart.zoomToMapObject(polygonSeries.getPolygonById(province.code), 4.5);
        chart.seriesContainer.resizable = false;
      });

      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      chart.chartContainer.wheelable = false;
      chart.seriesContainer.events.disableType('doublehit');
      chart.chartContainer.background.events.disableType('doublehit');

      // Bind "fill" property to "fill" key in data
      polygonTemplate.propertyFields.fill = 'fill';
      this.chart = chart;
    }
  };

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div style={{ overflowX: 'auto' }}>
        <div id={this.uuid} style={{ width: '100%', height: 200 }} />
      </div>
    );
  }
}
