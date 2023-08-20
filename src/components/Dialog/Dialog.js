/*
 * @Description: 对话框
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-06 14:59:54
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-16 18:27:44
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  StatusBar,
} from 'react-native';
import {
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';

/**
 * @description: Dialog组件
 * @param {boolen} isShow 是否展示
 * @param {function} onBackPress 关闭时回调，点击蒙版触发
 * @param {object} style 中间区域自定义样式
 * @param {string} position `默认为center 可选 bottom | center`
 * @return {*}
 * @author: Ban
 */

const Dialog = ({
  isShow,
  onBackPress = () => {},
  style,
  children,
  position = 'center',
  ...rest
}) => {
  if (!isShow) return null;
  // useEffect(() => {
  //   // console.log('light bar style');
  //   StatusBar.setBarStyle('light-content', true);

  //   return () => {
  //     // console.log('dark bar style');
  //     StatusBar.setBarStyle('dark-content', true);
  //   };
  // }, [isShow]);
  return (
    <View>
      <Modal
        visible={isShow}
        transparent
        onRequestClose={onBackPress}
        animationType="fade"
        statusBarTranslucent={true}
        {...rest}>
        <Pressable
          style={styles.background}
          onPress={onBackPress}
        />
        <View
          pointerEvents="box-none"
          style={[
            styles.container,
            {
              justifyContent: position == 'center' ? 'center' : 'flex-end',
            },
          ]}>
          <View style={StyleSheet.flatten([styles.center, style])}>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  center: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Dialog;
