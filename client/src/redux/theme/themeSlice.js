import { createSlice } from "@reduxjs/toolkit";
// initial state
const initialState = {
  // initially light
  theme: "light",
};
// theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

// export toggle theme
export const { toggleTheme } = themeSlice.actions;
// export reducer
export default themeSlice.reducer;
