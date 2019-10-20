import { Injectable } from '@angular/core';
import { YCConfig } from './year-calendar-interfaces';
import { WeekNumberPipe } from './pipes/week-number/week-number.pipe';
import { getISOWeeksInYear, addDays } from 'date-fns';
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
    const monthFirstDate = new Date(year, month, 1);
    const firstDayOfMonth = ((7 - weekStartsOn) + monthFirstDate.getDay()) % 7;
    const monthLastDate = new Date(year, month + 1, 0);
    const lastDayOfMonth = monthLastDate.getDay();
    const monthWeeksCount = Math.ceil((monthLastDate.getDate() + firstDayOfMonth + (6 - lastDayOfMonth)) / 7);
    const yearWeeks = getISOWeeksInYear(firstDayOfMonth);
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
    if (!yearViewConfig || !yearViewConfig.showWeekNumbers || !(yearViewConfig.firstWeekMonth >= 0)) {
      return [];
    } else {
      const weekNumbers = [];
      const monthWeeksData = this.getMonthWeeks(month, year, yearViewConfig.weekStartsOn);
      let weekNum;
      let startDateOfWeek = monthWeeksData.monthFirstDate;
      for (let i = 0, len = monthWeeksData.monthWeeksCount; i < len; ++i) {
        weekNum = this.weekNumberPipe.transform(
          startDateOfWeek,
          yearViewConfig.firstWeekMonth,
          yearViewConfig.weekStartsOn,
          year
        );
        weekNumbers.push(weekNum);
        startDateOfWeek = addDays(startDateOfWeek, 7);
      }
      return weekNumbers;
    }
  }
}
