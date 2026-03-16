import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
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
  cartProducts:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userCart") || "[]")
      : [],
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
        state.cartProducts.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("userCart", JSON.stringify(state.cartProducts));
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload,
      );
      localStorage.setItem("userCart", JSON.stringify(state.cartProducts));
    },
    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.cartProducts.findIndex(
        (product) => product.id === action.payload.id,
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
export const cartTotalDiscountPrice = (state: { cart: CartState }) =>
  state.cart.cartProducts.reduce(
    (total, item) => total + (item.price * item.discountPercentage) / 100,
    0,
  );
export const { addToCart, deleteFromCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
