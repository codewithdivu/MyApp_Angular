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
export class ProductService {

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(HOST_API+API_ROUTES.PRODUCT.GET_ALL_PRODUCT)
      .pipe(catchError(this.handleError));
  }

  getProduct(id:string):Observable<any>{
    return this.http.get<any>(HOST_API+API_ROUTES.PRODUCT.GET_PRODUCT.replace(":id",id))
  }



  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
