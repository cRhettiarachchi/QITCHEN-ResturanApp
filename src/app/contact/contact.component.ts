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
      this.openSnackBar();
      return;
    }
    this.messageService.createMessage(form.value.email, form.value.name, form.value.message).subscribe(value => {
      this.status = value.message;
    });
  }
  openSnackBar() {
    this.snackBar.open('Please check the form', 'ok', {
      duration: 2000,
      horizontalPosition: 'right',
      panelClass: ['error']
    });
  }
}
