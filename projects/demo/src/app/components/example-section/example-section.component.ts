import { Component, OnInit, Input } from '@angular/core';
import { YCConfig, WeekNumberPipe } from 'projects/angular-year-calendar/src/public-api';

@Component({
  selector: 'ycd-example-section',
  templateUrl: './example-section.component.html',
  styleUrls: ['./example-section.component.scss']
})
export class ExampleSectionComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';
  @Input() ycConfig: YCConfig;
  @Input() loadingData = false;
  @Input() calendarDate = new Date();
  weekNumberPipe = new WeekNumberPipe();
  constructor() { }

  ngOnInit() {
  }

  yearChanged($event) {

  }

  dayClicked($event) {
    console.log(this.weekNumberPipe.transform($event.day.date, this.ycConfig.firstWeekMonth, this.ycConfig.weekStartsOn, this.calendarDate.getFullYear()))
  }

}
