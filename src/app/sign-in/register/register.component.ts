import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  cHide = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid || form.value.password !== form.value.cPassword) {
      return;
    }
    console.log(form);
    this.authService.createUser(form.value.email, form.value.name, form.value.password);
    form.resetForm();
    // this.authService.callMethod();
  }


}
