import { YCConfig } from '../year-calendar-interfaces';

export const DEFAULT_CONFIG: YCConfig = {
  data: [],
  themeColors: {
    primary: 0,
    secondary: 60
  },
  weekStartsOn: 0,
  showWeekNumbers: false,
  firstWeekMonth:  {
    month: 0,
    week: 1
  }
};
