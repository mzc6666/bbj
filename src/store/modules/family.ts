/*
 * @Description: 家庭store
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-05 19:12:26
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 22:41:53
 */

import { createSlice } from '@reduxjs/toolkit';

export const familySlice = createSlice({
  name: 'family',
  initialState: {
    familyInfo: [],
    nowBaby: 0, // 当前宝宝索引，宝宝存在familyInfo中
  },
  reducers: {
    setFamilyInfoState: (state, action) => {
      state.familyInfo = action.payload;
    },
    setFamilyNowBabyState: (state, action) => {
      state.nowBaby = action.payload;
    },
  },
});

export const { setFamilyInfoState, setFamilyNowBabyState } =
  familySlice.actions;
export const selectFamilyInfo = (state: any) => state.family.familyInfo;
export const selectFamilyNowBaby = (state: any) => state.family.nowBaby;
export default familySlice.reducer;
