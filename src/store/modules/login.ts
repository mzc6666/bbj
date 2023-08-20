/*
 * @Description: 登陆store
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-08 13:39:12
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-17 09:32:41
 */
import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
  },
  reducers: {
    signin: state => {
      state.isLogin = true;
    },
    signout: state => {
      state.isLogin = false;
    },
  },
});

export const { signin, signout } = loginSlice.actions;
export const selectLogin = (state: any) => state.login.isLogin;
export default loginSlice.reducer;
