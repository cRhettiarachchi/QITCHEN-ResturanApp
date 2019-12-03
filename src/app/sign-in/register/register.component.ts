import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  cHide = true;
  isLoding = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid || form.value.password !== form.value.cPassword) {
      return;
    }
    this.isLoding = true;
    this.authService.createUser(form.value.email, form.value.name, form.value.password).subscribe(result => {
      console.log(result);
      if ( result.message === 'failed') {
        this.openSnackBar('You already have an account!!');
        this.isLoding = false;
        return;
      }
      this.openSnackBar('Account creation successful!');
      this.isLoding = false;
    });
    form.resetForm();
    // this.authService.callMethod();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, ' ', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['done']
    });
  }

}
