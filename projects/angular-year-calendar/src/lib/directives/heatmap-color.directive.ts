import { Directive, Input, ElementRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import tinyColor from 'tinycolor2';
@Directive({
  selector: '[ycHeatmapColor]'
})
export class HeatmapColorDirective implements OnInit, OnChanges {
  @Input() value = 0;
  @Input() maxValue = null;
  @Input() heatmapColor: string;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    // apply the heatmap color
    this.applyColor();
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    if (
      (simpleChange.value && simpleChange.value.currentValue !== simpleChange.value.previousValue) ||
      (simpleChange.maxValue && simpleChange.maxValue.currentValue !== simpleChange.maxValue.previousValue) ||
      (simpleChange.heatmapColor && simpleChange.heatmapColor.currentValue !== simpleChange.heatmapColor.previousValue)
    ) {
      this.applyColor();
    }
  }

  /**
   * @author Ahsan Ayaz
   * @desc Applies the heatmap color as the background of the day if company have no color
   */

  applyColor() {
    if (!this.heatmapColor) {
      return;
    }

    if (!this.value) {  // if the value on the day is undefined, assign 0
      this.value = 0;
    }
    const percentColor = this.getPercentageColor(this.heatmapColor, this.value, this.maxValue);
    this.el.nativeElement.style.backgroundColor = percentColor;

    if (percentColor !== 'transparent' && tinyColor(percentColor).isDark()) {
      this.el.nativeElement.style.color = '#fff';
    }
  }

  /**
   * @author Mohsin Ayaz
   * @desc Applies the heatmap color as the background color
   */

  getPercentageColor(heatmapColor, value, maxValue) {
    if (value === 0 ) {  // if the value on the day is 0, return the background as transparent
      return 'transparent';
    }
    const color = tinyColor(heatmapColor);
    const colorComponents = color.toHsl();
    maxValue = maxValue ? maxValue : 0;
    const perc = ((value / maxValue) * (100 - colorComponents.l));
    colorComponents.l = 100 - perc;
    colorComponents.l = Math.round(colorComponents.l);

    if (colorComponents.l < 0) {  // the max value is 100%
      colorComponents.l = 0;
    }

    return tinyColor(colorComponents).toHexString();
  }
}
