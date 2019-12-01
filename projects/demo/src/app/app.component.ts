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
  isConfigBarOpened: boolean;
  ycConfigurations: Record<string, YCConfig> = {
    basic: {
      ...BaseYCOptions,
    }
  };

  onConfigChanged(config) {
    console.log(config);
    this.ycConfigurations.basic = {
      ...this.ycConfigurations.basic,
      hideHeader: config.hideHeader,
      nextBtn: {
        ...this.ycConfigurations.basic.nextBtn,
        text: config.nextBtnText
      },
      prevBtn: {
        ...this.ycConfigurations.basic.prevBtn,
        text: config.prevBtnText
      },
      showWeekNumbers: config.showWeekNumbers,
      weekStartsOn: +config.weekStartsOn
    };
  }

  onConfigBarToggled(value) {
    this.isConfigBarOpened = value;
  }
}
