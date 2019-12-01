import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCalendarComponent } from './year-calendar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeatmapColorDirective } from '../../directives/heatmap-color.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { DEFAULT_CONFIG } from '../../constants/default-config';

describe('YearCalendarComponent', () => {
  let component: YearCalendarComponent;
  let fixture: ComponentFixture<YearCalendarComponent>;
  const twentyNineteen = 2019;
  const twentyTwentyOne = 2021;
  const twentyTwentyTwo = 2022;
  const twentyTwentySeven = 2027;

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
    component.selectedDate = new Date(twentyNineteen, 0, 1);
    fixture.detectChanges();
  });

  describe('default config', () => {
    beforeEach(() => {
      component.ycConfig = {...DEFAULT_CONFIG};
    });
    afterEach(() => {
      component.ycConfig = {...DEFAULT_CONFIG};
    });

    it('should start the day from Sunday with default (0) weekStartsOn', () => {
      component.render(twentyNineteen);
      expect(component.daysOfWeek).toEqual([ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]);
    });

    it('should start the days from Wednesday with weekStartsOn set to 3', () => {
      component.ycConfig.weekStartsOn = 3;
      component.render(twentyNineteen);
      expect(component.daysOfWeek).toEqual([ 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu' ]);
    });
  });

  describe('weekStartsOn set to 1. I.e. Monday', () => {
    beforeEach(() => {
      component.ycConfig = {...DEFAULT_CONFIG, ...{showWeekNumbers: true, weekStartsOn: 1}};
    });

    afterEach(() => {
      component.ycConfig = {...DEFAULT_CONFIG, ...{showWeekNumbers: true, weekStartsOn: 1}};
    });

    it('should have the correct first week numbers for 2019', () => {
      component.render(twentyNineteen);
      expect(component.yearData[0].weekNumbers).toEqual([ 1, 2, 3, 4, 5 ]);
    });

    it('should have the correct first week numbers for 2021', () => {
      component.render(twentyTwentyOne);
      expect(component.yearData[0].weekNumbers).toEqual([ 53, 1, 2, 3, 4]);
    });

    it('should have the correct first week numbers for 2022', () => {
      component.render(twentyTwentyTwo);
      expect(component.yearData[0].weekNumbers).toEqual([ 52, 1, 2, 3, 4, 5]);
    });

    it('should have the correct first week numbers for 2027', () => {
      component.render(twentyTwentySeven);
      expect(component.yearData[0].weekNumbers).toEqual([ 53, 1, 2, 3, 4]);
    });
  });

  describe('weekStartsOn set to 3. I.e. Wednesday', () => {
    beforeEach(() => {
      component.ycConfig = {...DEFAULT_CONFIG, ...{showWeekNumbers: true, weekStartsOn: 3}};
    });

    afterEach(() => {
      component.ycConfig = {...DEFAULT_CONFIG, ...{showWeekNumbers: true, weekStartsOn: 3}};
    });

    it('should have the correct first week numbers for 2019', () => {
      component.render(twentyNineteen);
      expect(component.yearData[0].weekNumbers).toEqual([ 52, 1, 2, 3, 4, 5 ]);
    });

    it('should have the correct first week numbers for 2021', () => {
      component.render(twentyTwentyOne);
      expect(component.yearData[0].weekNumbers).toEqual([ 1, 2, 3, 4, 5]);
    });

    it('should have the correct first week numbers for 2022', () => {
      component.render(twentyTwentyTwo);
      expect(component.yearData[0].weekNumbers).toEqual([ 1, 2, 3, 4, 5]);
    });

    it('should have the correct first week numbers for 2027', () => {
      component.render(twentyTwentySeven);
      expect(component.yearData[0].weekNumbers).toEqual([ 1, 2, 3, 4, 5]);
    });
  });

  describe('Week 5 is the first week of the year', () => {
    beforeEach(() => {
      component.ycConfig = {
        ...DEFAULT_CONFIG,
        ...{
          showWeekNumbers: true,
          weekStartsOn: 0,
          firstWeekMonth: {
            month: 0,
            week: 4
          }
        }
      };
    });

    it('should have the correct first week numbers for 2019', () => {
      component.render(twentyNineteen);
      expect(component.yearData[0].weekNumbers).toEqual([ 49, 50, 51, 52, 1 ]);
    });

    it('should have the correct first week numbers for 2021', () => {
      component.render(twentyTwentyOne);
      expect(component.yearData[0].weekNumbers).toEqual([ 49, 50, 51, 52, 53, 1 ]);
    });
  });

  describe('With sunday as week start and march 7th as forced date', () => {
    beforeEach(() => {
      component.ycConfig = {
        ...DEFAULT_CONFIG,
        ...{
          showWeekNumbers: true,
          weekStartsOn: 0,
          firstWeekMonth: {
            month: 0,
            week: 4
          },
          forceWeekDate: {
            month: 2,
            date: 7
          },
          forceWeek: true
        }
      };
    });

    it('should have the correct first week numbers for 2019', () => {
      component.render(twentyNineteen);
      expect(component.yearData[2].weekNumbers).toEqual([ 52, 1, 2, 3, 4, 5 ]);
    });

    it('should have the correct first week numbers for 2021', () => {
      component.render(twentyTwentyOne);
      expect(component.yearData[2].weekNumbers).toEqual([ 52, 1, 2, 3, 4 ]);
    });
  });

});
