/*
 * @Description: 搜索输入框
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-16 21:57:27
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 15:26:30
 */
import colors from '@/assets/color';
import React, { ForwardedRef, MutableRefObject, Ref } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import {
  Pressable,
  TextInput,
  Text,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';
import IconPark from '@/components/IconPark';
import { Search } from '@icon-park/svg';
import { ViewStyle } from 'react-native';

interface SearchInput {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle> | undefined;
  rest?: any;
  onPress?: (e?: Event) => any;
  placeholder?: string;
  value: string | undefined;
  onChangeText: (text: string) => void;
  onSubmitingEditing?: () => void;
}

/**
 * 搜索输入框组件
 * @date 2023-03-12
 * @param {any} style 最外层样式
 * @param {any} inputStyle 输入组件样式
 * @param {any} onPress 点击触发
 * @param {any} placeholder
 * @param {any} value 值
 * @param {any} onChangeText 输入时改变值触发
 * @param {any} rest TextInput其他的props
 * @param {any} ref
 * @returns {any}
 */

const SearchInput = React.forwardRef(
  (
    {
      style,
      inputStyle,
      onPress = e => {},
      placeholder = '',
      value = '',
      onChangeText,
      onSubmitingEditing,
      ...rest
    }: SearchInput,
    ref: any,
  ) => {
    const inputRef = ref || useRef<any>(); // input Ref

    return (
      <View style={StyleSheet.flatten([style, styles.container])}>
        <Pressable
          onPress={() => {
            inputRef.current.focus();
            onPress();
          }}>
          <IconPark
            iconPark={Search({ theme: 'outline', fill: colors.font[200] })}
            size={colors['fontSize']['600']}
            style={styles.icon}
          />
        </Pressable>
        <TextInput
          placeholder={placeholder}
          style={StyleSheet.flatten([inputStyle, styles.input])}
          value={value}
          onSubmitEditing={onSubmitingEditing}
          onChangeText={onChangeText}
          ref={inputRef}
          {...rest}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
  },
  icon: {
    paddingLeft: 15,
    paddingRight: 8,
  },
  input: {
    fontSize: colors['fontSize']['300'],
    color: colors['gray']['500'],
    flex: 1,
  },
});

export default SearchInput;
