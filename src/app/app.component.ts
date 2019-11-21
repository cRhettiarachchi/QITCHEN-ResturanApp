import {Component, OnInit} from '@angular/core';
import {ContentService} from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSigned = false;
  constructor(private valueService: ContentService) {}

  ngOnInit() {
    this. isSigned = this.valueService.checkSigned();
  }
}
