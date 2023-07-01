import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post(`${environment.baseUrl}auth/login`, loginData).pipe(
      tap((response: any) => {
        return;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
