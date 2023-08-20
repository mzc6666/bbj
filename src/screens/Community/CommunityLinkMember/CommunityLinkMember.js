/*
 * @Description: 发布文章-艾特全体成员
 * @Version:
 * @Autor: Xu
 * @Date: 2022-07-09 13:33:09
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-01 17:00:58
 */

import colors from '@/assets/color';
import Search from '@/components/Search';
import { ScreenWidth } from '@rneui/base';
import { Avatar } from '@/plugins/elementUI';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import TitleHeader from '@/components/TitleHeader';

const CommunityLinkMember = ({ navigation }) => {
  //设置是否选中状态
  const [pressStatus, setPressStatus] = useState('true');
  //设置好友初始状态
  const [haveFriends, setHaveFriends] = useState('ture');
  //设置初始数据
  const pressReact = () => {
    if (pressStatus) {
      setPressStatus(false);
    } else {
      setPressStatus(true);
    }
  };
  let data = [
    {
      userNmae: 'Ban',
      title: 'SS',
    },
    {
      userNmae: 'Ban',
      title: 'SS',
    },
    {
      userNmae: 'Ban',
      title: 'SS',
    },
  ];

  return (
    <>
      <TitleHeader
        title="好友列表"
        navigation={navigation}
      />
      <View style={styles.wholeStyle}>
        <View style={StyleSheet.flatten([styles.viewSearch])}>
          <Search></Search>
        </View>
        <View style={styles.contianer3}>
          <Text style={styles.textStyle3}>好友列表</Text>
        </View>
        <FlatList
          data={data}
          renderItem={exampleItem}></FlatList>
        <Text
          isShow={!haveFriends}
          style={styles.textStyle5}>
          好友列表为空
        </Text>
      </View>
    </>
  );
};

//FlatList单个样式
const exampleItem = ({ item, pressStatus }) => {
  return (
    <View style={styles.contianer4}>
      <TouchableOpacity
        style={pressStatus ? styles.buttonChange2 : styles.buttonChange1}
        onPress={() => {}}></TouchableOpacity>
      <Avatar></Avatar>
      <Text style={styles.textStyle4}>{item.userNmae}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  //整体样式
  wholeStyle: {
    width: ScreenWidth,
    top: '3%',
  },
  //搜索栏样式
  viewSearch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 11,
  },
  //好友列表元素样式
  contianer3: {
    height: 30,
    width: ScreenWidth,
    top: 10,
    backgroundColor: colors.gray[0],
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
  },
  textStyle3: {
    left: '3%',
    padding: '1.5%',
    color: colors.font[100],
    fontSize: colors.fontSize[200],
    fontWeight: '400',
  },
  //FlatList中单个元素样式
  contianer4: {
    flexDirection: 'row',
    top: 10,
    width: ScreenWidth,
    height: 50,
    backgroundColor: colors.gray[0],
  },
  //颜色改变
  buttonChange1: {
    left: 21,
    top: '3%',
    width: 16,
    height: 16,
    borderStyle: 'solid',
    borderRadius: 999,
    backgroundColor: colors.gray[0],
    borderWidth: 1,
  },
  buttonChange2: {
    left: 21,
    top: '3%',
    width: 16,
    height: 16,
    borderStyle: 'solid',
    borderRadius: 999,
    backgroundColor: colors.rose[400],
  },
  textStyle4: {
    left: 60,
    top: 15,
    width: 26,
    height: 21,
    color: 'rgba(0, 0, 0, 1)',
    fontSize: colors.fontSize[300],
    fontWeight: '400',
  },
  //好友列表为空样式
  textStyle5: {
    textAlign: 'center',
    top: '80%',
  },
});

export default CommunityLinkMember;
