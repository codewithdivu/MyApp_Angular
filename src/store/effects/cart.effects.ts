import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CartActions from '../actions/cart.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../../app/Services/Cart/cart.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) {}

  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.fetchCart),
      mergeMap(() =>
        this.cartService.fetchCart().pipe(
          map(items => CartActions.fetchCartSuccess({ items })),
          catchError(error => of(CartActions.cartError({ error })))
        )
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      mergeMap(({ productId, quantity }) =>
        this.cartService.addProductToCart(productId, quantity).pipe(
          map(items => CartActions.addProductToCartSuccess({ items })),
          catchError(error => of(CartActions.cartError({ error })))
        )
      )
    )
  );

  removeProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeProductFromCart),
      mergeMap(({ productId }) =>
        this.cartService.removeProductFromCart(productId).pipe(
          map(() => CartActions.removeProductFromCartSuccess({ productId })),
          catchError(error => of(CartActions.cartError({ error })))
        )
      )
    )
  );

  // incrementProductQuantity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActions.incrementProductQuantity),
  //     mergeMap(({ productId }) =>
  //       this.cartService.incrementProductQuantity(productId).pipe(
  //         map(() => CartActions.updateProductQuantitySuccess({ productId, quantity: 1 })),
  //         catchError(error => of(CartActions.cartError({ error })))
  //       )
  //     )
  //   )
  // );

  // decrementProductQuantity$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(CartActions.decrementProductQuantity),
  //     mergeMap(({ productId }) =>
  //       this.cartService.decrementProductQuantity(productId).pipe(
  //         map(() => CartActions.updateProductQuantitySuccess({ productId, quantity: -1 })),
  //         catchError(error => of(CartActions.cartError({ error })))
  //       )
  //     )
  //   )
  // );

  incrementProductQuantity$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.incrementProductQuantity),
    mergeMap(({ productId }) =>
      this.cartService.incrementProductQuantity(productId).pipe(
        map(() => CartActions.incrementProductQuantitySuccess({ productId })),
        catchError(error => of(CartActions.cartError({ error })))
      )
    )
));

decrementProductQuantity$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.decrementProductQuantity),
    mergeMap(({ productId }) =>
      this.cartService.decrementProductQuantity(productId).pipe(
        map(() => CartActions.decrementProductQuantitySuccess({ productId })),
        catchError(error => of(CartActions.cartError({ error })))
      )
    )
));
}
