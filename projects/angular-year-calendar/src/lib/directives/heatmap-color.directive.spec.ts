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
      [heatmapColor]="heatmapColorHex">
    </div>
  `
})
class TestHeatmapColorComponent {
  dayValue = 0;
  heatmapColorHex = '';
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

  describe('With 6 digit hex color', () => {
    it('should set the background color of the day value to rgb(179, 179, 179) provided day value is 3 and hex color is #333333', () => {
      component.dayValue = 3;
      component.heatmapColorHex = '#333333';
      fixture.detectChanges();
      expect(inputEl.nativeElement.style.backgroundColor).toBe('rgb(179, 179, 179)');
    });
  });

  describe('With 3 digit hex color', () => {
    it('should set the background color of the day value to rgb(179, 179, 179) provided day value is 3 and hex color is #333', () => {
      component.dayValue = 3;
      component.heatmapColorHex = '#333';
      fixture.detectChanges();
      expect(inputEl.nativeElement.style.backgroundColor).toBe('rgb(179, 179, 179)');
    });
  });
});
