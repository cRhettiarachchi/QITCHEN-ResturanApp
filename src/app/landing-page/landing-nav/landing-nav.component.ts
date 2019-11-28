import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../sign-in/auth.service';
import {Subscription} from 'rxjs';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css']
})
export class LandingNavComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  type = 'user';
  authSubscription: Subscription;
  userSubscription: Subscription;
  user: UserModel;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (this.chackUserAvailable(this.authService.getUser())) {
      this.type = this.authService.getUser().type;
    } else {
      this.type = 'user';
    }
    this.userSubscription = this.authService.getUserSubject().subscribe(value => {
      if (value) {
        this.type = value.type;
      } else {
        this.type = 'user';
      }
    });
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authSubscription = this.authService.getAthentcatedStatus().subscribe(status => {
        this.isAuthenticated = status;
      }
    );
  }

  chackUserAvailable(user: UserModel) {
    if (!user) {
      return false;
    }
    return true;
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
}

}
