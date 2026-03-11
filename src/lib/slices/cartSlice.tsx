import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  images: string[];
  rating: number;
  quantity: number;
}
interface CartState {
  cartProducts: CartItem[];
}
const initialState: CartState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartProducts.find(
        (product) => product.id === action.payload.id,
      );
      if (item) {
        if (item.quantity < 10) {
          item.quantity += 1;
        }
      } else {
        state.cartProducts.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload,
      );
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id,
      );
      if (state.cartProducts[index].quantity < 2) {
        state.cartProducts[index].quantity = 1;
      } else {
        state.cartProducts[index].quantity -= 1;
      }
    },
  },
});

export const { addToCart, deleteFromCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
