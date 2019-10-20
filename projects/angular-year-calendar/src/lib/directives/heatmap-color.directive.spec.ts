import { HeatmapColorDirective } from './heatmap-color.directive';
import { DebugElement, Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div
      ycHeatmapColor
      [value]="dayValue"
      [maxValue]="10"
      [primaryColor]="0"
      [secondaryColor]="60">
    </div>
  `
})
class TestHeatmapColorComponent {
  dayValue = 3;
}

describe('HeatmapColorDirective', () => {
  let inputEl: DebugElement;
  let fixture: ComponentFixture<TestHeatmapColorComponent>;
  let component: TestHeatmapColorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeatmapColorDirective, TestHeatmapColorComponent]
    });
    fixture = TestBed.createComponent(TestHeatmapColorComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));
  });

  it('should create an instance', () => {
    const directive = new HeatmapColorDirective(inputEl);
    expect(directive).toBeTruthy();
  });

  it('should set the background color of the day value to rgb(255, 179, 0) provided day value is 3', () => {
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('rgb(255, 179, 0)');
  });
});
