import { createSlice } from '@reduxjs/toolkit';
import {toast} from 'react-toastify'

const getCartItemFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const cartItem = localStorage.getItem('cartItem');
    return cartItem ? JSON.parse(cartItem) : [];
  }
  return null;
};
const initialState = {
  cartItem: getCartItemFromLocalStorage(),
  totalAmount: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItem[itemIndex].cartQuantity += 1;
        toast.info(`increased ${action.payload.title} quantity`)
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItem.push(tempProduct);
         toast.info(`${action.payload.title} has been added to cart`);
      }

      if (typeof window != 'undefined') {
        localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
      }
    },
    clearCart(state, action) {
      state.cartItem = [];
      if (typeof window != 'undefined') {
        localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
      }
       toast.warn(`Cart items cleared`);
    },
    removeFromCart(state, action) {
      const filteredItems = state.cartItem.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItem = filteredItems;
       toast.warn(`${action.payload.title} removed from cart`);
      if (typeof window != 'undefined') {
        localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
      }
    },
    decreaseCartQty(state, action) {
      const itemIndex = state.cartItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1;
         toast.warn(`${action.payload.title} quantity decreased`);
      } else if (state.cartItem[itemIndex].cartQuantity == 1) {
        const filteredItems = state.cartItem.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );
        state.cartItem = filteredItems;
         toast.warn(`${action.payload.title} removed from cart`);
        if (typeof window != 'undefined') {
          localStorage.setItem('cartItem', JSON.stringify(state.cartItem));
        }
      }
    },
   
  },
});

export const { addToCart, removeFromCart, decreaseCartQty,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
