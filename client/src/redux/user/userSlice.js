// user slice
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
// slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // reducers
  reducers: {
    // login
    // login start
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export all the reducers from the userSlice
export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;
// export default reducer
export default userSlice.reducer;
