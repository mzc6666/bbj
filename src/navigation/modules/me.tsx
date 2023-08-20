/*
 * @Description: 我的页面导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:42:27
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 19:46:18
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { initStackNavigation } from '../navigation';

import {
  ME_SCREEN,
  ME_SETTING_SCREEN,
  ME_SETTING_PERSONALINFO,
  ME_SETTING_SHOPPINGADDRESS,
  ME_SETTING_ADDSHOPPINGADDRESS,
  ME_ORDERSMANAGE,
  ME_ARTICLESMANAGE,
  ME_LIKEMANAGE,
  ME_SETTING_SECURITY,
  ME_SETTING_SECURITYSETPASS,
  ME_SETTING_PERSONALINFOCHANGENAME,
  ME_SETTING_PERSONALINFOCHANGEINTRODUCE,
  ME_SCREEN_VIP,
} from '../navigationNames';

import { HomeBottomNavigation } from '../bottom';
import Me from '@/screens/Me/Me';
import MeSetting from '@/screens/Me/MeSetting/MeSetting';
// import GrouthCurve from '@/screens/Home/GrowthCurve';
import MeSettingPersonInfo from '@/screens/Me/MeSetting/MeSettingPersonInfo/MeSettingPersonInfo';
import MeSettingPersonInfoChangeName from '@/screens/Me/MeSetting/MeSettingPersonInfo/MeSettingPersonInfoChangeName/MeSettingPersonInfoChangeName';
import MeSettingPersonInfoChangeIntroduce from '@/screens/Me/MeSetting/MeSettingPersonInfo/MeSettingPersonInfoChangeIntroduce/MeSettingPersonInfoChangeIntroduce';
import MeSettingSecurity from '@/screens/Me/MeSetting/MeSettingSecurity/MeSettingSecurity';
import MeSettingSecuritySetPass from '@/screens/Me/MeSetting/MeSettingSecurity/MeSettingSecuritySetPass/MeSettingSecuritySetPass';
import MeSettingShopAddress from '@/screens/Me/MeSetting/MeSettingShopAddress/MeSettingShopAddress';
import MeSettingAddShopAddress from '@/screens/Me/MeSetting/MeSettingShopAddress/MeSettingAddShopAddress/MeSettingAddShopAddress';
// import MeSettingAddShopAddress from '@/screens/Me/MeSetting/MeSettingShopAddress/MeSettingAddShopAddress/MeSettingAddShopAddress';
import MeOrderManage from '@/screens/Me/MeOrderManage/MeOrderManage';
import MeArticleManage from '@/screens/Me/MeArticleManage/MeArticleManage';
import MeLikeManage from '@/screens/Me/MeLikeManage/MeLikeManage';
import MeVip from '@/screens/Me/MeVip/MeVip';

/**
 * @description: 首页相关导航
 * @param {Stack} Stack 堆栈导航器实例
 * @return {*}
 * @author: Ban
 */

const MeScreenNavigation = (Stack: any) => {
  return (
    <>
      {initStackNavigation(Stack, ME_SETTING_SCREEN, MeSetting)}
      {initStackNavigation(Stack, ME_SETTING_PERSONALINFO, MeSettingPersonInfo)}
      {initStackNavigation(
        Stack,
        ME_SETTING_PERSONALINFOCHANGENAME,
        MeSettingPersonInfoChangeName,
      )}
      {initStackNavigation(
        Stack,
        ME_SETTING_PERSONALINFOCHANGEINTRODUCE,
        MeSettingPersonInfoChangeIntroduce,
      )}
      {initStackNavigation(
        Stack,
        ME_SETTING_SHOPPINGADDRESS,
        MeSettingShopAddress,
      )}
      {initStackNavigation(Stack, ME_ORDERSMANAGE, MeOrderManage)}
      {initStackNavigation(Stack, ME_ARTICLESMANAGE, MeArticleManage)}
      {initStackNavigation(Stack, ME_LIKEMANAGE, MeLikeManage)}
      {initStackNavigation(Stack, ME_SETTING_SECURITY, MeSettingSecurity)}
      {initStackNavigation(
        Stack,
        ME_SETTING_SECURITYSETPASS,
        MeSettingSecuritySetPass,
      )}
      {initStackNavigation(
        Stack,
        ME_SETTING_ADDSHOPPINGADDRESS,
        MeSettingAddShopAddress,
      )}
      {initStackNavigation(Stack, ME_SCREEN_VIP, MeVip)}
    </>
  );
};

export { MeScreenNavigation };
