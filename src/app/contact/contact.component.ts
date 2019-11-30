import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessagesService} from '../services/messages.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  status: string;
  durationInSeconds = 5;
  constructor(private messageService: MessagesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.messageService.createMessage(form.value.email, form.value.name, form.value.message).subscribe(value => {
      this.status = value.message;
      if (this.status === 'Successful') {
        this.openSnackBar('Message sent successful');
      } else {
        this.openSnackBar('Message sent failed!');
      }
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'ok', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['done']
    });
  }
}
