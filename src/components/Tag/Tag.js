/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-18 20:28:11
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-01 15:26:33
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '@/assets/color';

/**
 * @description: Tag组件
 * @param {*} title
 * @param {*} type
 * @param {funciton} onPress
 * @param {*} isSelect
 * @param {*} style
 * @return {*}
 * @author: Ban
 */
const Tag = ({
  title = '标签',
  type = 0,
  onPress = () => {},
  isSelect = false,
  style = {},
}) => {
  return (
    <Pressable
      style={StyleSheet.flatten([
        isSelect ? styles.selectTag : styles.unSelectTag,
        style,
        styles.tag,
      ])}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 12,
    paddingRight: 12,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 16,
  },
  selectTag: {
    backgroundColor: colors.rose[400],
  },
  unSelectTag: {
    backgroundColor: colors.gray[200],
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Tag;
