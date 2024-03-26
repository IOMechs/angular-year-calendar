import { Pipe, PipeTransform } from "@angular/core";
import {
  differenceInCalendarDays,
  subDays,
  addWeeks,
  addYears,
  subYears,
  differenceInWeeks,
} from "date-fns";
import { YCConfig } from "../../year-calendar-interfaces";

@Pipe({
  name: "weekNumber",
})
export class WeekNumberPipe implements PipeTransform {
  transform(date: Date, ycConfig: YCConfig, year): any {
    const dateClone = new Date(date);
    const millisecondsInADay = 86400000;

    const { firstWeekMonth, weekStartsOn, forceWeek, forceWeekDate } = ycConfig;
    let result;
    if (
      firstWeekMonth === undefined ||
      firstWeekMonth.month === undefined ||
      firstWeekMonth.week === undefined
    ) {
      throw new Error(
        "firstWeekMonth data is required for the weekNumber pipe"
      );
    }

    /**
     * Why do we set 12 hours below?
     * Glad you asked.
     * This is because we have -12:00 to +14:00 for timezones
     * Setting 12h makes sure the week numbers work for the entire app for all timezones
     */
    dateClone.setHours(12, 0, 0, 0);
    let { firstWeekFirstDate } = this.getFirstWeekFirstDate(
      dateClone.getFullYear(),
      firstWeekMonth,
      weekStartsOn
    );
    let dateDay;
    let currentWeekStartDate;
    if (forceWeek) {
      if (
        !forceWeekDate ||
        isNaN(forceWeekDate.month) ||
        isNaN(forceWeekDate.date)
      ) {
        throw new Error(
          "forceWeekDate is required when forceWeek is set to true"
        );
      }
      firstWeekFirstDate = new Date(
        year,
        forceWeekDate.month,
        forceWeekDate.date
      );
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
      weeksInYear = differenceInWeeks(
        firstWeekFirstDate,
        previousYearFirstDate
      );
      nextYearFirstDate = firstWeekFirstDate;
      firstWeekFirstDate = previousYearFirstDate;
    } else {
      nextYearFirstDate = addYears(firstWeekFirstDate, 1);
      weeksInYear = differenceInWeeks(nextYearFirstDate, firstWeekFirstDate);
    }

    // find out the distance from the first week's first day
    const roundFigure =
      (currentWeekStartDate.getTime() - firstWeekFirstDate.getTime()) /
      millisecondsInADay;
    result =
      roundFigure % 7 === 0
        ? roundFigure / 7 + 1
        : 1 + Math.round(roundFigure / 7);
    if (result <= 0) {
      result = weeksInYear + result;
    }

    const datesDiff = Math.abs(
      differenceInCalendarDays(nextYearFirstDate, currentWeekStartDate)
    );
    if (datesDiff <= 6) {
      dateDay = Math.abs(this.getDayInView(nextYearFirstDate, weekStartsOn));
      if (
        dateDay <= 3 &&
        currentWeekStartDate.getMonth() % 11 === firstWeekMonth.month
      ) {
        result = 1;
      }
    }

    if (ycConfig.periodWeekNumber) {
      date.setHours(12, 0, 0, 0);
      const currentYearStartDiff =
        (date.getTime() - firstWeekFirstDate.getTime()) / millisecondsInADay;

      // calculating period week number from range [1-4] using the week number calculated above
      let week = result === 53 ? 1 : result;

      // Adjusting week number if year start day and week start are diff and week have less than 4 days
      if (currentYearStartDiff % 7 !== 0 && currentYearStartDiff % 7 < 4) {
        week += 1;
      }

      const periodNumber = Math.ceil(week / 4);
      const weekNumber = week % 4 || 4;

      const nextYearStartDiff =
        (nextYearFirstDate.getTime() - date.getTime()) / millisecondsInADay;

      // calculation for the "Adjustment Week" if days remaining are in multiple of 7
      if (nextYearStartDiff % 7 === 0 && nextYearStartDiff <= 35) {
        const adjustmentWeek = "P:13 - W:5/5";

        // if period is 14 from above means its the adjustment week
        return periodNumber === 14
          ? adjustmentWeek
          : `P:${periodNumber}-W:${weekNumber}/5`;
      }

      return `P:${periodNumber === 14 ? 1 : periodNumber}-W:${weekNumber}/4`;
    }

    return result;
  }

  getDayInView(date, weekStartsOn) {
    return (date.getDay() + (7 - weekStartsOn)) % 7;
  }

  getTotalWeeks(firstDate: Date, secondDate: Date) {
    return Math.ceil(
      Math.abs(secondDate.getTime() - firstDate.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
  }

  getFirstWeekFirstDate(year, firstWeekMonth, weekStartsOn) {
    const {
      date: firstWeekFirstDate,
      dayOfFirstDateInView: dayOfMonthFirstDateInView,
    } = this.getWeekFirstDate(
      new Date(year, firstWeekMonth.month, 1),
      weekStartsOn
    );

    return {
      firstWeekFirstDate,
      dayOfMonthFirstDateInView,
    };
  }

  getWeekFirstDate(date, weekStartsOn) {
    const dayOfFirstDateInView = this.getDayInView(date, weekStartsOn);
    return {
      date,
      dayOfFirstDateInView,
    };
  }
}
