import { YCConfig } from 'projects/angular-year-calendar/src/public-api';

export const BaseYCOptions: YCConfig = {
  heatmapColor: '#FF5500',
  data: [],
  nextBtn: {
    text: 'Next',
    class: 'btn btn-dark',
  },
  prevBtn: {
    text: 'Previous',
    class: 'btn btn-dark',
  },
  todayBtn: {
    hide: false,
    class: 'btn btn-primary'
  },
  firstWeekMonth: {
    month: 0, // January
    week: 0 // use `null` for standard weeks and calculations
  },
  showWeekNumbers: false,
  weekNumbersColor: '#778CA2',
  dayClass: 'year-calendar-day',
  maxValue: 10 // let the component calculate the max value from all values,
};
