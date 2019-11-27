import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../sign-in/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing-nav',
  templateUrl: './landing-nav.component.html',
  styleUrls: ['./landing-nav.component.css']
})
export class LandingNavComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthStatus();
    this.authSubscription = this.authService.getAthentcatedStatus().subscribe(status => {
        this.isAuthenticated = status;
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
}

}
