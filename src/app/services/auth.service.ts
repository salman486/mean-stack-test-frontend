import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserType } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserType | null> {
    return this.http
      .get<UserType>(`${this.apiBaseUrl}/users/me`, { withCredentials: true })
      .pipe(catchError(() => of(null)));
  }

  disconnectAccount() {
    return this.http.delete(`${this.apiBaseUrl}/auth/disconnect`, {
      withCredentials: true,
    });
  }

  loginWithGithub() {
    window.open(`${this.apiBaseUrl}/auth/github`, '_self');
  }
}
