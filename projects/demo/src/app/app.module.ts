import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YearCalendarModule } from '../../../angular-year-calendar/src/public-api';
import { ExampleSectionComponent } from './components/example-section/example-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YearCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
