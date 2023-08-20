/*
 * @Description:新增-关注页面主要内容
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-07-22 21:32:17
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-05 09:35:32
 */
/**
 * @description:
 * @param {*}name 新增关注用户
 * @param {*}isAttention 是否互相关注
 * @param {*}time 关注时间
 * @param {*}avatar 关注用户头像
 * @return {*}
 * @author: makka-pakka
 */
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '@/assets/color';
import { Avatar } from '@/plugins/elementUI';
import { defaultComponentHOC } from '@/utils/hoc';

const MessageNewConcernContent = ({ name, isAttention, time, avatar }) => {
  const defaultTitle = '关注';
  const activeTitle = '互相关注';
  return (
    <View style={styles.container}>
      <Pressable style={styles.addIdentity}>
        <View style={styles.content}>
          <View style={styles.photo}>
            <Avatar
              size={44}
              rounded
              source={{
                uri: avatar,
              }}
              onPress={() => {}}
              activeOpacity={0.7}
            />
          </View>
          <View style={styles.contentDetails}>
            <View style={styles.detailsLeft}>
              <Text style={styles.addName}>{name}</Text>
              <View style={styles.bottom}>
                <Text style={styles.leftText}>开始关注你了</Text>
                <Text style={styles.rightText}>{time}小时前</Text>
              </View>
            </View>
            <View
              style={
                isAttention == 1 ? styles.activeViewStyle : styles.detailsView
              }>
              <Text style={isAttention == 1 ? styles.activeTextStyle : null}>
                {isAttention == 1 ? activeTitle : defaultTitle}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
export default defaultComponentHOC(MessageNewConcernContent);

const styles = StyleSheet.create({
  addIdentity: {
    width: '100%',
    height: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 350,
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentDetails: {
    width: 294,
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsLeft: {
    width: 134,
    height: 44,
    justifyContent: 'space-between',
  },
  detailsView: {
    width: 64,
    height: 26,
    borderRadius: 12,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.gray[200],
  },
  activeViewStyle: {
    width: 64,
    height: 26,
    borderRadius: 12,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.rose[400],
  },
  activeTextStyle: {
    borderColor: colors.rose[400],
    color: colors.rose[400],
  },
  addName: {
    color: colors.font[100],
    fontSize: colors.fontSize[300],
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftText: {
    color: colors.gray[500],
    fontSize: colors.fontSize[200],
    marginRight: 12,
  },
  rightText: {
    color: colors.gray[500],
    fontSize: colors.fontSize[200],
  },
});
