import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface ConnectionState {
  currentConnections: User[] | null;
}

const initialState: ConnectionState = {
  currentConnections: [],
};

const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action: PayloadAction<User[]>) => {
      state.currentConnections = action.payload;
      state.currentConnections.length = action.payload.length;
    },
    removeConnections: (state) => {
      state.currentConnections = [];
    },
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
