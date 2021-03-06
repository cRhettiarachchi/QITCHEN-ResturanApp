import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ContentService} from '../../services/content.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ContentModel} from '../../models/content.model';
import {group} from '@angular/animations';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  formValue: FormGroup;
  // imagePreview: string | ArrayBuffer = '';
  imagePreview: string | ArrayBuffer;
  message: string;
  type = 'create';
  id: string;
  content: ContentModel = null;
  isLoding = false;

  constructor(private contentService: ContentService, private router: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // get the id from the router
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) { // check if the router has an Id
        this.type = 'edit';
        this.id = paramMap.get('id');
        // set the values for the front end
        this.contentService.getContent(this.id).subscribe(value => {
          this.formValue.patchValue({heading: value.heading});
          this.formValue.patchValue({description: value.description});
          this.formValue.patchValue({category: value.category});
          this.formValue.patchValue({image: value.imagePath});
          this.formValue.patchValue({price: value.price});
        });
      } else {
        this.type = 'create';
        this.id = null;
      }
    });
    this.formValue = new FormGroup({ // create new form group
      // defining the values in the form
      heading: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]
        }),
      description: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(10)]
        }),
      category: new FormControl('Breakfast'),
      price: new FormControl( null,
        {validators: [Validators.required]
        }),
      image: new FormControl(null,
        {validators: [Validators.required]})
    }); // end of defining the form
  } // End of ngOnInit
  FormSubmit(formDirective: FormGroupDirective) {
    this.formValue.markAsPristine();
    this.formValue.markAsUntouched();
    if (!this.formValue.valid) { // check if form is valid ( part of front end validation )
      return;
    }
    this.isLoding = true;
    if (this.type === 'create') {
      this.contentService.postvalues(
        this.formValue.value.heading,
        this.formValue.value.description,
        this.formValue.value.category,
        this.formValue.value.price,
        this.formValue.value.image).subscribe(value => {
          this.isLoding = false;
          if (value.message === 'done') {
            this.formValue.reset({category: 'Breakfast'});
            formDirective.resetForm({category: 'Breakfast'});
            this.imagePreview = null;
            this.openSnackBar('Content Created Successfully');
          } else {
            this.openSnackBar('Content creation failed');
          }
      });
    } else {
      this.contentService.updateContent(this.id,
        this.formValue.value.heading,
        this.formValue.value.description,
        this.formValue.value.category,
        this.formValue.value.price,
        this.formValue.value.image).subscribe(value => {
          this.isLoding = false;
          if (value.message === 'done') {
            this.formValue.reset({category: 'Breakfast'});
            formDirective.resetForm({category: 'Breakfast'});
            this.imagePreview = null;
            this.openSnackBar('Content updated Successfully');
          } else {
            this.openSnackBar('Content update failed');
          }
      });
    }
  }

  onImagePick(event: Event) { // creating the preview
    const file = (event.target as HTMLInputElement).files[0];
    this.formValue.patchValue({image: file});
    this.formValue.get('image').updateValueAndValidity();
    console.log(this.formValue.value.image);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'ok', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['done']
    });
  }
}
