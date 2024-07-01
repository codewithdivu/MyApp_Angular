import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { CartState } from '../../../../store/reducers/cart.reducer';
import { Router } from '@angular/router';
import * as CartActions from '../../../../store/actions/cart.actions';
import { PATH_DASHBOARD } from '../../../Constants/path';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-billing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-billing.component.html',
  styleUrls: ['./product-billing.component.css'],
})
export class ProductBillingComponent {
  private toastService = inject(HotToastService);

  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  subtotal$: Observable<number>;
  total$: Observable<number>;

  checkoutAddress: any;
  showCreditCardDetails = false;
  paymentType = true;

  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items:', cart)));
    this.loading$ = this.store
      .select((state) => state.cart.loading)
      .pipe(tap((loading) => console.log('Loading:', loading)));
    this.error$ = this.store
      .select((state) => state.cart.error)
      .pipe(tap((error) => console.log('Error:', error)));
    console.log('this.cart$ :>> ', this.cart$);
    this.subtotal$ = this.cart$.pipe(
      map((items) =>
        items.reduce(
          (sum: any, item: any) => sum + item.price * item.quantity,
          0
        )
      )
    );
    this.total$ = this.subtotal$.pipe(map((subtotal) => subtotal + 10));
  }

  ngOnInit(): void {
    const addressData = localStorage.getItem('CheckOutAddress');
    this.checkoutAddress = addressData ? JSON.parse(addressData) : null;
    this.store.dispatch(CartActions.fetchCart());
  }

  editAddress() {
    this.router.navigate([PATH_DASHBOARD.general.addressing]);
  }

  placeOrder() {
    this.store.dispatch(CartActions.emptyCart());
    localStorage.removeItem('CheckOutAddress');
    this.toastService.success('Your Order Successfully Placed...');
    this.router.navigate([PATH_DASHBOARD]);
  }

  toggleCreditCard(show: boolean) {
    this.showCreditCardDetails = show;
  }
}
