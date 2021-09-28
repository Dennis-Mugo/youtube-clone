import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import videosReducer from "../features/videos/videoSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    videos: videosReducer,
    user: userReducer,
  },
});
