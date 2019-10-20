# AngularYearCalendar (@iomechs/angular-year-calendar)

## Usage

Install the package in your project's folder by using npm or yarn:
```bash
npm install @iomechs/angular-year-calendar --save
# OR
yarn add @iomechs/angular-year-calendar -S
```

Import YearCalendarModule in your AppModule as below:

```typescript
import { YearCalendarModule } from '@iomechs/angular-year-calendar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    YearCalendarModule, // <-- here
  ]
});
```

Then in your HTML, you can use as:
```html
<yc-year-calendar [loadingData]="isLoadingData"
  (viewYearChanged)="viewYearChangedHandler($event)" (eventDayClicked)="eventDayClickHandler($event);"
  [calendarOptions]="yearCalendarOptions" [selectedDate]="currentDate">
</yc-year-calendar>
```
