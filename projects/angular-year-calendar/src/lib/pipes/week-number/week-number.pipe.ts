import { Pipe, PipeTransform } from '@angular/core';
import { differenceInCalendarDays, subDays, addWeeks, addDays, addYears } from 'date-fns';
import { DEFAULT_WEEK } from '../../constants/default-config';

@Pipe({
  name: 'weekNumber'
})
export class WeekNumberPipe implements PipeTransform {

  transform(date: Date, firstWeekMonth: {month: number, week: number}, weekStartsOn: number, year: number): any {
    const dateClone = new Date(date);
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
      firstWeekFirstDate,
      dayOfMonthFirstDateInView
    } = this.getFirstWeekFirstDate(year, firstWeekMonth, weekStartsOn);
    firstWeekFirstDate = addWeeks(firstWeekFirstDate, firstWeekMonth.week);
    firstWeekFirstDate.setHours(12, 0, 0, 0);

    let firstWeekStarttDate = subDays(firstWeekFirstDate, dayOfMonthFirstDateInView);
    let dateDay = this.getDayInView(dateClone, weekStartsOn);
    const weekStartDate = subDays(dateClone, dateDay);

    let isDateOfPrevYear = false;
    let weeksInYear;

    /**
     * if we have a custom week of the month as the first week of the year
     * if we have the `week` as `null`, then we will have the standard week start with
     * week calculation as well. I.e. how many days the first week has. If it has lower days, the previous
     * year's week number is used. If it has more days, then it is called week 1
     */
    // firstWeekStarttDate = addWeeks(firstWeekStarttDate, firstWeekMonth.week);

    // mapping the days to our current view (based on weekStartsOn)
    if (weekStartDate.getTime() < firstWeekFirstDate.getTime()) {
      isDateOfPrevYear = true;
      const reassesedDates = this.getFirstWeekFirstDate(year - 1, firstWeekMonth, weekStartsOn);
      firstWeekFirstDate = reassesedDates.firstWeekFirstDate;
      firstWeekFirstDate = addWeeks(firstWeekFirstDate, firstWeekMonth.week);
      dayOfMonthFirstDateInView = reassesedDates.dayOfMonthFirstDateInView;
      firstWeekFirstDate.setHours(12, 0, 0, 0);
      firstWeekStarttDate = subDays(firstWeekFirstDate, dayOfMonthFirstDateInView);
      firstWeekStarttDate.setHours(12, 0, 0, 0);
    }

    // find out the distance from the first week's first day
    result = 1 + Math.round(((weekStartDate.getTime() - firstWeekFirstDate.getTime()) / 86400000) / 7);
    if (isDateOfPrevYear) {
      // tslint:disable-next-line:max-line-length
      weeksInYear = this.getTotalWeeks(firstWeekStarttDate, addYears(firstWeekStarttDate, 1));
    } else {
      weeksInYear = this.getTotalWeeks(firstWeekFirstDate, addYears(firstWeekStarttDate, 1));
    }

    /**
     * if we have the first week of the month as the first week of the year (standard view)
     */
    // if (firstWeekMonth.week !== DEFAULT_WEEK) {
    //   return result;
    // }

    const nextYearFirstDate = addYears(firstWeekFirstDate, 1);
    // nextYearFirstDate = addWeeks(nextYearFirstDate, firstWeekMonth.week);
    const datesDiff = differenceInCalendarDays(nextYearFirstDate, weekStartDate);
    if (datesDiff <= 6) {
      dateDay = Math.abs(this.getDayInView(nextYearFirstDate, weekStartsOn));
      if (dateDay <= 3 && ((weekStartDate.getMonth()) % 11) === firstWeekMonth.month) {
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
