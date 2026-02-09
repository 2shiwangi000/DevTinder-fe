import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface ConnectionState {
  currentConnections: User[] | null;
}

const initialState: ConnectionState = {
  currentConnections: null,
};

const userSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    addConnections: (state, action: PayloadAction<User[]>) => {
      state.currentConnections = action.payload;
      // state.currentConnections.length = action.payload.length;
    },
    removeConnections: (state) => {
      state.currentConnections = null;
    },
  },
});

export const { addConnections, removeConnections } = userSlice.actions;
export default userSlice.reducer;
