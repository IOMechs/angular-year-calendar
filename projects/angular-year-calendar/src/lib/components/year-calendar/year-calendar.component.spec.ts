import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCalendarComponent } from './year-calendar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeatmapColorDirective } from '../../directives/heatmap-color.directive';
import { OverlayModule } from '@angular/cdk/overlay';

describe('YearCalendarComponent', () => {
  let component: YearCalendarComponent;
  let fixture: ComponentFixture<YearCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      declarations: [YearCalendarComponent, HeatmapColorDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
