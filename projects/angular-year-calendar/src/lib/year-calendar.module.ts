import { ModuleWithProviders, NgModule } from "@angular/core";
import { YearCalendarComponent } from "./components/year-calendar/year-calendar.component";
import { YearCalendarService } from "./year-calendar.service";
import { CommonModule } from "@angular/common";
import { HeatmapColorDirective } from "./directives/heatmap-color.directive";
import { OverlayModule } from "@angular/cdk/overlay";
import { WeekNumberPipe } from "./pipes/week-number/week-number.pipe";

@NgModule({
  declarations: [YearCalendarComponent, HeatmapColorDirective, WeekNumberPipe],
  imports: [CommonModule, OverlayModule],
  exports: [YearCalendarComponent, HeatmapColorDirective, WeekNumberPipe],
})
export class YearCalendarModule {
  static forRoot(): ModuleWithProviders<YearCalendarModule> {
    return {
      ngModule: YearCalendarModule,
      providers: [YearCalendarService],
    };
  }
}
