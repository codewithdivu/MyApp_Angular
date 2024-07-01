import { ProductService } from './../../../Services/Product/product.service';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, tap } from 'rxjs';
import { CartState } from '../../../../store/reducers/cart.reducer';
import * as CartActions from '../../../../store/actions/cart.actions';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PATH_DASHBOARD } from '../../../Constants/path';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-checkout.component.html',
  styleUrl: './product-checkout.component.css',
})
export class ProductCheckoutComponent {
  private toastService = inject(HotToastService);
  products: any[] = [];

  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  subtotal$: Observable<number>;
  total$: Observable<number>;

  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router,

    private productService: ProductService
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
    this.store.dispatch(CartActions.fetchCart());
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        if (res.success) {
          this.products = res.data;
          console.log('res.data', res.data);
        }
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addProduct(productId: string): void {
    this.store.dispatch(
      CartActions.addProductToCart({ productId, quantity: 1 })
    );
  }

  removeProduct(productId: string): void {
    this.store.dispatch(CartActions.removeProductFromCart({ productId }));
    this.toastService.success('Product Removed Successfully.');
  }

  incrementQuantity(productId: string): void {
    this.store.dispatch(CartActions.incrementProductQuantity({ productId }));
  }

  decrementQuantity(productId: string): void {
    this.store.dispatch(CartActions.decrementProductQuantity({ productId }));
  }

  handleProceedCheckout() {
    this.router.navigate([PATH_DASHBOARD.general.addressing]);
  }

  getProductQuantity(id: string) {
    return this.products.find((item) => item._id === id).quantity;
  }
}
