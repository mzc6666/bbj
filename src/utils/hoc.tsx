/*
 * @Description: HOC
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-16 21:39:34
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-16 17:06:37
 */
import {
  Platform,
  StatusBar,
  View,
  StyleSheet,
  Text,
  Animated,
  ScrollView,
} from 'react-native';
import React, { useEffect } from 'react';
import { DEVICE_STATUS_BAR_HEIGHT } from '@/config/modules/global';
import { useNavigationAnimate } from './hooks';

interface Options {
  fillStatusBar?: boolean;
  fillBackgroundColor?: string;
  scrollView?: boolean;
  refreshControl?: any;
  options?: any;
}

/**
 * @description: 配置组件HOC
 * @param {ReactNode} WrappedComponent 组件
 * @param {object} options 配置选项
 * @param {bollean} options.fillStatusBar 是否填充状态栏，默认true
 * @param {string} options.fillBackgroundColor 填充背景颜色，默认透明
 * @param {bollean} options.scrollView 是否为可滚动页面，为true时无法使用FlatList等虚拟列表组件，默认false
 * @param {ReactNode} options.refreshControl 当页面为可滚动页面时，提供下拉刷新
 * @return {ReactNode} 组件
 * @author: Ban
 */
export const defaultComponentHOC =
  (WrappedComponent: any, options?: Options) => (props: any) => {
    options = {
      fillStatusBar: true,
      fillBackgroundColor: 'transparent',
      scrollView: false,
      refreshControl: <></>,
      ...options,
    };
    if (Platform.OS == 'android') {
      // console.log();
      if (options.scrollView)
        return (
          <ScrollView
            refreshControl={options.refreshControl}
            style={{
              height: '100%',
            }}>
            {options.fillStatusBar && (
              <View
                style={StyleSheet.flatten([
                  {
                    backgroundColor: options.fillBackgroundColor,
                    height: DEVICE_STATUS_BAR_HEIGHT,
                  },
                ])}></View>
            )}
            <WrappedComponent {...props} />
          </ScrollView>
        );
      else
        return (
          <View
            style={{
              height: '100%',
            }}>
            {options.fillStatusBar && (
              <View
                style={StyleSheet.flatten([
                  {
                    backgroundColor: options.fillBackgroundColor,
                    height: DEVICE_STATUS_BAR_HEIGHT,
                  },
                ])}></View>
            )}
            <WrappedComponent {...props} />
          </View>
        );
    }
    return null;
  };

export const addTitleBarHOC = (WrappedComponent: any) => (props: any) => {};

/**
 * @description: 模态化组件HOC
 * @param {ReactNode} WrappedComponent 组件
 * @return {*}
 * @author: Ban
 */
export const defaultScreenHOC =
  (WrappedComponent: any): typeof WrappedComponent =>
  (props: any) => {
    const offset = useNavigationAnimate(() => {
      props.close();
    }); // 模态化组件

    return (
      <Animated.View
        style={{
          transform: [
            {
              translateX: offset,
            },
          ],
        }}>
        <WrappedComponent {...props} />
      </Animated.View>
    );
  };
