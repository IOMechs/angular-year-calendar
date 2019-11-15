import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays, subDays, addWeeks, addDays, addYears, subYears, differenceInWeeks } from 'date-fns';
import { DEFAULT_WEEK } from '../../constants/default-config';
import { YCConfig } from '../../year-calendar-interfaces';

@Pipe({
  name: 'weekNumber'
})
export class WeekNumberPipe implements PipeTransform {

  transform(date: Date, ycConfig: YCConfig, year): any {
    const dateClone = new Date(date);
    const {firstWeekMonth, weekStartsOn, forceWeek, forceWeekDate} = ycConfig;
    let result;
    if (firstWeekMonth === undefined || (firstWeekMonth.month === undefined || firstWeekMonth.week === undefined)) {
      throw new Error('firstWeekMonth data is required for the weekNumber pipe');
    }

    /**
     * Why do we set 12 hours below?
     * Glad you asked.
     * This is because we have -12:00 to +14:00 for timezones
     * Setting 12h makes sure the week numbers work for the entire app for all timezones
     */
    dateClone.setHours(12, 0, 0, 0);
    let {
      firstWeekFirstDate
    } = this.getFirstWeekFirstDate(dateClone.getFullYear(), firstWeekMonth, weekStartsOn);
    let dateDay;
    let currentWeekStartDate;
    if (forceWeek) {
      if (!forceWeekDate || isNaN(forceWeekDate.month) || isNaN(forceWeekDate.date)) {
        throw new Error('forceWeekDate is required when forceWeek is set to true');
      }
      firstWeekFirstDate = new Date(year, forceWeekDate.month, forceWeekDate.date);
      const customDateDay = this.getDayInView(firstWeekFirstDate, weekStartsOn);
      firstWeekFirstDate = subDays(firstWeekFirstDate, customDateDay);
    } else {
      firstWeekFirstDate = addWeeks(firstWeekFirstDate, firstWeekMonth.week);
      firstWeekFirstDate.setHours(12, 0, 0, 0);
    }
    dateDay = this.getDayInView(dateClone, weekStartsOn);
    currentWeekStartDate = subDays(dateClone, dateDay);

    let nextYearFirstDate;
    let previousYearFirstDate;
    let weeksInYear;
    if (currentWeekStartDate.getTime() < firstWeekFirstDate.getTime()) {
      previousYearFirstDate = subYears(firstWeekFirstDate, 1);
      weeksInYear = differenceInWeeks(firstWeekFirstDate, previousYearFirstDate);
      nextYearFirstDate = firstWeekFirstDate;
      firstWeekFirstDate = previousYearFirstDate;
    } else {
      nextYearFirstDate = addYears(firstWeekFirstDate, 1);
      weeksInYear = differenceInWeeks(nextYearFirstDate, firstWeekFirstDate);
    }


    // find out the distance from the first week's first day
    const roundFigure = ((currentWeekStartDate.getTime() - firstWeekFirstDate.getTime()) / 86400000);
    result = (roundFigure % 7 === 0) ? roundFigure / 7 : 1 + Math.round(roundFigure / 7);
    if (result <= 0) {
      result = weeksInYear + result;
    }

    const datesDiff = Math.abs(differenceInCalendarDays(nextYearFirstDate, currentWeekStartDate));
    if (datesDiff <= 6) {
      dateDay = Math.abs(this.getDayInView(nextYearFirstDate, weekStartsOn));
      if (dateDay <= 3 && ((currentWeekStartDate.getMonth()) % 11) === firstWeekMonth.month) {
        result = 1;
      }
    }

    return result;
  }

  getDayInView(date, weekStartsOn) {
    return (date.getDay() + (7 - weekStartsOn)) % 7;
  }

  getTotalWeeks(firstDate: Date, secondDate: Date) {
    return Math.ceil(Math.abs(secondDate.getTime() - firstDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
  }

  getFirstWeekFirstDate(year, firstWeekMonth, weekStartsOn) {
    const { date: firstWeekFirstDate, dayOfFirstDateInView: dayOfMonthFirstDateInView} = this.getWeekFirstDate(new Date(
      year,
      firstWeekMonth.month,
      1
    ), weekStartsOn);

    return {
      firstWeekFirstDate,
      dayOfMonthFirstDateInView
    };
  }

  getWeekFirstDate(date, weekStartsOn) {
    const dayOfFirstDateInView = this.getDayInView(date, weekStartsOn);
    return {
      date,
      dayOfFirstDateInView
    };
  }
}
