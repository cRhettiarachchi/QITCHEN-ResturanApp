import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDataModel} from './auth-data.model';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {UserModel} from '../models/user.model';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://eqitchen-env.maegvyxc6d.us-east-2.elasticbeanstalk.com/users/';
  // private userUrl = 'http://localhost:8080/users/';
  private token: string;
  private message = new Subject<string>();
  private userSubject = new Subject<UserModel>();
  private authStatus: boolean;
  private ExpirationTimer: any;
  private user: UserModel;
  private isAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }
  createUser(email: string, name: string, password: string) {
    const authData: AuthDataModel = ({email, name, password});
    return this.http.post<{message: string, data: UserModel}>(this.userUrl + 'sign-up', authData);
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

  getUser() {
    return this.user;
  }

  getUserSubject() {
    return this.userSubject.asObservable();
  }

  login(email: string, password: string) {
    const loginDetails = {email, password};
    // tslint:disable-next-line:max-line-length
    this.http.post<{message: string, token: string, expiresIn: number, user: UserModel}>(this.userUrl + 'login', loginDetails).subscribe(value => {
      this.token = value.token;
      this.message.next(value.message);
      if (this.token) {
        const expirationDuration = value.expiresIn;
        this.ExpirationTimer = setTimeout(() => {
          this.logout();
        }, expirationDuration * 1000);
        this.authStatus = true;
        this.isAuthenticated.next(true);
        this.user = value.user;
        this.userSubject.next(value.user);
        const now = new Date();
        const expDate = new Date(now.getTime() + expirationDuration * 1000);
        this.saveAuthData(this.token, this.user);
        this.router.navigate(['/dashboard']).then(r => {
          this.openSnackBar('Welcome ' + this.user.name);
        });
      }
    });
  }

  autoAuthUser() {
    const value = this.authData();
    if (value) {
      this.token = value.token;
      this.user = value.user;
      this.authStatus = true;
      this.isAuthenticated.next(true);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, ' ', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['done']
    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.userSubject.next(null);
    this.authStatus = false;
    this.isAuthenticated.next(false);
    clearTimeout(this.ExpirationTimer);
    this.clearAuthData();
    this.router.navigate(['']).then(r => {});
  }

  private saveAuthData(token: string, user: UserModel) {
    console.log(user);
    localStorage.setItem('token', token);
    localStorage.setItem('email', user.email);
    localStorage.setItem('id', user.id);
    localStorage.setItem('type', user.type);
    localStorage.setItem('name', user.name);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('type');
    localStorage.removeItem('name');
  }

  private authData() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const type = localStorage.getItem('type');
    if (!token) {
      return;
    }
    return {token, user: {email, id, name, type}};
  }
}
