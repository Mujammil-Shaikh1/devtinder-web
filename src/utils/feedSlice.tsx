import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    getFeed: (_state, action) => action.payload,
    removeFeed: () => null,
  },
});

export const { getFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;
