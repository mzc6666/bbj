/*
 * @Description: 导航index
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-03 11:54:05
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-21 21:31:40
 */
// In App.js in a new project

import React from 'react';
import { HomeBottomNavigation } from './bottom';
import { AdminNavigation } from './modules/login';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunityScreenNavigation } from './modules/community';
import { HomeScreenNavigation } from './modules/home';
import { MallScreenNavigation } from './modules/mall';
import { MeScreenNavigation } from './modules/me';
import { MessageScreenNavigation } from './modules/message';
import { BOTTOM_LAYOUT } from './navigationNames';
import { handleMessageArrived } from '@/store/modules/message';
import { SOCKET_EVENT_TYPE } from '@/network/socket';
import { useSocketHook, useSocketRegister } from '@/utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/modules/user';

const Navigation = () => {
  const dispatch = useDispatch();

  const stack = createStackNavigator();

  const userInfo = useSelector(selectUserInfo);

  useSocketRegister(userInfo.id, userInfo.name, userInfo.headPor);

  useSocketHook([
    {
      eventName: SOCKET_EVENT_TYPE.RECEIVE_MESSAGE_EVENT,
      callback: (data: any) => {
        dispatch(handleMessageArrived(data) as any);
      },
    },
  ]);

  return (
    <stack.Navigator>
      <stack.Screen
        name={BOTTOM_LAYOUT}
        component={HomeBottomNavigation}
        options={{
          headerShown: false,
        }}
      />
      {HomeScreenNavigation(stack)}
      {CommunityScreenNavigation(stack)}
      {MallScreenNavigation(stack)}
      {MessageScreenNavigation(stack)}
      {MeScreenNavigation(stack)}
    </stack.Navigator>
  );
};

export { HomeBottomNavigation, AdminNavigation, Navigation as default };
