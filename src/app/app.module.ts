import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingHeadingComponent } from './landing-page/landing-heading/landing-heading.component';
import { LandingCategoriesComponent } from './landing-page/landing-categories/landing-categories.component';
import { LandingContentComponent } from './landing-page/landing-content/landing-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LandingHeadingComponent,
    LandingCategoriesComponent,
    LandingContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
