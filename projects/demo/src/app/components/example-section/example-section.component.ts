import { Component, OnInit, Input, ViewChild, TemplateRef, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { YCConfig, WeekNumberPipe } from 'projects/angular-year-calendar/src/public-api';

@Component({
  selector: 'ycd-example-section',
  templateUrl: './example-section.component.html',
  styleUrls: ['./example-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSectionComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() description = '';
  @Input() ycConfig: YCConfig;
  @Input() loadingData = false;
  @Input() calendarDate = new Date();
  @ViewChild('customHeaderTemplate', { static: true }) customHeaderTemplate: TemplateRef<any>;
  weekNumberPipe = new WeekNumberPipe();
  constructor() { }

  ngOnInit() {
    this.ycConfig = {
      ...this.ycConfig,
      headerTemplate: this.customHeaderTemplate
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ycConfig = {
      ...this.ycConfig,
      headerTemplate: this.customHeaderTemplate
    };
  }

  yearChanged($event) {
    this.calendarDate = new Date($event, this.calendarDate.getMonth(), this.calendarDate.getDate());
  }

  dayClicked($event) {
    console.log(this.weekNumberPipe.transform($event.day.date, this.ycConfig, this.calendarDate.getFullYear()));
  }

}
