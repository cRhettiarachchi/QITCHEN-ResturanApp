import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../services/messages.service';
import {MessageModel} from '../../models/message.model';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-view-contact-us',
  templateUrl: './view-contact-us.component.html',
  styleUrls: ['./view-contact-us.component.css']
})
export class ViewContactUsComponent implements OnInit {
  messages: MessageModel[];

  constructor(private messageService: MessagesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.messageService.getMessages().subscribe(values => {
      this.messages = values;
    });
  }

  onDelete(id: string) {
    console.log(id);
    this.messageService.deleteMessage(id).subscribe(values => {
      if (values.message === 'done') {
        this.openSnackBar('Message Deleted');
        this.messages = this.messages.filter(message => message.id !== id);
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, ' ', {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['deleted']
    });
  }
}
