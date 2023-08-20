/*
 * @Description: 生长曲线
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-11 12:56:45
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-08 19:43:13
 */
import React from 'react';
import colors from '@/assets/color';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeGrouthRecord from '@/screens/Home/HomeGrowthCurve/HomeGrouthRecord/HomeGrouthRecord';
import HomeHeaderCurve from '@/screens/Home/HomeGrowthCurve/HomeHeaderCurve/HomeHeaderCurve';
import HomeWeightCurve from '@/screens/Home/HomeGrowthCurve/HomeWeightCurve/HomeWeightCurve';
import HomeHeightCurve from '@/screens/Home/HomeGrowthCurve/HomeHeightCurve/HomeHeightCurve';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import { HOME_SCREEN_ADD_GROWTH_RECORD } from '@/navigation/navigationNames';
import {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';

const HomeGrowthCurve = ({ props, navigation }) => {
  const GrowthTab = createMaterialTopTabNavigator();

  return (
    <View
      style={{
        height: DEVICE_HEIGHT,
      }}>
      <TitleHeader
        title="生长曲线"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {
          return (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPress={() => {
                navigation.navigate(HOME_SCREEN_ADD_GROWTH_RECORD);
              }}>
              <Text>添加</Text>
            </TouchableOpacity>
          );
        }}
      />

      <GrowthTab.Navigator
        initialLayout={(DEVICE_WIDTH, DEVICE_HEIGHT)}
        initialRouteName="生长记录"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 14,
            color: colors.font[100],
          },
        }}
        backBehavior="none">
        <GrowthTab.Screen
          name="生长记录"
          component={HomeGrouthRecord}
          options={{
            tabBarLabel: (focused, color) => (
              <View>
                <Text>生长记录</Text>
              </View>
            ),
            tabBarIndicatorStyle: {
              backgroundColor: colors.auxiliary[100],
            },
            tabBarPressColor: 'transparent',
          }}
        />
        <GrowthTab.Screen
          name="身高曲线"
          component={HomeHeightCurve}
          options={{
            tabBarLabel: (focused, color) => (
              <View>
                <Text>身高曲线</Text>
              </View>
            ),
            tabBarIndicatorStyle: {
              backgroundColor: colors.auxiliary[100],
            },
          }}
        />
        <GrowthTab.Screen
          name="体重曲线"
          component={HomeWeightCurve}
          options={{
            tabBarLabel: (focused, color) => (
              <View>
                <Text>体重曲线</Text>
              </View>
            ),
            tabBarIndicatorStyle: {
              backgroundColor: colors.auxiliary[100],
            },
          }}
        />
        <GrowthTab.Screen
          name="头围曲线"
          component={HomeHeaderCurve}
          options={{
            tabBarLabel: (focused, color) => (
              <View>
                <Text>头围曲线</Text>
              </View>
            ),
            tabBarIndicatorStyle: {
              backgroundColor: colors.auxiliary[100],
            },
          }}
        />
      </GrowthTab.Navigator>
    </View>
  );
};

// export default HomeGrowthCurve;
export default defaultComponentHOC(HomeGrowthCurve);
