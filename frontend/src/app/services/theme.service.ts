import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = new BehaviorSubject<string>('nord');
  public currentTheme$ = this._theme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme') || 'nord';
    this.setTheme(savedTheme);
  }

  public setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this._theme.next(theme);
  }

  public toggleTheme(): void {
    const newTheme = this._theme.value === 'nord' ? 'dark' : 'nord';
    this.setTheme(newTheme);
  }
}
