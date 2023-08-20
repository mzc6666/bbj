/*
 * @Description: 选择对话框
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-11 20:10:20
 * @LastEditors: Ban
 * @LastEditTime: 2023-02-14 19:31:35
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  FlatList,
} from 'react-native';
import Dialog from '../Dialog/Dialog';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '@/config/modules/global';
import colors from '@/assets/color';

/**
 * @description: 选择对话框
 * @param {boolen} isShow 是否展示
 * @param {function} onBackPress 点击蒙版触发的函数
 * @param {object} style 中间区域自定义样式
 * @param {string} title 标题
 * @param {function} onConfirmPress 点击确认回调
 * @param {array} data 渲染数据，为普通数组
 * @param {ReactNode | function} renderItem 从列表中获取一个项目data并渲染到列表中
 * @param {ReactNode} keyExtractor 用于在指定索引处为给定项目提取唯一键
 * @return {*}
 * @author: Ban
 */
const SelectDialog = ({
  isShow,
  onBackPress = () => {},
  style,
  title = '请选择',
  onConfirmPress = () => {},
  data = [],
  renderItem = () => {},
  keyExtractor,
  children,
  ...rest
}) => {
  const [selected, setSelected] = useState(0); // 被选中item索引

  return (
    <Dialog
      isShow={isShow}
      position="bottom"
      onBackPress={onBackPress}
      style={{
        padding: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View style={[styles.view]}>
        <View style={styles.header}>
          <Text
            style={{
              color: colors.font[300],
              fontSize: colors.fontSize[400],
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            {title}
          </Text>
          <Text
            onPress={() => {
              onConfirmPress(data[selected]);
              onBackPress();
            }}
            style={{
              color: colors.font[300],
              position: 'absolute',
              right: 10,
            }}>
            确定
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => {
            const renderContent = renderItem(item);

            return (
              <Pressable
                onPress={() => {
                  setSelected(index);
                }}
                style={[
                  {
                    alignItems: 'center',
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginLeft: 20,
                    marginRight: 20,
                  },
                  selected == index ? styles.selectedView : null,
                ]}>
                <Text
                  style={[
                    {
                      color: colors.font[300],
                    },
                    selected == index ? styles.selectedText : null,
                  ]}>
                  {renderContent}
                </Text>
              </Pressable>
            );
          }}
          keyExtractor={keyExtractor}
        />
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  view: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 3,
  },
  header: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.gray[100],
    borderBottomWidth: 1,
  },
  selectedView: {
    backgroundColor: '#FB718540',
    borderRadius: 8,
  },
  selectedText: {
    color: colors.rose[400],
  },
});

export default SelectDialog;
