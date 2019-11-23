import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';
import {ContentModel} from '../../models/content.model';

@Component({
  selector: 'app-all-contents',
  templateUrl: './all-contents.component.html',
  styleUrls: ['./all-contents.component.css']
})
export class AllContentsComponent implements OnInit {
  allContents: ContentModel[] = [];

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

}
