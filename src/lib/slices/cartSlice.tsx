import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  images: string[];
  rating: number;
  quantity: number;
  discountPercentage: number;
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
    loadCartFromStorage: (state) => {
      if (typeof window !== "undefined") {
        state.cartProducts = JSON.parse(
          localStorage.getItem("userCart") || "[]",
        );
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.cartProducts.find(
        (product) => product._id === action.payload._id,
      );
      const addedQuantity = action.payload.quantity || 1;

      if (item) {
        item.quantity = Math.min(item.quantity + addedQuantity, 10);
      } else {
        state.cartProducts.push({
          ...action.payload,
          quantity: Math.min(addedQuantity, 10),
        });
      }
      localStorage.setItem("userCart", JSON.stringify(state.cartProducts));
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product._id !== action.payload,
      );
      localStorage.setItem("userCart", JSON.stringify(state.cartProducts));
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartProducts.findIndex(
        (product) => product._id === action.payload._id,
      );
      if (state.cartProducts[index].quantity > 1) {
        state.cartProducts[index].quantity -= 1;
        localStorage.setItem("userCart", JSON.stringify(state.cartProducts));
      } else {
        state.cartProducts[index].quantity = 1;
      }
    },
  },
});
export const cartTotalPrice = (state: { cart: CartState }) =>
  state.cart.cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
export const totalCount = (state: { cart: CartState }) =>
  state.cart.cartProducts.reduce((total, item) => total + item.quantity, 0);
export const cartTotalDiscountPrice = (state: { cart: CartState }) =>
  state.cart.cartProducts.reduce(
    (total, item) => total + (item.price * item.discountPercentage) / 100,
    0,
  );
export const {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
