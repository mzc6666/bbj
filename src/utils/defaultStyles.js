/*
 * @Description: 改变原生组件默认属性
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-13 16:04:47
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-23 18:14:05
 */
import {
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  RefreshControl,
} from 'react-native';
import colors from '@/assets/color';
/**
 * 说明:此文件为修改React-native的原生组件的一些默认属性配置
 * 1.修改Text和TextInput的属性,字体大小不跟随系统设置
 * 2.修改TouchableOpacity的默认属性0.2 => 1(即去除该组件默认的按下去的阴影效果 => 点击的时候按下去没有阴影效果)
 */
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
  allowFontScaling: false,
  paddingVertical: 0,
  selectionColor: colors.rose[400],
  blurOnSubmit: true,
});
Text.defaultProps = Object.assign({}, Text.defaultProps, {
  allowFontScaling: false,
  fontSize: colors.fontSize[300],
  style: {
    color: colors.font[300],
  },
});
TouchableOpacity.defaultProps = Object.assign(
  {},
  TouchableOpacity.defaultProps,
  { activeOpacity: 1 },
);
Pressable.defaultProps = Object.assign({}, Pressable.defaultProps, {
  android_disableSound: true,
});
ScrollView.defaultProps = Object.assign({}, ScrollView.defaultProps, {
  keyboardDismissMode: 'on-drag',
  showsVerticalScrollIndicator: false,
});
RefreshControl.defaultProps = Object.assign({}, RefreshControl.defaultProps, {
  colors: [colors.auxiliary[100]],
});
