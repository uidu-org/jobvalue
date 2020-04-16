import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_bullets from '@amcharts/amcharts4/plugins/bullets';
import { PreparePdfProps } from './types';
import { toDataURL } from './utils';

export const preparePDF = ({
  charts,
  content = (args) => [],
  webpackImages = [],
  fonts,
  vfs,
  docProps,
}: PreparePdfProps) => {
  const chartIds = charts.map((c) => c.htmlContainer.id);
  const promises = [charts[0].exporting.pdfmake];
  charts.forEach((chart) => {
    let options = chart.exporting.getFormatOptions('jpg');
    console.log(am4plugins_bullets);
    options.keepTainted = true;
    chart.exporting.backgroundColor = am4core.color('white');
    chart.exporting.setFormatOptions('jpg', options);
    promises.push(chart.exporting.getImage('jpg'));
  });
  webpackImages.forEach((element) => {
    promises.push(toDataURL(element));
  });

  return Promise.all(promises).then((res) => {
    // pdfmake is ready in global scope
    // Create document template
    const chartImages = res.slice(1, res.length - webpackImages.length);
    const doc = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [30, 65, 30, 65],
      header: {
        margin: 30,
        columns: [
          {
            image: res[res.length - webpackImages.length],
            width: 80,
          },
          {
            text: 'Nome cliente',
            width: '*',
            alignment: 'right',
          },
        ],
        columnGap: 30,
      },
      footer: {
        margin: 30,
        columns: [
          {
            image: res[res.length - webpackImages.length - 1],
            width: 20,
          },
          {
            text: '© Talent Market Watch - Powered by JPAnalytics',
            alignment: 'right',
            width: '*',
          },
        ],
      },
      styles: {
        header: {
          fontSize: 15,
          margin: [0, 20, 0, 10],
          color: '#DA291C',
        },
        stronger: {
          bold: true,
        },
        subheader: {
          fontSize: 12,
          margin: [0, 0, 0, 5],
        },
        sectionTitle: {
          fontSize: 11,
          margin: [0, 10, 0, 5],
          color: '#968C83',
        },
        tableExample: {
          fontSize: 10,
          margin: [0, 5, 0, 15],
        },
        tableHeader: {
          color: 'white',
          fillColor: '#DA291C',
          noWrap: true,
        },
        tableCell: {
          margin: [0, 5, 0, 5],
        },
      },
      defaultStyle: {
        fontSize: 11,
        font: 'houschkahead',
      },
      content: content({
        charts,
        chartIds,
        chartImages,
      }),
      ...docProps(res),
    };

    // @ts-ignore
    return pdfMake.createPdf(doc, null, fonts, vfs);
  });
};

export const savePDF = (pdf, name = 'report') => pdf.download(`${name}.pdf`);

export default savePDF;
