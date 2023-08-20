/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2023-02-13 21:40:33
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 22:45:12
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Dialog from '@/components/Dialog/Dialog';
import colors from '@/assets/color';
import { DEVICE_WIDTH } from '@/config/modules/global';

interface Props {
  show: boolean;
  onBackPress: () => void;
  children?: any;
  onChangeBackground(): void;
  onAddBaby(): void;
}

/**
 * @description: 首页点击背景图片显示组件
 * @param {boolean} show 是否显示
 * @param {function} onBackPress 点击蒙版触发事件
 * @return {*}
 * @author: Ban
 */

const HomeClickOptions = ({
  show,
  onBackPress = () => {},
  children,
  onChangeBackground,
  onAddBaby,
}: Props) => {
  return (
    <Dialog
      isShow={show}
      style={{
        borderRadius: 4,
      }}
      onBackPress={onBackPress}>
      <View
        style={{
          alignItems: 'center',
          width: DEVICE_WIDTH / 2,
        }}>
        <TouchableOpacity
          style={styles.item}
          onPress={onChangeBackground}>
          <Text
            style={{
              color: colors.font[300],
            }}>
            修改背景图片
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={onAddBaby}>
          <Text
            style={{
              color: colors.font[300],
            }}>
            添加宝宝
          </Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
  },
});

export default HomeClickOptions;
