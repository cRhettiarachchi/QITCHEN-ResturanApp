import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {BreakfastComponent} from './landing-page/landing-content/breakfast/breakfast.component';
import {LandingContentComponent} from './landing-page/landing-content/landing-content.component';
import {LunchComponent} from './landing-page/landing-content/lunch/lunch.component';
import {DinnerComponent} from './landing-page/landing-content/dinner/dinner.component';
import {DesertsComponent} from './landing-page/landing-content/deserts/deserts.component';
import {CoffeeComponent} from './landing-page/landing-content/coffee/coffee.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactComponent} from './contact/contact.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AllContentsComponent} from './dashboard/all-contents/all-contents.component';
import {AddContentComponent} from './dashboard/add-content/add-content.component';
import {ViewAboutUsComponent} from './dashboard/view-about-us/view-about-us.component';
import {ViewContactUsComponent} from './dashboard/view-contact-us/view-contact-us.component';
import {ContentComponent} from './landing-page/content/content.component';
import {LoginComponent} from './sign-in/login/login.component';
import {RegisterComponent} from './sign-in/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {path: '', component: LandingContentComponent},
      {path: 'breakfast', component: BreakfastComponent},
      {path: 'lunch', component: LunchComponent},
      {path: 'dinner', component: DinnerComponent},
      {path: 'deserts', component: DesertsComponent},
      {path: 'coffee', component: CoffeeComponent}
    ]
  },
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'user', component: SignInComponent,
  children: [
    {path: 'sign-in', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
  ]},
  {path: 'content/:id', component: ContentComponent},
  {path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: AllContentsComponent},
      {path: 'add-content', component: AddContentComponent},
      {path: 'edit/:id', component: AddContentComponent},
      {path: 'view-about-us', component: ViewAboutUsComponent},
      {path: 'view-contact-us', component: ViewContactUsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
