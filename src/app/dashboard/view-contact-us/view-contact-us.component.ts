import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {MessageModel} from '../../models/message.model';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.css']
})
export class ViewContactUsComponent implements OnInit {
  messages: MessageModel[];

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessages().subscribe(values => {
      this.messages = values.messages;
    });
  }

}
