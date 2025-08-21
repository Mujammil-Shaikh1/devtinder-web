import { createSlice } from "@reduxjs/toolkit";
import type { RequestType } from "../model/store";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequests: (_state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter(
        (req: RequestType) => req._id !== action.payload
      );
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
