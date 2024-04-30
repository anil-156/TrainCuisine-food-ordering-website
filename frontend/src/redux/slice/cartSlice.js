import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: null,
  allProduct: [],
  totalCartAmount: 0,
  cartCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setAllProduct: (state, action) => {
      state.allProduct = action.payload;
    },
    setcartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalCartAmount: (state) => {
      let totalAmount = 0;
      state.cartItems.some((item) => {
        totalAmount += item.foodDetail.new_price * item.quantity;
      });
      state.totalCartAmount = totalAmount;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalCartAmount = 0;
    },
  },
});

export const {
  setAllProduct,
  removeFromCart,
  setTotalCartAmount,
  clearCart,
  setcartItems,
  setCartCount,
} = cartSlice.actions;
export default cartSlice.reducer;
