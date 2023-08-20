/*
 * @Description: 底部标签导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:36:38
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 15:16:13
 */
import { initBottomNavigation } from './navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useToast } from '@/utils/hooks';
import { useNavigation } from '@react-navigation/native';

import {
  HOME_SCREEN,
  MALL_SCREEN,
  MESSAGE_SCREEN,
  ME_SCREEN,
  COMMUNITY_SCREEN,
} from './navigationNames';

import Home from '@/screens/Home/Home';
import Mall from '@/screens/Mall/Mall';
import Message from '@/screens/Message/Message';
import Me from '@/screens/Me/Me';
import Community from '@/screens/Community/Community';

/**
 * @description: 底部标签导航
 * @author: Ban
 */

const HomeBottomNavigation = () => {
  const navigation = useNavigation();
  /**
   * 后退一次提示再按一次退出，后退两次退出app
   */
  const backTime = useRef<Date>(new Date());
  const flag = useRef(false);
  if (Platform.OS == 'android') {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const index = navigation.getState().index;
      // 判断当导航为第一个页面才能退出
      if (index > 0) return false;

      if (!flag.current) {
        useToast('再按一次退出');
        flag.current = true;
        backTime.current = new Date();
        return true;
      }
      if (new Date().getTime() - backTime.current?.getTime() > 2000) {
        useToast('再按一次退出');
        flag.current = true;
        backTime.current = new Date();
        return true;
      }
      BackHandler.exitApp();
      return true;
    });
  }

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      {initBottomNavigation('贝贝佳', HOME_SCREEN, Home, 'logo', Tab)}
      {initBottomNavigation('社区', COMMUNITY_SCREEN, Community, '\ue65c', Tab)}
      {initBottomNavigation('商城', MALL_SCREEN, Mall, '\ue663', Tab)}
      {initBottomNavigation('消息', MESSAGE_SCREEN, Message, '\ue639', Tab)}
      {initBottomNavigation('我的', ME_SCREEN, Me, '\ue62f', Tab)}
    </Tab.Navigator>
  );
};

export { HomeBottomNavigation };
