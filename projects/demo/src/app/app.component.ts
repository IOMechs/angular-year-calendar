import { Component } from '@angular/core';
import {  YCConfig } from '../../../angular-year-calendar/src/public-api';
import { BaseYCOptions } from './constants/base-yc-options';

@Component({
  selector: 'ycd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calendarDate = new Date();
  ycConfigurations: Record<string, YCConfig> = {
    standard: {
      ...BaseYCOptions,
      showWeekNumbers: true,
      weekStartsOn: 0,
      firstWeekMonth: {
        month: 1,
        week: 4
      }
    }
  };
}
