import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { YearCalendarService } from '../../year-calendar.service';
import { YCOptions, YCConfig } from '../../year-calendar-interfaces';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

export const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


@Component({
  selector: 'yc-year-calendar',
  templateUrl: './year-calendar.component.html',
  styleUrls: ['./year-calendar.component.scss']
})
export class YearCalendarComponent implements OnInit, OnChanges {
  @Input() themeColor = 'ff0000';
  @Input() selectedDate: Date = new Date();
  @Input() loadingData: boolean;
  @Input() calendarOptions: YCOptions = {
    data: [],
    themeColors: {
      primary: 0,
      secondary: 60
    },
    viewsConfig: {
      year: {
        weekStartsOn: 0,
        showWeekNumbers: false
      }
    }
  };
  @Input() daysOfWeek: any = [...DAYS_OF_WEEK];
  @Output() eventDayClicked = new EventEmitter<any>();
  @Output() viewYearChanged = new EventEmitter<any>();
  year = new Date().getFullYear();
  yearData = [];
  yearViewConfig: YCConfig = null;
  constructor(
    private ycService: YearCalendarService
  ) { }

  ngOnInit() {
    if (this.calendarOptions.viewsConfig && this.calendarOptions.viewsConfig.year) {
      this.yearViewConfig = this.calendarOptions.viewsConfig.year;
    }
    this.render(this.selectedDate.getFullYear());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.calendarOptions) {
      const previousValue: YCOptions = changes.calendarOptions.previousValue;
      const currentValue: YCOptions = changes.calendarOptions.currentValue;
      if (
        previousValue && currentValue &&
        ((previousValue.data.length !== currentValue.data.length) ||
        (previousValue.data[0] && currentValue.data[0] &&
        previousValue.data[0].date !== currentValue.data[0].date)) ||
        (previousValue && this.ycService.isYearDataChanged(previousValue.data, currentValue.data))
      ) {
        this.render(this.year);
      }
    }

    if (changes.selectedDate) {
      if (changes.selectedDate.previousValue && changes.selectedDate.currentValue !== changes.selectedDate.previousValue) {
        this.viewYearChanged.emit(this.year);
      }
    }
  }

  /**
   * @author Ahsan Ayaz
   * @desc Creates the months data and assigns to `yearData` which is rendered on the view
   * @param date - date of the year to render
   */
  render(year: number = this.year) {
    this.daysOfWeek = [...this.getDaysOfWeek()];
    this.year = year;
    this.yearData = new Array(12).fill(0).map((monthEl, monthIndex) => {
      return {
        date: new Date(this.year, monthIndex + 1, 0),
        weeks: this.createDaysOfMonth(monthIndex, this.year),
        weekNumbers: this.ycService.getWeekNumbers(monthIndex, this.year, this.yearViewConfig)
      };
    });
  }

  getDaysOfWeek() {
    const days = [];
    for (let i = this.yearViewConfig.weekStartsOn, len = this.yearViewConfig.weekStartsOn + this.daysOfWeek.length; i < len; ++i) {
      days.push(DAYS_OF_WEEK[i % (this.daysOfWeek.length)]);
    }
    return days;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Returns the dates of the entire month
   * @param monthIndex - index of the month of which the days are to be calculated
   * @param year - the year which is displayed on the view
   */
  createDaysOfMonth(monthIndex, year) {
    // getting the weeks of the month to calculate rows on month view
    const monthWeeksData = this.ycService.getMonthWeeks(monthIndex, year, this.yearViewConfig.weekStartsOn);
    const {
      monthWeeksCount,
      lastDayOfMonth,
      monthLastDate
    } = monthWeeksData;
    let { firstDayOfMonth } = monthWeeksData;
    const daysOfWeeks = [];
    const todayStr = new Date().toDateString(); // will be used to identify if a date is `today`
    let currentDate = 1; // this will keep a count of the overall dates of the months
    let lastDayOfWeek = 7;
    let maxValueInYear = 0;
    // Looping through the weeks to add appropriate dates to particular week
    for (let weekIndex = 0; weekIndex < monthWeeksCount; weekIndex++) {
      daysOfWeeks[weekIndex] = [];  // creating an empty array for each week to store days/dates
      if (monthWeeksCount === weekIndex + 1) {  // if we're at the last week of the month
        lastDayOfWeek = lastDayOfMonth + 1; // setting the last day to last day of the month
      }
      if (weekIndex > 0) {  // for every week except the first week
        firstDayOfMonth = 0;  // set the first day of the week to first column
      }
      // for every week, start from the first day (column) and keep adding dates/days respectively till the last day of week
      for (let indexDay = firstDayOfMonth; indexDay < lastDayOfWeek; indexDay++) {
        const currDate = new Date(year, monthIndex, currentDate);
        if (currDate.getTime() > monthLastDate.getTime()) {
          break;
        }
        const currDayString = currDate.toDateString();
        const isToday = currDayString === todayStr; // if the current date is actually today
        const dayValue = this.assignDataCountToDate(currDayString).count;
        daysOfWeeks[weekIndex][indexDay] = {  // setting the day of the week in the structure
          day: currentDate,
          isToday,
          value: dayValue,
          date: currDate
        };
        if (dayValue > maxValueInYear) { // saving the max year count value
          maxValueInYear = dayValue;
        }
        currentDate++; // incrementing the date counter after each date's addition to the date structure
      }
    }
    if (maxValueInYear > this.calendarOptions.maxValue) {
      this.calendarOptions.maxValue = maxValueInYear;
    }
    return daysOfWeeks.filter(weekData => {
      return weekData.length !== 0;
    });
  }

  assignDataCountToDate(currDayString) {
    let dateData = this.calendarOptions.data.find((dataItem) => {
      const itemDate = dataItem.date;
      if (!itemDate) {
        return false;
      }
      return new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()).toDateString() === currDayString;
    });
    if (!dateData) {
      const dataIndex = this.calendarOptions.data.findIndex((dataItem) => {
        return dataItem.date === null;
      });

      if (dataIndex >= 0) {
        dateData = {...this.calendarOptions.data[dataIndex]};
        this.calendarOptions.data[dataIndex].date = new Date(currDayString);
      }
    }
    return {
      count: dateData && dateData.count ? dateData.count : 0
    };
  }

  nextYearClick() {
    this.render(this.year + 1);
    this.viewYearChanged.emit(this.year);
  }

  prevYearClick() {
    this.render(this.year - 1);
    this.viewYearChanged.emit(this.year);
  }

  todayClick() {
    this.render(new Date().getFullYear());
  }

  eventDayCick(day, trigger: CdkOverlayOrigin) {
    this.eventDayClicked.emit({
      day,
      trigger
    });
  }

}
