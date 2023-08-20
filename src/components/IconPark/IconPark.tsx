/*
 * @Description: iconPark图标组件
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-21 16:01:15
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-15 11:25:11
 */
import React, { useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml, SvgCss } from 'react-native-svg';
import { setConfig } from '@icon-park/svg/lib/runtime';
import colors from '@/assets/color';
import { Camera } from '@icon-park/svg/lib/map';
import { StyleProp } from 'react-native';

interface IconPark {
  iconPark: string;
  style?: StyleProp<any>;
  size: number;
}

/**
 * @description: iconPark图标组件
 * @param {string} iconPark iconPark函数
 * @param {object} style 最外层样式
 * @param {size} 尺寸 `默认16`
 * @return {*}
 * @author: Ban
 */

const IconPark = ({ iconPark, style, size = 16 }: IconPark) => {
  iconPark = iconPark.replace(/^\<\?xml.*\?\>/, ''); // 预处理

  return (
    <View style={style}>
      <SvgXml
        xml={iconPark}
        width={size}
        height={size}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default IconPark;
