import { Component, OnInit } from '@angular/core';
import {ContentModel} from '../../../models/content.model';
import {ContentService} from '../../../services/content.service';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css']
})
export class DinnerComponent implements OnInit {

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
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    console.log('---------------------' + this.pageIndex);
    this.contentService.getAllcontents(this.pageSize, this.pageIndex);
  }
}
