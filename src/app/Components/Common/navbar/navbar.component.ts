import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { PATH_AUTH } from '../../../Constants/path';
import { Observable, tap } from 'rxjs';
import { CartState } from '../../../../store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import * as CartActions from '../../../../store/actions/cart.actions';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: any = {};
  private toastService = inject(HotToastService);

  cart$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private router: Router,
    private store: Store<{ cart: CartState }>
    ) {
    if (localStorage.getItem('myAppAuth')) {
      const user: any = JSON.parse(localStorage.getItem('myAppAuth')!);
      this.user = user;
      console.log('this.user :>> ', this.user);
    }

    this.cart$ = this.store.select(state => state.cart.items).pipe(
      tap(cart => console.log('Cart Items:', cart))
    );
    this.loading$ = this.store.select(state => state.cart.loading).pipe(
      tap(loading => console.log('Loading:', loading))
    );
    this.error$ = this.store.select(state => state.cart.error).pipe(
      tap(error => console.log('Error:', error))
    );

  }

  ngOnInit(): void {
    this.store.dispatch(CartActions.fetchCart());
  }

  handleLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('myAppAuth');
    this.toastService.success('Successfully Logout.');
    this.router.navigate([PATH_AUTH.signin]);
  }
}
