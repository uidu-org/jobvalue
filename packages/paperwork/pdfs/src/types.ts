import { Sprite } from '@amcharts/amcharts4/core';

export type PreparePdfProps = {
  charts?: Sprite[];
  content?: (args) => [];
  webpackImages?: [];
  fonts?: string;
  vfs?: string;
};
