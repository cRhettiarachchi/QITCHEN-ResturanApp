import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContentService} from '../../services/content.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ContentModel} from '../../models/content.model';

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

  constructor(private contentService: ContentService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.type = 'edit';
        this.id = paramMap.get('id');
        this.contentService.getContent(this.id).subscribe(value => {
          this.content = {id: value._id,
            heading: value.heading,
            description: value.description,
            category: value.category
          };
          this.formValue.patchValue({heading: this.content.heading});
          this.formValue.patchValue({description: this.content.description});
          this.formValue.patchValue({category: this.content.category});
        });
      } else {
        this.type = 'create';
        this.id = null;
      }
    });
    this.formValue = new FormGroup({
      heading: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]
        }),
      description: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(10)]
        }),
      category: new FormControl('Breakfast'),
      image: new FormControl(null)
    });
  }
  FormSubmit() {
    if (!this.formValue.valid) {
      return;
    }
    if (this.type === 'create') {
      this.contentService.postvalues(
        this.formValue.value.heading,
        this.formValue.value.description,
        this.formValue.value.category);
      this.formValue.reset({category: 'Breakfast'});
    } else {
      this.contentService.updateContent(this.id,
        this.formValue.value.heading,
        this.formValue.value.description,
        this.formValue.value.category);
      this.formValue.reset({category: 'Breakfast'});
    }
  }

  onImagePick(event: Event) {
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
