import { createSlice } from '@reduxjs/toolkit';

export const taskCountSlice = createSlice({
  name: "taskCount",
  initialState: {
    count: 0
  },
  reducers: {
    getTaskCount: (state, action) => {
      state.count = action.payload;
    },
  }
})

export const { getTaskCount } = taskCountSlice.actions;

export default taskCountSlice.reducer;