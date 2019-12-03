import { Injectable } from '@angular/core';
import {MessageModel} from '../models/message.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private messageUrl = 'http://eqitchen-env.maegvyxc6d.us-east-2.elasticbeanstalk.com/message';

  constructor(private http: HttpClient) { }
  createMessage(email: string, name: string, message: string) {
    const msg = {email, name, message};
    return this.http.post<{message: string}>(this.messageUrl, msg);
  }

  getMessages() {
    return this.http.get<{message: string, messages: any}>(this.messageUrl)
      .pipe(map((values) => {
        return values.messages.map(msg => {
          return {
            id: msg._id,
            message: msg.message,
            name: msg.name,
            email: msg.email
          };
        });
      }));
  }

  deleteMessage(id: string) {
    if (!id) {
      return;
    }
    return this.http.delete<{message: string, result: any}>(this.messageUrl + '/' + id);
  }
}
