import { YCConfig } from '../year-calendar-interfaces';

export const DEFAULT_WEEK = 0;

export const DEFAULT_CONFIG: YCConfig = {
  data: [],
  heatmapColor: '#FF5500',
  weekStartsOn: 0,
  showWeekNumbers: false,
  firstWeekMonth:  {
    month: 0,
    week: DEFAULT_WEEK
  },
  forceWeek: false,
  forceWeekDate: null,
};
