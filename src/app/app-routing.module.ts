import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {BreakfastComponent} from './landing-page/landing-content/breakfast/breakfast.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'breakfast', component: BreakfastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
