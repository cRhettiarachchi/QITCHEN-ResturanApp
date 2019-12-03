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
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllContentsComponent } from './dashboard/all-contents/all-contents.component';
import { AddContentComponent } from './dashboard/add-content/add-content.component';
import { ViewAboutUsComponent } from './dashboard/view-about-us/view-about-us.component';
import { ViewContactUsComponent } from './dashboard/view-contact-us/view-contact-us.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ContentComponent } from './landing-page/content/content.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';
import { LoginComponent } from './sign-in/login/login.component';
import { RegisterComponent } from './sign-in/register/register.component';
import {AuthInterceptor} from './sign-in/auth-interceptor';
import { RatingModule } from 'ngx-bootstrap/rating';


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
    CoffeeComponent,
    AboutUsComponent,
    ContactComponent,
    SignInComponent,
    DashboardComponent,
    AllContentsComponent,
    AddContentComponent,
    ViewAboutUsComponent,
    ViewContactUsComponent,
    ContentComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RatingModule.forRoot()
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
