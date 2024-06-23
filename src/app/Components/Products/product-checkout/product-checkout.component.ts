import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { CartState } from '../../../../store/reducers/cart.reducer';
import * as CartActions from '../../../../store/actions/cart.actions';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-checkout.component.html',
  styleUrl: './product-checkout.component.css'
})
export class ProductCheckoutComponent {
  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<{ cart: CartState }>) {
    this.cart$ = this.store.select(state => state.cart.items).pipe(
      tap(cart => console.log('Cart Items:', cart))
    );
    this.loading$ = this.store.select(state => state.cart.loading).pipe(
      tap(loading => console.log('Loading:', loading))
    );
    this.error$ = this.store.select(state => state.cart.error).pipe(
      tap(error => console.log('Error:', error))
    );
    console.log('this.cart$ :>> ', this.cart$);
  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.fetchCart());
  }

  addProduct(productId: string): void {
    this.store.dispatch(CartActions.addProductToCart({ productId, quantity: 1 }));
  }

  removeProduct(productId: string): void {
    this.store.dispatch(CartActions.removeProductFromCart({ productId }));
  }

  incrementQuantity(productId: string): void {
    this.store.dispatch(CartActions.incrementProductQuantity({ productId }));
  }

  decrementQuantity(productId: string): void {
    this.store.dispatch(CartActions.decrementProductQuantity({ productId }));
  }
}