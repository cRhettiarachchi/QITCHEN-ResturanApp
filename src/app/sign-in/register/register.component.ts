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
  pass: string;
  confirmPass: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(form.invalid) {
      return;
    }
    console.log(form);
  }

  onChange(pass: string, cPass: string) {
    this.pass = pass;
    this.confirmPass = cPass;
    console.log(pass);
  }

}
