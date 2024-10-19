import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { RepoDetailsType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class RepoService {
  private apiBaseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  getRepoDetails() {
    return this.http
      .get<RepoDetailsType[]>(`${this.apiBaseUrl}/repos/details`, {
        withCredentials: true,
      })
      .pipe(catchError(() => of(null)));
  }

  setRepoAsIncluded(repoId: number, isIncluded: boolean) {
    return this.http
      .patch(
        `${this.apiBaseUrl}/repos/${repoId}/included`,
        { isIncluded },
        { withCredentials: true }
      )
      .pipe(catchError(() => of(null)));
  }
}
