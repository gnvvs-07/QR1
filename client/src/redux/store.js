import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";

// export store to provider
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
