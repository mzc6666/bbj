/*
 * @Description: 标题栏组件
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-25 16:53:46
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-23 19:13:21
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '@/assets/color';
import Button from '../Button';
import { DEVICE_STATUS_BAR_HEIGHT } from '@/config/modules/global';
import { Left } from '@icon-park/svg';
import IconPark from '../IconPark';
import { DEVICE_HEADER_BAR_HEIGHT } from '@/config/modules/global';

/**
 * @description: 标题栏组件
 * @param {ReactNode | string} title 标题文字或者组件，接受string和组件
 * @param {ReactNode} headerLeft 标题栏左侧组件 `默认返回上一级按钮`
 * @param {ReactNode} headerRight 标题栏右侧组件 `默认完成按钮`
 * @param {function} headerLeftPress 标题栏左侧默认组件 点击回调
 * @param {function} headerRightPress 标题栏右侧默认组件 点击回调
 * @param {object} style 最外层样式
 * @return {ReactNode} 标题栏组件
 * @author: Ban
 */
const TitleHeader = ({
  title,
  headerLeft,
  headerRight,
  headerLeftPress = () => {},
  headerRightPress = () => {},
  navigation,
  style,
}) => {
  return (
    <View style={style}>
      <View style={styles.fill}></View>
      <View
        style={[
          styles.titleHeader,
          {
            // top: DEVICE_STATUS_BAR_HEIGHT,
          },
        ]}>
        <View style={styles.headerLeft}>
          {headerLeft == undefined ? (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Pressable
                style={{
                  marginLeft: 10,
                }}
                onPress={() => {
                  headerLeftPress();
                }}>
                <IconPark
                  iconPark={Left({ theme: 'outline', fill: colors.font[200] })}
                  size={24}
                  style={{ height: '100%', justifyContent: 'center' }}
                />
              </Pressable>
            </View>
          ) : (
            headerLeft(navigation)
          )}
        </View>
        <View style={styles.center}>
          {typeof title == 'string' ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            title
          )}
        </View>
        <View style={styles.headerRight}>
          {headerRight == undefined ? (
            <Button
              title="完成"
              style={{
                height: 30,
                paddingLeft: 12,
                paddingRight: 12,
                marginRight: 20,
              }}
              onPress={headerRightPress}
            />
          ) : (
            headerRight(navigation)
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    display: 'flex',
    flexDirection: 'row',
    height: DEVICE_HEADER_BAR_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  title: {
    color: colors.font[300],
    fontSize: 18,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row-reverse',
    height: '100%',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  fill: {
    height: DEVICE_HEADER_BAR_HEIGHT,
    width: '100%',
    backgroundColor: 'transparent',
  },
  center: {},
});

export default TitleHeader;
