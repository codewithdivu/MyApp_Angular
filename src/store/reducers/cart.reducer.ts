import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions'

export interface CartState {
  items: any[];
  loading: boolean;
  error: any;
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.fetchCart, CartActions.addProductToCart, CartActions.removeProductFromCart, CartActions.incrementProductQuantity, CartActions.decrementProductQuantity, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.fetchCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(CartActions.addProductToCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(CartActions.removeProductFromCartSuccess, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.productId !== productId),
    loading: false,
  })),
  on(CartActions.updateProductQuantitySuccess, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map(item => item.productId === productId ? { ...item, quantity } : item),
    loading: false,
  })),
  on(CartActions.cartError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);