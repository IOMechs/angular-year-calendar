import { TemplateRef } from '@angular/core';

export interface YCDataItem {
  count: number;
  color?: string;
  date: Date;
}

export interface YCHeaderButton {
  text?: string;
  class?: string;
  hide?: boolean;
}

export interface YCConfig {
  // the theme colors are basically color ranges according to hsl color constants. The `H` value to be exact.
  // See information here https://www.w3schools.com/colors/colors_hsl.asp
  heatmapColor?: string;
  data: Array<YCDataItem>;
  nextBtn?: YCHeaderButton;
  prevBtn?: YCHeaderButton;
  todayBtn?: YCHeaderButton;
  hideHeader?: boolean;
  showWeekNumbers?: boolean;
  headerTemplate?: TemplateRef<any>;
  firstWeekMonth?: {
    week: number;
    month: number;
  };
  forceWeek?: boolean;
  forceWeekDate?: {
    month: number,
    date: number
  };
  weekStartsOn?: number;
  weekNumbersColor?: string;
  dayClass?: string;
  maxValue?: number;
}

export interface YCDayItem {
  date: Date;
  weeks: Array<Array<{  // setting the day of the week in the structure
    day?: number,
    isToday: boolean,
    value: number,
    date: Date
  }>>;
  weekNumbers: Array<number>;
}
