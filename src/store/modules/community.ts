/**
 * @Description: 社区
 * @Version:
 * @Author: Xu
 * @Date:
 * @LastEditors: Xu
 * @LastEditTime:
 */
import { createSlice } from '@reduxjs/toolkit';
export const communitySlice = createSlice({
  name: 'community',
  initialState: {
    searchHistory: [],
  },
  reducers: {
    addSearchHistoryState: (
      state: { searchHistory: Array<string> },
      action,
    ) => {
      const oldData = new Set(state.searchHistory);
      if (oldData.has(action.payload)) return;
      state.searchHistory.unshift(action.payload);
      if (state.searchHistory.length > 20) state.searchHistory.pop();
    },
    clearSearchHistoryState: (state: any) => {
      state.searchHistory.splice(0, state.searchHistory.length);
    },
  },
});

export const { addSearchHistoryState, clearSearchHistoryState } =
  communitySlice.actions;
export const selectSearchHistoryOfCommunity = (state: any) =>
  state.community.searchHistory;
export default communitySlice.reducer;
