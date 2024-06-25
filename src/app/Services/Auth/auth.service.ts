import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ROUTES, HOST_API } from '../../Constants/apiRoutes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<any> {
    return this.http
      .post(`${HOST_API}${API_ROUTES.AUTH.LOGIN}`, loginData)
      .pipe(
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
    return this.http
      .post(`${HOST_API}${API_ROUTES.AUTH.REGISTRATION}`, signUpData)
      .pipe(
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
    return this.http
      .post(`${HOST_API}${API_ROUTES.AUTH.FORGOT_PASSWORD}`, { email })
      .pipe(
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
      .post(`${HOST_API}${API_ROUTES.AUTH.RESET_PASSWORD}`, forgotPasswordData)
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
