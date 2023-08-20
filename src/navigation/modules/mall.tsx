/*
 * @Description: 商城页面导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:42:27
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-04 16:06:00
 */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  MALL_SCREEN,
  MALL_SCREEN_SHOPPINGCART,
  MALL_SCREEN_COMMODEITY_DETAIL,
  MALL_SCREEN_SHOPPINGCARTPAYMENT,
  MALL_SCREEN_SEARCH,
} from '../navigationNames';

import { HomeBottomNavigation } from '../bottom';
import { initStackNavigation } from '../navigation';
import MallShoppingCart from '@/screens/Mall/MallShoppingCart/MallShoppingCart';
import MallCommodityDetail from '@/screens/Mall/MallCommodityDetail/MallCommodityDetail';
import MallShoppingCartPayment from '@/screens/Mall/MallShoppingCartPayment/MallShoppingCartPayment';
import MallSearch from '@/screens/Mall/MallSearch/MallSearch';

/**
 * @description: 首页相关导航
 * @param {Stack} Stack 堆栈导航器实例
 * @return {*}
 * @author: Ban
 */

const MallScreenNavigation = (Stack: any) => {
  return (
    <>
      {initStackNavigation(Stack, MALL_SCREEN_SHOPPINGCART, MallShoppingCart)}
      {initStackNavigation(
        Stack,
        MALL_SCREEN_COMMODEITY_DETAIL,
        MallCommodityDetail,
      )}
      {initStackNavigation(
        Stack,
        MALL_SCREEN_SHOPPINGCARTPAYMENT,
        MallShoppingCartPayment,
      )}
      {initStackNavigation(Stack, MALL_SCREEN_SEARCH, MallSearch)}
    </>
  );
};

export { MallScreenNavigation };
