import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8888/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      map((res: any) => {
        if (res.success) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('myAppAuth', JSON.stringify(res.data));
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  register(signUpData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, signUpData).pipe(
      map((res: any) => {
        if (res.success) {
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).pipe(
      map((res: any) => {
        if (res.success) {
          localStorage.setItem('forgotPasswordEmail', email);
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  resetPassword(forgotPasswordData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/reset-password`, forgotPasswordData)
      .pipe(
        map((res: any) => {
          if (res.success) {
            localStorage.removeItem('forgotPasswordEmail');
          }
          return res;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }
}
