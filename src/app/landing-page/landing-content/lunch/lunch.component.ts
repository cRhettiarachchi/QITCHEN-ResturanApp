import { Component, OnInit } from '@angular/core';
import {ContentModel} from '../../../models/content.model';
import {ContentService} from '../../../services/content.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']
})
export class LunchComponent implements OnInit {

  contents: ContentModel[] = [];
  pageSize = 6;
  total: number;
  pageIndex = 1;
  isLoding = false;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.isLoding = true;
    this.contentService.getSingleType('lunch', this.pageSize, this.pageIndex);
    this.contentService.contentAsObservable().subscribe((contentData) => {
      this.isLoding = false;
      this.contents = contentData.contents;
      this.total = contentData.count;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.contentService.getSingleType('lunch', this.pageSize, this.pageIndex);
  }


}
