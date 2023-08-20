/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:24:55
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-26 18:26:55
 */
import React from 'react';
import colors from '@/assets/color';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';

/**
 * @description:  按钮
 * @param {string} title 标题
 * @param {function} onPress 点击触发事件
 * @param {object} style 按钮的样式
 * @param {object} textStyle 标题样式
 * @param {boolean} disabled 是否不可点击，默认为false
 * @param {object} children Button组件的子元素
 * @return {ReactNode} Button组件
 * @autor: mzc
 */
const Button = ({
  title = '',
  onPress = () => {},
  style = {},
  children,
  textStyle = {},
  disabled = false,
}: any) => {
  const pressFn = disabled ? () => {} : onPress;
  return (
    <Pressable
      style={StyleSheet.flatten([styles.view, style])}
      onPress={pressFn}>
      <Text style={StyleSheet.flatten([styles.text, textStyle])}>{title}</Text>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  view: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.rose[400],
    borderRadius: 16,
  },
  text: {
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Button;
