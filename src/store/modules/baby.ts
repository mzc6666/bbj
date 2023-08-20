/*
 * @Description: 宝宝
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-18 16:14:16
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 22:02:19
 */

import { createSlice } from '@reduxjs/toolkit';
export const babySlice = createSlice({
  name: 'baby',
  initialState: {
    babyInfo: {},
    eventList: [],
    growthRecords: [],
  },
  reducers: {
    setBabyInfoState: (state, action) => {
      state.babyInfo = Object.assign(state.babyInfo, action.payload);
    },
    setBabyEventListState: (state, action) => {
      state.eventList = action.payload;
    },
    setBabyGrowthRecords: (state, action) => {
      state.growthRecords = action.payload;
    },
  },
});

export const { setBabyInfoState, setBabyEventListState, setBabyGrowthRecords } =
  babySlice.actions;
export const selectBabyInfo = (state: any) => state.baby.babyInfo;
export const selectBabyEventList = (state: any) => state.baby.eventList;
export const selectBabyGrowthRecords = (state: any) => state.baby.growthRecords;
export default babySlice.reducer;
