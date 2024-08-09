import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(
    endpoint: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, { params, headers });
  }

  post<T, U>(endpoint: string, body: T, headers?: HttpHeaders): Observable<U> {
    //T is type of body sent, and U is type of response expected
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<U>(url, body, { headers });
  }

  put<T, U>(endpoint: string, body: T, headers?: HttpHeaders): Observable<U> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.put<U>(url, body, { headers });
  }

  delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url, { headers });
  }
}
