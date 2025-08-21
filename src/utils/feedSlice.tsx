import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../model/store";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    getFeed: (_state, action) => action.payload,
    removeFeed: (state, action) => {
      const newArray = state.filter(
        (user: User) => user?._id !== action.payload
      );
      return newArray;
    },
  },
});

export const { getFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
