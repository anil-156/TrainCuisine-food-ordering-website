import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: [],
  isLoggedIn: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = [];
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { setIsLoggedIn, setIsAdmin, signInSuccess, signOutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
