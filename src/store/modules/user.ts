/*
 * @Description: 用户store
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-11 19:21:40
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 11:19:54
 */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    token: null,
    address: [
      {
        id: 1,
        receiver: '小王',
        telephone: '18779472653',
        shippingAddress: '河北保定市莲池区东山路26号',
        isChosen: true,
      },
      {
        id: 2,
        receiver: '小李',
        telephone: '18867631234',
        shippingAddress: '',
        isChosen: false,
      },
    ],
  },
  reducers: {
    setUserInfoState: (state, action) => {
      // @ts-ignore
      state.userInfo = Object.assign(state.userInfo, action.payload);
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    clearUserToken: (state, action) => {
      state.token = null;
    },
    addUserAdress: (state, action) => {
      state.address = state.address.concat(action.payload);
    },
  },
});

export const { setUserInfoState, setUserToken, clearUserToken, addUserAdress } =
  userSlice.actions;
export const selectUserInfo = (state: any) => state.user.userInfo;
export const selectUserToken = (state: any) => state.user.token;
export const selectUserAdress = (state: any) => state.user.address;
export default userSlice.reducer;
