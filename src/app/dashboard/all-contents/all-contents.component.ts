import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ContentModel} from '../../models/content.model';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-all-contents',
  templateUrl: './all-contents.component.html',
  styleUrls: ['./all-contents.component.css']
})
export class AllContentsComponent implements OnInit {
  allContents: ContentModel[] = [];
  pageSize = 5;
  total = 10;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contentService.getAllcontents();
    this.contentService.contentAsObservable().subscribe((content) => {
      this.allContents = content;
      console.log(this.allContents);
    });
  }

  onDelete(id: string) {
    this.contentService.deleteContent(id);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
  }

}
