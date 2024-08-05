import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import {
  faPaintBrush,
  faSignInAlt,
  faSignOutAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _authSubscription!: Subscription;
  public isAuthenticated = false;
  public username: string = '';

  private _routeSubscription!: Subscription;
  public currentRoute: string = '';

  public faPaintBrush: IconDefinition = faPaintBrush;
  public faSignInAlt: IconDefinition = faSignInAlt;
  public faSignOutAlt: IconDefinition = faSignOutAlt;
  public faUserPlus: IconDefinition = faUserPlus;

  // constructor(private translate: TranslateService) {}

  // ngOnInit() {
  //   console.log('Current language:', this.translate.currentLang);
  //   this.translate.get('Navbar.Welcome').subscribe((res) => {
  //     console.log('Translation for "Navbar.Welcome":', res);
  //   });
  // }
  constructor() {}

  public ngOnInit(): void {
    // TODO: check route and auth status
  }

  public logout(): void {
    // TODO: Implement logout
  }

  public ngOnDestroy(): void {
    // TODO: Dont forget to unsubscribe
  }
}
