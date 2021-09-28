import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },

    removeUser: (state, action) => {
      state.pop();
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
