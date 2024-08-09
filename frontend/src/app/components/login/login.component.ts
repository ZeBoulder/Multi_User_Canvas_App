import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {
  faSignInAlt,
  faUserPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { tap, map, catchError, of, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public faSignInAlt: IconDefinition = faSignInAlt;
  public faUserPlus: IconDefinition = faUserPlus;

  public email: string = '';
  public password: string = '';
  public errorMessage: string = '';
  public loginResult$: Observable<string | null> = of(null);

  constructor(
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  public login(): void {
    this.loginResult$ = this.authenticationService
      .login(this.email, this.password)
      .pipe(
        tap(() => this.router.navigate(['/'])),
        map(() => null),
        catchError((error) => {
          if (error.status === 401) {
            return of(this.translateService.instant('Auth.InvalidCredentials'));
          } else {
            return of(this.translateService.instant('Auth.LoginError'));
          }
        })
      );
  }
}
