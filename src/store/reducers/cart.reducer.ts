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
  on(CartActions.fetchCart,CartActions.emptyCart, CartActions.addProductToCart, CartActions.removeProductFromCart, CartActions.incrementProductQuantity, CartActions.decrementProductQuantity, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.fetchCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
  })),
  on(CartActions.emptyCartSuccess, (state, { items }) => ({
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
    items: state.items.filter(item => item._id !== productId),
    loading: false,
  })),
  // on(CartActions.updateProductQuantitySuccess, (state, { productId, quantity }) => ({
  //   ...state,
  //   items: state.items.map(item => item._id === productId ? { ...item, quantity } : item),
  //   loading: false,
  // })),
  on(CartActions.incrementProductQuantitySuccess, (state, { productId }) => ({
    ...state,
    items: state.items.map(item => 
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ),
    loading: false,
  })),
  on(CartActions.decrementProductQuantitySuccess, (state, { productId }) => ({
    ...state,
    items: state.items.map(item => 
      item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ),
    loading: false,
  })),
  on(CartActions.cartError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
