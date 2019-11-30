import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages.service';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.css']
})
export class ViewContactUsComponent implements OnInit {

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessages();
  }

}
