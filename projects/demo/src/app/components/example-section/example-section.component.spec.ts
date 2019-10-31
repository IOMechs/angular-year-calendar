import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleSectionComponent } from './example-section.component';
import { YearCalendarModule } from 'projects/angular-year-calendar/src/public-api';

describe('ExampleSectionComponent', () => {
  let component: ExampleSectionComponent;
  let fixture: ComponentFixture<ExampleSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [YearCalendarModule],
      declarations: [ ExampleSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
