/*
 * @Description: 加载进度条
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-19 16:35:39
 * @LastEditors: Ban
 * @LastEditTime: 2022-07-20 16:45:10
 */
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import colors from '@/assets/color';

/**
 * @description: 加载进度条
 * @param {number} duration 持续时间 `默认2s`
 * @param {string} status 加载状态 `默认unload，可选 unload | loading | done`
 * @param {string} backgroundColor 进度条背景颜色
 * @param {string} color 进度条颜色
 * @return {RectNode} 加载进度条组件
 * @author: Ban
 */
const LinearProgress = ({
  duration = 2000,
  status = 'unload',
  backgroundColor = colors.gray[200],
  color = colors.rose[400],
}) => {
  const widthAnim = useRef(new Animated.Value(0)).current; // 进度条动画宽度
  const [width, setWidth] = useState(0); // 整体宽度
  const interval = 500; // 间隔时间
  const [isShow, setIsShow] = useState(false); // 是否显示进度条组件

  useEffect(() => {
    if (['unload', 'loading', 'done'].indexOf(status) >= 0) {
      switch (status) {
        case 'unload':
          widthAnim.setValue(0);
          setIsShow(false);
          break;
        case 'loading':
          Animated.timing(widthAnim, {
            toValue: 0.8,
            duration: duration,
            easing: Easing.ease,
            useNativeDriver: false,
          }).start();
          setIsShow(true);
          break;
        case 'done':
          Animated.timing(widthAnim, {
            toValue: 1,
            duration: interval,
            useNativeDriver: false,
          }).start();
          setIsShow(true);
          setTimeout(() => {
            setIsShow(false);
            widthAnim.setValue(0);
          }, interval);
          break;
        default:
          break;
      }
    } else
      throw new Error('Typo error, the true value is unload | loading | done');
  }, [status, duration, widthAnim]);

  return (
    <View
      style={StyleSheet.flatten([
        styles.linearProgress,
        {
          backgroundColor: backgroundColor,
          display: isShow ? 'flex' : 'none',
        },
      ])}
      onLayout={e => {
        setWidth(e.nativeEvent.layout.width);
      }}>
      <Animated.View
        style={StyleSheet.flatten([
          styles.progress,
          {
            backgroundColor: color,
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, width * 1],
            }),
          },
        ])}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearProgress: {
    position: 'absolute',
    width: '100%',
    height: 3,
  },
  progress: {
    height: 3,
    width: 100,
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
  },
});

export default LinearProgress;
