/*
 * @Description: Toast组件
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-03 14:05:36
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:39:54
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { DEVICE_HEIGHT } from '@/config/modules/global';
import colors from '@/assets/color';

/**
 * @description: Toast组件
 * @param {array} status Toast组件状态 `必填`
 * @param {string} position 显示位置 `bottom | center | top 默认bottom`
 * @param {string} text 显示的内容
 * @return {ReactNode} Toast组件
 * @author: Ban
 */

const Toast = ({
  status,
  options = {
    text: '提示',
  },
}) => {
  // if (!status || !(status instanceof Array))
  //   throw new Error('Type error. Type should be array');
  // if (typeof options.text != 'string')
  //   throw new Error('Type error. Type should be string');

  const opacityAnim = useRef(new Animated.Value(0)).current; // 透明度动画值
  const [toastPosition, setToastPostion] = useState(options.position); // 可删
  const [toastText, setToastText] = useState(options.text); // 可删

  const [toastStatus, setToastStatus] = useState(false);
  const dataList = useRef([]); // 数据队列
  const isLoading = useRef(false); // 运行状态
  const text = useRef('');
  const position = useRef('');

  const positions = {
    top: DEVICE_HEIGHT / 20,
    center: DEVICE_HEIGHT / 2,
    bottom: DEVICE_HEIGHT * (15 / 20),
  };

  useEffect(() => {
    if (status) {
      dataList.current.push({ text: options.text, position: options.position });
    }
  }, [options, status]);

  // 动画
  useEffect(() => {
    // console.log(dataList.current.length, isLoading.current);
    if (dataList.current.length > 0 && !isLoading.current) {
      // console.log('start');
      const animInterval = setInterval(() => {
        isLoading.current = true;
        // 队列空结束
        if (dataList.current.length <= 1) {
          clearInterval(animInterval);
          isLoading.current = false;
          console.log('clearInterval', isLoading.current);
        }
        // text.current = dataList.current[0].text;
        // position.current = dataList.current[0].position;
        console.log(dataList.current[0]);
        dataList.current.shift();
        animated();
      }, 3000);
    }
  });

  /**
   * @description: 动画
   * @return {*}
   * @author: Ban
   */
  const animated = () => {
    Animated.timing(opacityAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
    }).start();
    setTimeout(() => {
      Animated.timing(opacityAnim, {
        useNativeDriver: true,
        toValue: 0,
        duration: 1000,
        easing: Easing.ease,
      }).start();
      setToastStatus(false);
    }, 2000);
  };

  return (
    <Animated.View
      style={[
        {
          // opacity: opacityAnim,
          flexDirection: 'row',
          position: 'absolute',
          width: '100%',
          justifyContent: 'center',
          top: positions[position.current],
          zIndex: 999,
        },
      ]}>
      <View style={[styles.view]}>
        <Text
          style={{
            color: '#ffffff',
          }}>
          {text.current}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    backgroundColor: colors.rose[400],
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Toast;
