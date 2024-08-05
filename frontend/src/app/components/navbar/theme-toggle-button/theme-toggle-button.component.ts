import { Component } from '@angular/core';
import {
  faSun,
  faMoon,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle-button.component.html',
  styleUrl: './theme-toggle-button.component.scss',
})
export class ThemeToggleButtonComponent {
  public faSun: IconDefinition = faSun;
  public faMoon: IconDefinition = faMoon;
  public currentTheme$: Observable<string>;

  constructor(private _themeService: ThemeService) {
    this.currentTheme$ = this._themeService.currentTheme$;
  }

  public toggleTheme(): void {
    this._themeService.toggleTheme();
  }
}
