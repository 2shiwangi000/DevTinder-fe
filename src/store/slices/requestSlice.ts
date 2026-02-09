import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";
import type { ConnectionRequest } from "../../types/connectionRequest";

interface reqState {
  currentReq: User[];
}

const initialState: reqState = {
  currentReq: [],
};

const reqSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    appendReq: (state, action: PayloadAction<ConnectionRequest[]>) => {
      state.currentReq = action.payload.map((req) => req.fromUserId);
      state.currentReq.length = action.payload.length;
    },
    removeConnections: (state) => {
      state.currentReq = [];
    },
  },
});

export const { appendReq, removeConnections } = reqSlice.actions;
export default reqSlice.reducer;
