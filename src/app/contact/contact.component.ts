import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.messageService.createMessage(form.value.email, form.value.name, form.value.message).subscribe(value => {
      console.log(value);
    });
  }

}
