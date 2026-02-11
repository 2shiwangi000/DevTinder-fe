import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import type { ConnectionRequest } from "../../types/connectionRequest";

interface reqState {
  currentReq: User[];
  currentReqCount: number;
}

const initialState: reqState = {
  currentReq: [],
  currentReqCount: 0,
};

const reqSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    appendReq: (state, action: PayloadAction<ConnectionRequest[]>) => {
      state.currentReq = action.payload.map((req) => req.fromUserId);
      state.currentReq.length = action.payload.length;
    },
    removeReq: (state) => {
      state.currentReq = [];
    },
    getRequestCount: (state, action) => {
      state.currentReqCount = action.payload;
    },
  },
});

export const { appendReq, removeReq, getRequestCount } = reqSlice.actions;
export default reqSlice.reducer;
