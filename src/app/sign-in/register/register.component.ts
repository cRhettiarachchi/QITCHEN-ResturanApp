import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  cHide = true;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.invalid || form.value.password !== form.value.cPassword) {
      return;
    }
    console.log(form.value.email);
  }


}
