/**
 * @Description: 购物车
 * @Version:
 * @Author: Xu
 * @Date: 2023-03-16
 * @LastEditors: Xu
 * @LastEditTime: 2023-03-16
 */

import { createSlice } from '@reduxjs/toolkit';
export const shoppingSlice = createSlice({
  name: 'shopping',
  initialState: {
    shoppingCart: [],
  },
  reducers: {
    addShoppingCartState: (state: { shoppingCart: Array<string> }, action) => {
      const oldData = new Set(state.shoppingCart);
      if (oldData.has(action.payload)) return;
      state.shoppingCart.unshift(action.payload);
    },
    clearShoppingCartState: (state: any, action) => {
      state.shoppingCart.splice(0, state.shoppingCart.length);
    },
  },
});

export const { addShoppingCartState, clearShoppingCartState } =
  shoppingSlice.actions;
export const selectShoppingCart = (state: any) => state.shopping.shoppingCart;
export default shoppingSlice.reducer;
