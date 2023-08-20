/*
 * @Description: input——输入框通用组件
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 14:55:18
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:48:26
 */
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import colors from '@/assets/color';

/**
 * @description: input——输入框通用组件
 * @param {string} type 输入框类型 `text || password, 默认text`
 * @param {object} inputStyle 输入框样式
 * @param {object} style 整体样式
 * @param {function} onClear 清空回调
 * @param {function} onFocus 聚焦回调
 * @param {function} onBlur 模糊回调
 * @param {boolean} isClear 是否开启清空功能 `默认true`
 * @param {string || number} width 宽度
 * @param {array<useState>} value 初始值
 * @param {function} onChangeText 改变时触发函数
 * @param {function} verifyText 数据验证函数 `(value) => bollean`
 * @author: Ban
 */

const Input = React.forwardRef(
  (
    {
      type = 'text',
      inputStyle,
      style,
      onClear,
      onFocus = () => {},
      onBlur = () => {},
      isClear = true,
      width = '100%',
      value = ['', () => {}],
      onChangeText = () => {},
      verifyText = () => true,
      ...rest
    }: any,
    ref: any,
  ) => {
    const inputWidthAnim = useRef(new Animated.Value(0)).current; // input底部border宽度动画
    const clearIconAnim = useRef(new Animated.Value(0)).current; // 清空按钮显示动画
    const [secureTextEntry, setSecureTextEntry] = useState(false); // 是否密码显示
    const [verifyStatus, setVerifyStatus] = useState(true); // 状态验证
    const [viewSize, setViewSize] = useState({ width: 0, height: 0 }); // 最外层组件宽高

    const REG = /^\d{1,3}%$/; // 匹配百分比正则
    const isPercent = REG.test(width); // width是否为百分比

    useEffect(() => {
      if (type == 'password') setSecureTextEntry(true);
      else setSecureTextEntry(false);
    }, [type]);

    /**
     * @description: 输入框动画
     * @return {*}
     * @author: Ban
     */
    const inputWidthIn = () => {
      Animated.timing(inputWidthAnim, {
        toValue: isPercent ? (viewSize.width * parseInt(width)) / 100 : width,
        duration: 400,
        useNativeDriver: false,
      }).start();
    };
    const inputWidthOut = () => {
      Animated.timing(inputWidthAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    };

    /**
     * @description: 清空按钮动画
     * @return {*}
     * @author: Ban
     */
    const clearIconIn = () => {
      Animated.timing(clearIconAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };
    const clearIconOut = () => {
      Animated.timing(clearIconAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
      if (isClear && value[0].length > 0) clearIconIn();
      else clearIconOut();
    }, [value[0].length > 0, isClear, value]);

    /**
     * @description: 清空
     * @return {*}
     * @author: Ban
     */
    const clear = () => {
      ref.current.clear();
      value[1]('');
      onClear?.();
    };

    /**
     * @description: Blur时回调
     * @return {*}
     * @author: Ban
     */
    const blur = () => {
      inputWidthOut();
      onBlur();
      setVerifyStatus(verifyText(value[0]));
    };

    /**
     * @description: Focus回调
     * @return {*}
     * @author: Ban
     */
    const focus = () => {
      inputWidthIn();
      onFocus();
    };

    return (
      <View
        style={StyleSheet.flatten([
          styles.view,
          style,
          {
            width: width,
          },
          {
            borderBottomColor: verifyStatus
              ? colors.gray[100]
              : colors.rose[400],
          },
        ])}
        onLayout={({ nativeEvent }) => {
          setViewSize({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height,
          });
        }}>
        <TextInput
          style={StyleSheet.flatten([styles.input, inputStyle])}
          ref={ref}
          value={value[0] || ''}
          onChangeText={text => {
            value[1](text);
            onChangeText(text);
          }}
          onFocus={focus}
          onBlur={blur}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
        {isClear && type == 'text' ? (
          <Animated.Text
            style={[{ fontFamily: 'iconfont', opacity: clearIconAnim }]}
            onPress={clear}>
            {'\ue713'}
          </Animated.Text>
        ) : undefined}
        {type == 'password' ? (
          <Animated.Text
            style={[
              styles.password,
              { fontFamily: 'iconfont', opacity: clearIconAnim },
            ]}
            onPress={() => {
              setSecureTextEntry(!secureTextEntry);
            }}>
            {secureTextEntry ? '\ue623' : '\ue88b'}
          </Animated.Text>
        ) : undefined}
        <Animated.View
          style={[
            styles.animated,
            {
              width: inputWidthAnim,
            },
          ]}></Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    color: '#000000',
    flex: 1,
    fontSize: 14,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  animated: {
    height: 1,
    position: 'absolute',
    bottom: -1,
    backgroundColor: colors.auxiliary[100],
    width: 100,
  },
  password: {
    fontSize: 20,
    marginLeft: 5,
  },
  error: {
    color: colors.rose[400],
  },
});

export default Input;
