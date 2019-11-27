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
  private authStatus: boolean;
  private isAuthenticated = new Subject<boolean>();

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

  getAthentcatedStatus(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getAuthStatus() {
    return this.authStatus;
  }

  login(email: string, password: string) {
    const loginDetails = {email, password};
    this.http.post<{message: string, token: string}>(this.userUrl + 'login', loginDetails).subscribe(value => {
      this.token = value.token;
      this.message.next(value.message);
      if (this.token) {
        this.authStatus = true;
        this.isAuthenticated.next(true);
        this.router.navigate(['/dashboard']).then(r => {});
      }
    });
  }

  logout() {
    this.token = null;
    this.authStatus = false;
    this.isAuthenticated.next(false);
    this.router.navigate(['']).then(r => {});
  }
}
