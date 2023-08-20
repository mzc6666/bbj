/*
 * @Description: 本机状态
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-09 17:50:22
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-19 19:48:37
 */
import { createSlice } from '@reduxjs/toolkit';

export const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    netInfo: null,
  },
  reducers: {
    setNetInfoState: (state, action) => {
      state.netInfo = action.payload;
    },
  },
});

export const { setNetInfoState } = deviceSlice.actions;
export const selectDeviceInfo = state => state.device;
export default deviceSlice.reducer;
