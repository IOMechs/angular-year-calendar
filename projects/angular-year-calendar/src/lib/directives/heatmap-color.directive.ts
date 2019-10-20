import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ycHeatmapColor]'
})
export class HeatmapColorDirective implements OnInit {
  @Input() value = 0;
  @Input() maxValue = null;
  @Input() primaryColor: number;
  @Input() secondaryColor: number;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    // apply the heatmap color
    this.applyColor();
  }

  /**
   * @author Ahsan Ayaz
   * @desc Applies the heatmap color as the background of the day
   */
  applyColor() {
    if (!this.value) {  // if the value on the day is undefined, assign 0
      this.value = 0;
    }
    const colorPercentage = (this.value / this.maxValue); // calculating percentage for hue value analysis
    this.el.nativeElement.style.backgroundColor = this.calculateColor(colorPercentage) ;  // assigns the background color here
  }

  calculateColor(percentageVal) {
    if (percentageVal === 0) {  // if the value on the day is 0, assign the background as transparent
      return 'transparent';
    }

    const colorRangeEnd = this.primaryColor;
    const colorRangeStart = this.secondaryColor;
    const percentFactor = (colorRangeEnd - colorRangeStart) * percentageVal;
    const colorToApply = percentFactor + colorRangeStart;

    // Return a CSS HSL string
    return `hsl( ${colorToApply}, 100%, 50%)`;
  }

}
