/*
 * @Description: 基础搜索框
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-12 14:32:37
 * @LastEditors: Ban
 * @LastEditTime: 2022-12-21 16:15:06
 */
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '@/assets/color';

/**
 * @description: 基础搜索框
 * @param {object} style 样式
 * @param {string} rightIcon 右侧搜索icon编码
 * @param {ref} ref 输入框ref
 * @return {*}
 * @author: Ban
 */

const Search = React.forwardRef(({ style, rightIcon }, ref) => {
  return (
    <View style={StyleSheet.flatten([styles.view, style])}>
      <Text
        style={{
          fontFamily: 'iconfont',
          fontSize: 20,
        }}>
        {'\ue651'}
      </Text>
      <TextInput
        placeholder="搜索"
        style={{
          marginLeft: 10,
          flex: 1,
        }}></TextInput>
    </View>
  );
});

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.gray[200],
    height: 34,
    borderRadius: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default Search;
