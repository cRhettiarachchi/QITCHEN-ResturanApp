import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ContentModel} from '../../models/content.model';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.css']
})
export class LandingContentComponent implements OnInit {
  /*These are the all contents variables*/
  contents: ContentModel[] = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllcontents();
    this.contentService.contentAsObservable().subscribe((content) => {
      this.contents = content;
    });
    // console.log(this.contents);
  }

}
