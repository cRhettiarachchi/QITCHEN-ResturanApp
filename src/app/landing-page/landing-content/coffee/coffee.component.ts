import { Component, OnInit } from '@angular/core';
import {ContentModel} from '../../../models/content.model';
import {ContentService} from '../../../services/content.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

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
