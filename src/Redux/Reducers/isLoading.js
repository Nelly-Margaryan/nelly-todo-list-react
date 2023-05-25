import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  }
})

export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;