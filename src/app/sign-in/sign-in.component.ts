import { Component, OnInit } from '@angular/core';
import {ContentService} from '../services/content.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }
  signIn() {
    console.log('button clicked');
    this.contentService.signed(true);
  }

}
