import { Component, OnInit } from '@angular/core';
import {ContentModel} from '../../../models/content.model';
import {ContentService} from '../../../services/content.service';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.css']
})
export class DinnerComponent implements OnInit {

  contents: ContentModel[] = [];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.contents = this.contentService.getAllcontents();
    // this.contentService.contentAsObservable().subscribe((content: ContentModel[]) => {
    //   console.log('get content in component');
    //   this.contents = content;
    // });
    // console.log(this.contents);
  }
}
