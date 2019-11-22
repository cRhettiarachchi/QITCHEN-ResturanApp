import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  formValue: FormGroup;
  // imagePreview: string | ArrayBuffer = '';
  imagePreview: string | ArrayBuffer;

  constructor() { }

  ngOnInit() {
    this.formValue = new FormGroup({
      heading: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur'
        }),
      description: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(10)],
          updateOn: 'blur'
        }),
      category: new FormControl('Breakfast'),
      image: new FormControl(null, {validators: [Validators.required]})
    });
  }
  FormSubmit() {
    console.log(this.formValue.value.heading + ' ' + this.formValue.value.description + ' ' + this.formValue.value.category);
    this.formValue.reset({category: 'Breakfast'});
  }

  onImagePick(event: Event) {
    console.log('this is executed');
    const file = (event.target as HTMLInputElement).files[0];
    this.formValue.patchValue({image: file});
    this.formValue.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
