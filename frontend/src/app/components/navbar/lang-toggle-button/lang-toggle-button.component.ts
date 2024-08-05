import { Component } from '@angular/core';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-lang-toggle',
  templateUrl: './lang-toggle-button.component.html',
  styleUrl: './lang-toggle-button.component.scss',
})
export class LangToggleButtonComponent {
  public faLanguage = faLanguage;
  public currentLang!: string;

  constructor(private _languageService: LanguageService) {}

  public ngOnInit(): void {
    this.currentLang = this._languageService.getCurrentLanguage();
  }

  public toggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this._languageService.setLanguage(this.currentLang);
  }

  get currentLangText(): string {
    return this.currentLang === 'en' ? 'EN' : 'DE';
  }
}
