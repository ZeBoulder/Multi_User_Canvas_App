import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _lang = new BehaviorSubject<string>('en');
  currentLanguage$ = this._lang.asObservable();

  constructor(private translate: TranslateService) {
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  public getCurrentLanguage(): string {
    return this._lang.value;
  }

  public setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    this._lang.next(lang);
  }

  public toggleLanguage(): void {
    const newLang = this._lang.value === 'en' ? 'de' : 'en';
    this.setLanguage(newLang);
  }
}
