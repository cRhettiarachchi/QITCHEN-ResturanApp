import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  msg: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    this.authService.getMessage().subscribe(value => {
      this.msg = value;
    });
  }

}

// .subscribe(value => {
//   this.msg = value.message;
//   console.log(this.msg);
//   if (!value.token) {
//     return;
//   }
// });
