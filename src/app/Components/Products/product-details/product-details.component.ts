import { Store } from '@ngrx/store';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { ProductService } from '../../../Services/Product/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SpinnerLoadingComponent } from '../../Common/spinner-loading/spinner-loading.component';
import { CartState } from '../../../../store/reducers/cart.reducer';
import * as CartActions from '../../../../store/actions/cart.actions';
import { PATH_DASHBOARD } from '../../../Constants/path';
import { HotToastService } from '@ngxpert/hot-toast';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SpinnerLoadingComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private toastService = inject(HotToastService);
  cart$: Observable<any>;

  product: any;
  productId!: string;
  quantityCount: number = 1;

  updateInputValue(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.quantityCount = +newValue;
  }

  increment() {
    this.quantityCount++;
  }

  decrement() {
    if (this.quantityCount > 1) {
      this.quantityCount--;
    }
  }

  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<{ cart: CartState }>
  ) {
    this.cart$ = this.store
      .select((state) => state.cart.items)
      .pipe(tap((cart) => console.log('Cart Items:', cart)));
  }
  getCartProductQuantity(id: string): Observable<number> {
    return this.cart$.pipe(
      map((items: any) => {
        const item = items.find((item: any) => item._id === id);
        return item ? item.quantity : 0;
      })
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.spinner.show();
      // setTimeout(() => {
      this.loadProduct(this.productId);
      this.spinner.hide();
      // }, 1000);
      this.spinner.hide();
    });
  }

  addProduct(productId: string, quantityNum: number): void {
    this.store.dispatch(
      CartActions.addProductToCart({ productId, quantity: quantityNum })
    );
    this.toastService.success('Product Added Successfully.');
    this.router.navigate([PATH_DASHBOARD.general.checkout]);
  }

  loadProduct(id: string) {
    this.productService.getProduct(id).subscribe(
      (data: any) => {
        this.product = data.data;
        console.log('data', data.data);
        this.spinner.hide();
      },
      (error: any) => {
        console.error('Error fetching products:', error);
        this.spinner.hide();
      }
    );
  }
}
