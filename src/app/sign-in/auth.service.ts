import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthDataModel} from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }
  createUser(email: string, name: string, password: string) {
    const authData: AuthDataModel = ({email, name, password});
    this.http.post(this.userUrl + 'sign-up', authData).subscribe(message => {
      console.log(message);
    });
  }
  callMethod(){
    this.http.get(this.userUrl).subscribe(value => {
      console.log(value);
    });
  }
  login(email: string, password: string) {
    const loginDetails = {email, password};
    return this.http.post<{message: string, token: string}>(this.userUrl + 'login', loginDetails);
  }
}
