/*
 * @Description: 商城
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-18 16:14:41
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-06 15:03:17
 */
import { createSlice } from '@reduxjs/toolkit';
export const mallSlice = createSlice({
  name: 'mall',
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
  mallSlice.actions;
export const selectSearchHistory = (state: any) => state.mall.searchHistory;
export default mallSlice.reducer;
