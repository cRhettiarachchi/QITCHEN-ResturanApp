import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ContentModel} from '../../models/content.model';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.css']
})
export class LandingContentComponent implements OnInit {
  /*These are the all contents variables*/
  contents: ContentModel[] = [];
  pageSize = 5;
  total: 10;
  pageIndex = 1;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
    this.contentService.contentAsObservable().subscribe((content) => {
      this.contents = content;
    });
    // console.log(this.contents);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    console.log('---------------------' + this.pageIndex);
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
  }


}
