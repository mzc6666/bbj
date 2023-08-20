/*
 * @Description: 导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-06-30 19:18:01
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 16:35:55
 */
import * as React from 'react';
import { Dimensions, InteractionManager, Text, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Button from '@/components/Button';
import { SvgXml } from 'react-native-svg';
import logoSvg from '@/assets/imgs/logo.svg';

/**
 * @description: 底部标签导航导航器模板
 * @param {string} title 顶部标题
 * @param {string} name 导航名称name
 * @param {ReactNode} component 导航组件
 * @param {string} iconCode icon十六进制码
 * @param {navigator} navigator 导航器实例
 * @param {string} fontColor 字体颜色 `默认#000000`
 * @param {string} activeFontColor 选中时字体颜色 `默认#FB7185`
 * @param {boolean} headerShown 上方标题栏是否显示 `默认false`
 * @param {number} fontSize 字体大小 `默认10`
 * @return {*}
 * @author: Ban
 */

const initBottomNavigation = (
  title: string,
  name: string,
  component: any,
  iconCode: any,
  navigator: any,
  fontColor = '#000000',
  activeFontColor = '#FB7185',
  headerShown = false,
  fontSize = 10,
) => {
  return (
    <navigator.Screen
      name={name}
      component={component}
      options={{
        headerShown: headerShown,
        title: title,
        tabBarLabel: ({ focused }: any) => {
          return (
            <Text
              style={{
                color: focused ? activeFontColor : fontColor,
                fontSize: fontSize,
              }}>
              {title}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color, size }: any) => {
          if (iconCode == 'logo') {
            return (
              <SvgXml
                width={26}
                height={26}
                xml={logoSvg as string}
                color={focused ? activeFontColor : fontColor}
              />
            );
          }
          return (
            <Text
              style={{
                fontFamily: 'iconfont',
                color: focused ? activeFontColor : fontColor,
                fontSize: 20,
              }}>
              {iconCode}
            </Text>
          );
        },
      }}
    />
  );
};

/**
 * @description: 登录注册导航模板
 * @param {string} title 标题栏文字
 * @param {string} name 导航名称name
 * @param {ReactNode} component 导航组件
 * @param {navigator} navigator 导航器实例
 * @param {boolean} headerShown 头部标题栏是否展示
 * @return {*}
 * @autor: mzc
 */
const initAuthNavigation = (
  title: string,
  name: string,
  component: any,
  navigator: any,
  headerShown = true,
) => {
  return (
    <navigator.Screen
      name={name}
      component={component}
      options={{ title: title, headerShown: headerShown }}
    />
  );
};

/**
 * @description: 堆栈导航模板
 * @param {Stack} Stack 导航器实例
 * @param {string} name 导航name
 * @param {ReactNode} component 组件
 * @param {object} otherOptions 其他堆栈导航选项
 * @return {*}
 * @author: Ban
 */

const initStackNavigation = (
  Stack: any,
  name: string,
  component: any,
  otherOptions = {},
) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      options={({ navigation, route }: any) => ({
        headerShown: false,
        ...otherOptions,
      })}
    />
  );
};

export { initBottomNavigation, initAuthNavigation, initStackNavigation };
