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
  {path: 'sign-in', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
