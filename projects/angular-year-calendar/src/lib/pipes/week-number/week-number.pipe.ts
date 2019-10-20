import { Pipe, PipeTransform } from '@angular/core';
import { getISOWeeksInYear, subDays, addDays } from 'date-fns';
@Pipe({
  name: 'weekNumber'
})
export class WeekNumberPipe implements PipeTransform {

  transform(date: Date, firstWeekMonth: number, weekStartsOn: number, year: number): any {
    const dateClone = new Date(date);
    let result;
    if (firstWeekMonth === undefined) {
      throw new Error('First Week Start is required for the weekNumber pipe');
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
    } = this.getFirstWeekFirstDate(dateClone.getFullYear(), firstWeekMonth, weekStartsOn);

    // mapping the days to our current view (based on weekStartsOn)
    if (dateClone.getTime() < firstWeekFirstDate.getTime()) {
      const reassesedDates = this.getFirstWeekFirstDate(dateClone.getFullYear() - 1, firstWeekMonth, weekStartsOn);
      firstWeekFirstDate = reassesedDates.firstWeekFirstDate;
      dayOfMonthFirstDateInView = reassesedDates.dayOfMonthFirstDateInView;
    }

    // find out the distance from the first week's first day
    result = 1 + Math.floor(((dateClone.getTime() - firstWeekFirstDate.getTime()) / 86400000) / 7);
    const weeksInYear = getISOWeeksInYear(new Date(dateClone.getFullYear(), 0, 1));
    if (result <= 0) { // if the week number isn't a positive value
      result = weeksInYear + result;
    }

    // if the result is more than there are weeks in the year, it means it's the next year's first week
    if (result > weeksInYear) {
      result = 1;
    }

    return result;
  }

  getFirstWeekFirstDate(year, firstWeekMonth, weekStartsOn) {
    const { date: firstWeekFirstDate, dayOfFirstDateInView: dayOfMonthFirstDateInView} = this.getWeekFirstDate(new Date(
      year,
      firstWeekMonth,
      1
    ), weekStartsOn);

    return {
      firstWeekFirstDate,
      dayOfMonthFirstDateInView
    };
  }

  getWeekFirstDate(date, weekStartsOn) {
    const dayOfFirstDateInView = ((weekStartsOn + weekStartsOn) % 7) - ((date.getDay() + weekStartsOn) % 7);
    // if the day is not the start of the week in our view, select the first day of the first week
    if (dayOfFirstDateInView > 0) {
      /**
       * This means the week start (in our view), is further than the standard matrix.
       * So we add the difference to get the first date.
       */
      date = addDays(date, dayOfFirstDateInView);
    } else if (dayOfFirstDateInView < 0) {
      /**
       * This means the week start (in our view), is before the week start in the standard matrix.
       * So we subtract the difference to get the first date.
       */
      date = subDays(date, (dayOfFirstDateInView * -1));
    }

    if (dayOfFirstDateInView <= -4) {
      /**
       * If we have to substract more than 3 days, it means we have < 3 working days in the view.(excluding weekends)
       * So the week 1 will start from the next week
       */
      date = addDays(date, 7);
    } else if (dayOfFirstDateInView >= 5) {
      /**
       * If we have to add more than 5 days, it means we have < 3 working days in the view.(excluding weekends)
       * So the week 1 will start from the previous week
       */
      date = subDays(date, 7);
    }
    return {
      date,
      dayOfFirstDateInView
    };
  }
}
