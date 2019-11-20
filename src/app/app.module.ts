import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingHeadingComponent } from './landing-page/landing-heading/landing-heading.component';
import { LandingCategoriesComponent } from './landing-page/landing-categories/landing-categories.component';
import { LandingContentComponent } from './landing-page/landing-content/landing-content.component';
import { LandingNavComponent } from './landing-page/landing-nav/landing-nav.component';
import { BreakfastComponent } from './landing-page/landing-content/breakfast/breakfast.component';
import { LunchComponent } from './landing-page/landing-content/lunch/lunch.component';
import { DinnerComponent } from './landing-page/landing-content/dinner/dinner.component';
import { DesertsComponent } from './landing-page/landing-content/deserts/deserts.component';
import { CoffeeComponent } from './landing-page/landing-content/coffee/coffee.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LandingHeadingComponent,
    LandingCategoriesComponent,
    LandingContentComponent,
    LandingNavComponent,
    BreakfastComponent,
    LunchComponent,
    DinnerComponent,
    DesertsComponent,
    CoffeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
