import { Injectable } from '@angular/core';
import {MessageModel} from '../models/message.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messageUrl = 'http://localhost:8080/message';

  constructor(private http: HttpClient) { }
  createMessage(email: string, name: string, message: string) {
    const msg: MessageModel = {email, name, message};
    return this.http.post<{message: string}>(this.messageUrl, msg);
  }

  getMessages() {
    return this.http.get<{message: string, messages: MessageModel[]}>(this.messageUrl);
  }
}
