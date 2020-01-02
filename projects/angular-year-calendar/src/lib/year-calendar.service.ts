import { Injectable } from '@angular/core';
import { YCConfig } from './year-calendar-interfaces';
import { WeekNumberPipe } from './pipes/week-number/week-number.pipe';
import { addDays, subDays, differenceInDays, addYears } from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class YearCalendarService {
  weekNumberPipe = new WeekNumberPipe();
  constructor() { }

  /**
   * @author Ahsan Ayaz
   * @desc Calculates the number of weeks for the particular month provided.
   * @returns The first day of the month, the last day of the month and the number of weeks in the month
   */
  getMonthWeeks(month, year = new Date().getFullYear(), weekStartsOn = 0) {
    let monthFirstDate = new Date(year, month, 1);
    const firstDayOfMonth = this.weekNumberPipe.getDayInView(monthFirstDate, weekStartsOn);
    if (firstDayOfMonth > 0) {
      monthFirstDate = subDays(monthFirstDate, firstDayOfMonth);
    } else if (firstDayOfMonth < 0) {
      monthFirstDate = addDays(monthFirstDate, firstDayOfMonth);
    }
    const monthLastDate = new Date(year, month + 1, 0);
    const lastDayOfMonth = this.weekNumberPipe.getDayInView(monthLastDate, weekStartsOn);
    let diff;
    if (lastDayOfMonth === 6) {
      diff = differenceInDays(monthFirstDate, monthLastDate);
    } else {
      diff = differenceInDays(monthFirstDate, addDays(monthLastDate, (6 - lastDayOfMonth)));
    }
    const monthWeeksCount = Math.round(Math.abs(diff) / 7);
    const yearStartDate = new Date(year, month, 1);
    const yearWeeks = this.weekNumberPipe.getTotalWeeks(new Date(year, month, 1), addYears(yearStartDate, 1));
    return {
      firstDayOfMonth,
      lastDayOfMonth,
      monthFirstDate,
      monthLastDate,
      monthWeeksCount,
      yearWeeks
    };
  }

  /**
   * @author Ahsan Ayaz
   * @desc Compares the year calendar data for counts.
   * If any of the previous record has a different count than the current one, we return true.
   */
  isYearDataChanged(previousData = [], currentData = []) {
    for (let i = 0, len = currentData.length; i < len; ++i) {
      if (previousData[i] && currentData[i].count !== previousData[i].count) {
        return true;
      }
    }
    return false;
  }

  /**
   * @author Ahsan Ayaz
   * @desc Calculates the week numbers according to fiscal config provided
   * @returns an array of week numbers
   */
  getWeekNumbers(month: number, year: number, yearViewConfig: YCConfig) {
    if (!yearViewConfig || !yearViewConfig.showWeekNumbers || !(yearViewConfig.firstWeekMonth.month >= 0)) {
      return [];
    } else {
      const weekNumbers = [];
      const monthWeeksData = this.getMonthWeeks(month, year, yearViewConfig.weekStartsOn);
      let weekNum;
      let startDateOfWeek = monthWeeksData.monthFirstDate;
      for (let i = 0, len = monthWeeksData.monthWeeksCount; i < len; ++i) {
        weekNum = this.weekNumberPipe.transform(
          startDateOfWeek,
          yearViewConfig,
          year
        );
        weekNumbers.push(weekNum);
        startDateOfWeek = addDays(startDateOfWeek, 7);
      }
      return weekNumbers;
    }
  }

  isConfigChanged(previousValue: YCConfig, currentValue: YCConfig) {
    return (
      (previousValue.forceWeek !== currentValue.forceWeek) ||
      (previousValue.forceWeekDate !== currentValue.forceWeekDate) ||
      (previousValue.headerTemplate !== currentValue.headerTemplate) ||
      (previousValue.hideHeader !== currentValue.hideHeader) ||
      (previousValue.maxValue !== currentValue.maxValue) ||
      (previousValue.nextBtn !== currentValue.nextBtn) || // obj
      (previousValue.prevBtn !== currentValue.prevBtn) || // obj
      (previousValue.showWeekNumbers !== currentValue.showWeekNumbers) ||
      (previousValue.heatmapColor !== currentValue.heatmapColor) || // obj
      (previousValue.todayBtn !== currentValue.todayBtn) || // obj
      (previousValue.weekStartsOn !== currentValue.weekStartsOn)
    );
  }
}
