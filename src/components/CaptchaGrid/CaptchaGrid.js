/*
 * @Description: 短信验证码输入单元格
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-08 16:10:40
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 10:38:54
 */
import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';

/**
 * @description: 验证码单元格组件
 * @param {*} style 传递的样式对象
 * @param {boolean} isMe 是否是当前组件输入
 * @param {Array} rest 其他参数
 * @param {*} ref Context对象
 * @return {*}
 * @autor: mzc
 */

const CaptchaGrid = React.forwardRef(({ style, isMe, ...rest }, ref) => {
  const myRef = useRef();
  useEffect(() => {
    let timer = null;
    if (isMe) {
      myRef.current.focus();
    } else {
      timer = setTimeout(function () {
        myRef.current.blur();
      }, 0);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isMe]);
  return (
    <View style={[styles.gridBox]}>
      <TextInput
        keyboardType="numeric"
        caretHidden={false}
        maxLength={1}
        ref={myRef}
        {...rest}
        style={StyleSheet.flatten([styles.text, style])}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  gridBox: {
    width: 40,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#F4F6FF',
  },
  text: {
    flex: 1,
    fontSize: 18,
    lineHeight: 40,
    paddingHorizontal: 5,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
  },
});
export default CaptchaGrid;
