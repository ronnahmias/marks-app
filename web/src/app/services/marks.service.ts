import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { IMarksResponse } from '../interfaces/marks.response.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MarksService {
  constructor(private http: HttpClient, private router: Router) {}

  public getMarksList(filters: any): Observable<IMarksResponse> {
    const token = localStorage.getItem('access-token');
    let apiUrl = environment.baseUrl + 'marks';
    const filterParams = Object.entries(filters);
    if (filterParams.length > 0) {
      apiUrl +=
        '?' + filterParams.map(([key, value]) => `${key}=${value}`).join('&');
    }
    return this.http
      .get<IMarksResponse>(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            alert('Error Please login again');
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
  }
}
