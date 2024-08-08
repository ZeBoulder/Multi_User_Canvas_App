import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { WebService } from './web.service';
import { LoginRequestDTO } from '../interface/DTO/LoginRequestDTO';
import { LoginResponseDTO } from '../interface/DTO/LoginResponseDTO';
import { RegisterRequestDTO } from '../interface/DTO/RegisterRequestDTO';
import { RegisterResponseDTO } from '../interface/DTO/RegisterResponseDTO';
import { TokenValidationResponseDTO } from '../interface/DTO/TokenValidationResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUser: User | null = null;
  private _isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private _webService: WebService, private _router: Router) {}

  public getUser(): User | null {
    return this._currentUser;
  }

  public setUser(username: string, token: string): void {
    this._currentUser = { username, token };
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
    this._isAuthenticatedSubject.next(true);
  }

  public clearUser(): void {
    this._currentUser = null;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    this._isAuthenticatedSubject.next(false);
  }

  public isAuthenticated(): boolean {
    return !!this._currentUser;
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticatedSubject.asObservable();
  }

  public login(email: string, password: string): Observable<LoginResponseDTO> {
    return this._webService
      .post<LoginRequestDTO, LoginResponseDTO>('login', { email, password })
      .pipe(
        map((response) => {
          const token = response.token.replace('Bearer ', '');
          this.setUser(response.username, token);
          return response;
        })
      );
  }

  public register(
    email: string,
    username: string,
    password: string
  ): Observable<RegisterResponseDTO> {
    return this._webService.post<RegisterRequestDTO, RegisterResponseDTO>(
      'register',
      { email, username, password }
    );
  }

  public validateToken(token: string): Observable<boolean> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._webService
      .post<{}, TokenValidationResponseDTO>('validate-token', {}, headers)
      .pipe(
        map((response) => {
          if (response.valid && response.username) {
            this.setUser(response.username, token);
          }
          return response.valid;
        }),
        catchError((error) => {
          console.error('Token validation error:', error);
          this.clearUser();
          this._router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
