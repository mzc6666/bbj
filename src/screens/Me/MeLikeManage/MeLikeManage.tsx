/*
 * @Description: 我的- 我的喜欢 / 喜欢我的
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-16 15:10:09
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 16:38:36
 */
import React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TitleHeader from '@/components/TitleHeader';
import MeLikeMyAttention from './components/MeLikeMyAttention/MeLikeMyAttention';
import MeLikeFans from './components/MeLikeFans/MeLikeFans';
import { ME_LIKEFANS, ME_LIKEMY_ATTENTION } from '@/navigation/navigationNames';
import colors from '@/assets/color';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';
import { defaultComponentHOC } from '@/utils/hoc';
import { NavigationHelpers, Route } from '@react-navigation/native';

/**
 * @description: 我的喜欢/喜欢我的 screen
 * @param {*} navigation 导航器对象
 * @param {*} route 路由对象
 * @param {} initialRouteName 初始加载组件
 * @return {*}
 * @author: mzc
 */

const MeLikeManage = ({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any>;
  route: Route<any>;
}) => {
  const Tab = createMaterialTopTabNavigator();
  // @ts-ignore
  const initialRouteName = route.params?.initialRouteName || ME_LIKEFANS;

  return (
    <View
      style={{
        height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
      }}>
      <TitleHeader
        title="我"
        headerRight={() => {}}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <Tab.Navigator
          initialRouteName={initialRouteName}
          backBehavior="none"
          screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: colors['font']['200'],
            tabBarIndicatorStyle: {
              backgroundColor: colors['rose']['600'],
              width: 64,
              left: 0.25 * DEVICE_WIDTH - 32,
            },
            tabBarPressColor: 'transparent',
          }}>
          <Tab.Screen
            name={ME_LIKEFANS}
            options={{
              title: '喜欢我的',
            }}
            component={MeLikeFans}
          />
          <Tab.Screen
            name={ME_LIKEMY_ATTENTION}
            options={{
              title: '我喜欢的',
            }}
            component={MeLikeMyAttention}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default defaultComponentHOC(MeLikeManage);
