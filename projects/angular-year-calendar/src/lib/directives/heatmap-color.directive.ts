import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ycHeatmapColor]'
})
export class HeatmapColorDirective implements OnInit {
  @Input() value = 0;
  @Input() maxValue = null;
  @Input() primaryColor: number;
  @Input() secondaryColor: number;
  @Input() companyColor: string;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (!this.value) {  // if the value on the day is undefined, assign 0
      this.value = 0;
    }
    // apply the heatmap color
    this.el.nativeElement.style.backgroundColor = this.companyColor ? this.hexToHsl() : this.calculateColor();
  }

  /**
   * @author Ahsan Ayaz
   * @desc Applies the heatmap color as the background of the day if company have no color
   */

  calculateColor() {
    const colorPercentage = (this.value / this.maxValue);
    if (colorPercentage === 0) {  // if the value on the day is 0, return the background as transparent
      return 'transparent';
    }
    const colorRangeEnd = this.primaryColor;
    const colorRangeStart = this.secondaryColor;
    const percentFactor = (colorRangeEnd - colorRangeStart) * colorPercentage;
    const colorToApply = Math.round(percentFactor) + colorRangeStart;

    // Return a CSS HSL string
    return `hsl( ${colorToApply}, 100%, 50%)`;
  }

/**
 * @author Mohsin Ayaz
 * @desc Applies the heatmap color as the background of the day if company have color
 */

  hexToHsl() {
    if (this.value === 0 ) {  // if the value on the day is 0, return the background as transparent
      return 'transparent';
    }
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.companyColor);

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    h = Math.round(360 * h);

    // Calculate the color frequency of l value
    this.maxValue = this.maxValue ? this.maxValue : 0;
    const perc = ((this.value / this.maxValue) * (100 - l));
    l = 100 - perc;
    l = Math.round(l);

    // Return a CSS HSL string
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }
}
