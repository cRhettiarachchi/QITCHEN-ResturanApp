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
  private ExpirationTimer: any;
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
    this.http.post<{message: string, token: string, expiresIn: number}>(this.userUrl + 'login', loginDetails).subscribe(value => {
      this.token = value.token;
      this.message.next(value.message);
      if (this.token) {
        const expirationDuration = value.expiresIn;
        this.ExpirationTimer = setTimeout(() => {
          this.logout();
        }, expirationDuration * 1000);
        this.authStatus = true;
        this.isAuthenticated.next(true);
        const now = new Date();
        const expDate = new Date(now.getTime() + expirationDuration * 1000);
        console.log(expDate);
        this.saveAuthData(this.token);
        this.router.navigate(['/dashboard']).then(r => {});
      }
    });
  }

  autoAuthUser() {
    let token = this.authData();
    console.log(this.token);
    if(token) {
      this.token = token;
      this.authStatus = true;
      this.isAuthenticated.next(true);
    }
  }

  logout() {
    this.token = null;
    this.authStatus = false;
    this.isAuthenticated.next(false);
    clearTimeout(this.ExpirationTimer);
    this.clearAuthData();
    this.router.navigate(['']).then(r => {});
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private authData() {
    let token = localStorage.getItem('token');
    if (!token) {
      console.log('this is null : ' + token);
      return;
    }
    return token;
  }
}
