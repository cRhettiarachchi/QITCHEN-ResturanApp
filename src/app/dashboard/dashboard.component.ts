import { Component, OnInit } from '@angular/core';
import {AuthService} from '../sign-in/auth.service';
import {UserModel} from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserModel;
  date = new Date();
  latestDate;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.getUserSubject().subscribe(value => {
      this.user = value;
    });
  }

}
