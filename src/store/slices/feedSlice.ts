import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FeedResponse, FeedState } from "../../types/feed";

const initialState: FeedState = {
  currentFeed: [],
  page: 1,
  limit: 10,
  total: 0,
  hasMore: true,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action: PayloadAction<FeedResponse>) => {
      const { data, page, total, limit } = action.payload;
      state.currentFeed.push(...data);
      state.page = page;
      state.total = total;
      state.hasMore = state.currentFeed.length < total;
      state.limit = limit;
    },
    removeFeed: () => initialState,
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
