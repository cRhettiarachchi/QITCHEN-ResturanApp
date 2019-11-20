import { Component, OnInit } from '@angular/core';
import {ContentService} from '../../services/content.service';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.css']
})
export class LandingContentComponent implements OnInit {
  /*These are the all contents variables*/

  constructor(private contentService: ContentService) { }

  ngOnInit() {
  }

}
