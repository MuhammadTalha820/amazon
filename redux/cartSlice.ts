import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

// Define a type for the slice state
interface cartState {
  cart: any[]
}

// Define the initial state using that type
const initialState: cartState = {
  cart: []
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const existingItem = state.cart.find((item: any) => item.id === action.payload.id);
      if (existingItem) {
        state.cart = state.cart.map((item: any) => {
          return item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        });
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromTheCart: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.filter((item: any) => item.id !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.map((item: any) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
    },
    decrementQuantity: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.map((item: any) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
    },
    clearAllCart: (state) => {
      state.cart = []
    }
  }
});

export const { addToCart, removeFromTheCart, incrementQuantity, decrementQuantity, clearAllCart } = cartSlice.actions;
export const getCart = (state: RootState) => state.cart.cart;
export default cartSlice.reducer;
