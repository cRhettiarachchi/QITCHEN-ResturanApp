import { Component, OnInit } from '@angular/core';
import {ContentModel} from '../../models/content.model';
import {ContentService} from '../../services/content.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {


  content: ContentModel;
  constructor(private contentService: ContentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.contentService.getContent(paramMap.get('id')).subscribe(value => {
          this.content = {
            id: value._id,
            heading: value.heading,
            description: value.description,
            category: value.category,
            imagePath: value.imagePath
          };
        });
      }
    });
  }

}
