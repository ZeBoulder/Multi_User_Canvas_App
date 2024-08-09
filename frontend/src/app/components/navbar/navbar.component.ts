import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { filter, Subscription } from 'rxjs';
import {
  faPaintBrush,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authSubscription!: Subscription;
  public isAuthenticated = false;
  public username: string = '';

  private routeSubscription!: Subscription;
  public currentRoute: string = '';

  public faPaintBrush: IconDefinition = faPaintBrush;
  public faSignInAlt: IconDefinition = faSignInAlt;
  public faSignOutAlt: IconDefinition = faSignOutAlt;
  public faUserPlus: IconDefinition = faUserPlus;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
      });
  }

  public ngOnInit(): void {
    this.authSubscription =
      this.authenticationService.isAuthenticated$.subscribe(
        (isAuthenticated) => {
          this.isAuthenticated = isAuthenticated;
          this.username = this.authenticationService.getUser()?.username || '';
        }
      );
  }

  public logout(): void {
    this.authenticationService.clearUser();
    this.router.navigate(['/login']);
  }

  public ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}
