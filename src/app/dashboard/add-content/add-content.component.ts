import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  formValue: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formValue = new FormGroup({
      heading: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]
        }),
      description: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(10)]
        })
    });
  }
  FormSubmit(){
    console.log(this.formValue.value.heading + ' ' + this.formValue.value.description);
    this.formValue.reset();
  }

}
