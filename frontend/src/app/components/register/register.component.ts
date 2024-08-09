import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSignInAlt,
  faUserPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public faSignInAlt: IconDefinition = faSignInAlt;
  public faUserPlus: IconDefinition = faUserPlus;

  public email: string = '';
  public username: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public errorMessage: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  public register(): void {
    if (this.password !== this.repeatPassword) {
      this.errorMessage = this.translateService.instant(
        'User.PasswordMatchError'
      );
      return;
    }
    this.authenticationService
      .register(this.email, this.username, this.password)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = this.translateService.instant(
            'User.RegistrationError'
          );
        }
      );
  }
}
