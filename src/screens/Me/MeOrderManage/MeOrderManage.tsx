/*
 * @Description: 我的订单页面
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-15 10:01:27
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-13 20:55:23
 */
import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TitleHeader from '@/components/TitleHeader/TitleHeader';
import {
  ME_ORDERSMANAGEALL,
  ME_ORDERSMANAGEUNPAID,
  ME_ORDERSMANAGEUNPICKGOODS,
  ME_ORDERSMANAGEUNRECEIVE,
} from '@/navigation/navigationNames';
import MeOrderManageAll from './components/MeOrderManageAll/MeOrderManageAll';
import MeOrderManageUnpaid from './components/MeOrderManageUnpaid/MeOrderManageUnpaid';
import MeOrderManageUnpickGoods from './components/MeOrderManageUnpickGoods/MeOrderManageUnpickGoods';
import MeOrderManageUnreceive from './components/MeOrderManageUnreceive/MeOrderManageUnreceive';
import colors from '@/assets/color';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';
import { defaultComponentHOC } from '@/utils/hoc';
import { NavigationHelpers, Route } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

/**
 * @description: 我的订单页面
 * @param {*} navigation 导航器对象
 * @param {*} route 路由对象
 * @return {*}
 * @author: mzc
 */

const MeOrderManage = ({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any>;
  route: Route<any> & any;
}) => {
  return (
    <View
      style={{
        height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
        backgroundColor: colors.gray[100],
      }}>
      <TitleHeader
        title="我的订单"
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
          backBehavior="none"
          screenOptions={{
            tabBarActiveTintColor: colors.rose[400],
            tabBarInactiveTintColor: colors['font']['300'],
            tabBarIndicatorStyle: {
              backgroundColor: colors['rose']['600'],
              width: 48,
              left: 23,
            },
            tabBarPressColor: 'transparent',
            tabBarStyle: {
              marginVertical: 10,
              marginHorizontal: 20,
              borderRadius: 4,
            },
          }}>
          <Tab.Screen
            name={ME_ORDERSMANAGEALL}
            options={{
              title: '全部',
            }}
            component={MeOrderManageAll}
          />
          <Tab.Screen
            name={ME_ORDERSMANAGEUNPAID}
            component={MeOrderManageUnpaid}
            options={{
              title: '待支付',
            }}
          />
          <Tab.Screen
            name={ME_ORDERSMANAGEUNPICKGOODS}
            options={{
              title: '待取货',
            }}
            component={MeOrderManageUnpickGoods}
          />
          <Tab.Screen
            name={ME_ORDERSMANAGEUNRECEIVE}
            options={{
              title: '待收货',
            }}
            component={MeOrderManageUnreceive}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default defaultComponentHOC(MeOrderManage);
