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
  nextBtn?: YCHeaderButton;
  prevBtn?: YCHeaderButton;
  todayBtn?: YCHeaderButton;
  showWeekNumbers?: boolean;
  firstWeekMonth?: number;
  weekStartsOn?: number;
  weekNumbersColor?: string;
  dayClass?: string;
}

export interface YCOptions {
  // the theme colors are basically color ranges according to hsl color constants. The `H` value to be exact.
  // See information here https://www.w3schools.com/colors/colors_hsl.asp
  themeColors?: {
    primary: number,
    secondary: number
  };  // the theme color
  data: Array<YCDataItem>;
  viewsConfig?: {
    year?: YCConfig;
  };
  maxValue?: number;
}
