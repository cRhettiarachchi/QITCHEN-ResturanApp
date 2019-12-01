import { Component, OnInit } from '@angular/core';
import {AuthService} from '../sign-in/auth.service';
import {UserModel} from '../models/user.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: UserModel;
  isFirstVisit: boolean;
  date = new Date();
  latestDate;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isFirstVisit = true;
    this.user = this.authService.getUser();
    this.authService.getUserSubject().subscribe(value => {
      this.user = value;
    });
    // if (this.isFirstVisit) {
    //   this.openSnackBar('Welcome ' + this.user.name + '!');
    // }
  }

  // openSnackBar(message: string) {
  //   this.snackBar.open(message, ' ', {
  //     duration: 5000,
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     panelClass: ['done']
  //   });
  //   this.isFirstVisit = false;
  // }

}
