import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: [],
  reducers: {
    loadVideos: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { loadVideos } = videoSlice.actions;
export default videoSlice.reducer;
