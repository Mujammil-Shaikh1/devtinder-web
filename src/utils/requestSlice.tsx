import { createSlice } from "@reduxjs/toolkit";
import type { Request } from "../model/store";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequests: (_state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter(
        (req: Request) => req._id !== action.payload
      );
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;

export default requestSlice.reducer;
