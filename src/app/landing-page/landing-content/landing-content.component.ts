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
  pageSize = 1;
  total: number;
  pageIndex = 1;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
    this.contentService.contentAsObservable().subscribe((contentData) => {
      this.contents = contentData.contents;
      this.total = contentData.count;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
  }

}
