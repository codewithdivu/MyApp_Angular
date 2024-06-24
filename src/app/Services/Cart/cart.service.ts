import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ROUTES, HOST_API } from '../../Constants/apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {}

  addProductToCart(productId: string, quantity: number = 1): Observable<any> {
    return this.http.post(`${HOST_API}${API_ROUTES.CART.ADD_CART}`, { productId, quantity })
      .pipe(
        map((response: any) => response.data.items),
        catchError(this.handleError)
      );
  }

  removeProductFromCart(productId: string): Observable<any> {
    return this.http.delete(`${HOST_API}${API_ROUTES.CART.REMOVE_CART}`, {body: { productId } })
      .pipe(
        map((response: any) => productId),
        catchError(this.handleError)
      );
  }

  fetchCart(): Observable<any> {
    return this.http.get(`${HOST_API}${API_ROUTES.CART.GET_CART}`, )
      .pipe(
        map((response: any) => response.data.items),
        catchError(this.handleError)
      );
  }

  emptyCart():Observable<any>{
    return this.http.delete(`${HOST_API}${API_ROUTES.CART.CART_EMPTY}`).pipe(map((response:any) => response.data.items ),
    catchError(this.handleError)
    
    )
  }

  incrementProductQuantity(productId: string): Observable<any> {
    return this.http.post(`${HOST_API}${API_ROUTES.CART.CART_INCREMENT}`, { productId }, )
      .pipe(
        map((response: any) => productId),
        catchError(this.handleError)
      );
  }

  decrementProductQuantity(productId: string): Observable<any> {
    return this.http.post(`${HOST_API}${API_ROUTES.CART.CART_DECREMENT}`, { productId }, )
      .pipe(
        map((response: any) => productId),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
