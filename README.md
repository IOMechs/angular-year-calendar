# Angular Year Calendar
##### @iomechs/angular-year-calendar

[![Actions Status](https://github.com/iomechs/angular-year-calendar/workflows/CI/badge.svg)](https://github.com/iomechs/angular-year-calendar/actions)


<a href="https://www.npmjs.com/package/@iomechs/angular-year-calendar"><img src="https://img.shields.io/npm/v/@iomechs/angular-year-calendar.svg" alt="npm version" ></a>
<a href="https://www.npmjs.com/package/@iomechs/angular-year-calendar"><img src="https://img.shields.io/github/stars/IOMechs/angular-year-calendar.svg?style=social&label=Star&style=flat-square" alt="github stars" ></a>
<a href="https://www.npmjs.com/package/@iomechs/angular-year-calendar"><img src="https://img.shields.io/npm/l/@iomechs/angular-year-calendar.svg?style=flat-square" alt="license" ></a>

<a href="https://www.npmjs.com/package/@iomechs/angular-year-calendar"><img src="https://img.shields.io/npm/dt/@iomechs/angular-year-calendar.svg?style=flat-square" alt="npm downloads total" ></a>
<a href="https://www.npmjs.com/package/ngx-device-detector"><img src="https://img.shields.io/npm/dm/@iomechs/angular-year-calendar.svg" alt="npm downloads/month" ></a>


A simple, easily to use Year calendar for your Angular apps.

![@iomechs/angular-year-calendar](https://i.imgur.com/IS6Sn66.gif)


## Demo

[https://iomechs.github.io/angular-year-calendar/demo](https://iomechs.github.io/angular-year-calendar/demo)

## Docs

[https://iomechs.github.io/angular-year-calendar](https://iomechs.github.io/angular-year-calendar)

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
<yc-year-calendar
  [loadingData]="isLoadingData"
  (viewYearChanged)="viewYearChangedHandler($event"
  (eventDayClicked)="eventDayClickHandler($event)"
  [ycConfig]="myCalendarConfig"
  [selectedDate]="currentDate">
</yc-year-calendar>
```
