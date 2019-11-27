import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDataModel} from './auth-data.model';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8080/users/';
  private token: string;
  private message = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }
  createUser(email: string, name: string, password: string) {
    const authData: AuthDataModel = ({email, name, password});
    this.http.post(this.userUrl + 'sign-up', authData).subscribe(message => {
      console.log(message);
    });
  }
  getToken() {
    return this.token;
  }
  getMessage(): Observable<string> {
    return this.message.asObservable();
  }

  login(email: string, password: string) {
    const loginDetails = {email, password};
    this.http.post<{message: string, token: string}>(this.userUrl + 'login', loginDetails).subscribe(value => {
      this.token = value.token;
      console.log('auth-service-toke ' + this.token);
      this.message.next(value.message);
      if (!this.token) {
        return;
      }
      this.router.navigate(['/dashboard']).then(r => {});
    });
  }
}
