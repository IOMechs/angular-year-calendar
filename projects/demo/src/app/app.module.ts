import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ExampleSectionComponent } from "./components/example-section/example-section.component";
import { ConfigSideBarComponent } from "./components/config-side-bar/config-side-bar.component";
import { YearCalendarModule } from "@iomechs/angular-year-calendar";
// import { YearCalendarModule } from "../../../angular-year-calendar/src/public-api";

@NgModule({
  declarations: [AppComponent, ExampleSectionComponent, ConfigSideBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YearCalendarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
