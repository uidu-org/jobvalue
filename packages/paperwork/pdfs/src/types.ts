import { Sprite } from '@amcharts/amcharts4/core';

export type PreparePdfProps = {
  charts?: Sprite[];
  content?: (args) => [];
  webpackImages?: [];
  fonts?: any;
  vfs?: any;
  docProps: (result: any) => any;
};
