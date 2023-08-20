/*
 * @Description:
 * @Version:
 * @Autor: Xu
 * @Date: 2022-07-11 23:00:13
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-04 17:17:57
 */

import React, { Component, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import Input from '@/components/Input/index';
import { useState } from 'react';
import colors from '@/assets/color';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import { DEVICE_WIDTH } from '@/config/modules/global';

const { ScreenWidth, ScreenHeight } = Dimensions.get('screen');

/**
 * @description: 添加生长记录页面
 * @return {*}
 * @author: Xu
 */

const AddGrowthRecord = ({ navigation }) => {
  //设置初始数据
  const data = {
    date: '',
    stature: '',
    weight: '',
    headcir: '',
  };
  //创建三个ref对象
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  //绑定初始数据
  const [inputData1, setInputData1] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [inputData3, setInputData3] = useState('');
  //获取时间函数
  const getTodayDate = () => {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    var day = date.getDate().toString();
    return year + '年' + month + '月' + day + '日';
  };
  return (
    //主页面
    <>
      <TitleHeader
        title="添加生长记录"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <Pressable
        onPress={() => {
          ref1.current.blur();
          ref2.current.blur();
          ref3.current.blur();
        }}>
        <View style={styles.contianer1}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle1}>身高</Text>
            <View style={styles.inputContianer}>
              <Input
                style={styles.inputStyle}
                placeholder="请输入身高"
                maxLength={3}
                // onChangeText={this._onChangeText1}
                value={[inputData1, setInputData1]}
                isClear={false}
                ref={ref1}></Input>
            </View>
            <Text style={styles.textStyle0}>cm</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle1}>体重</Text>
            <View style={styles.inputContianer}>
              <Input
                style={styles.inputStyle}
                placeholder="请输入体重"
                maxLength={3}
                // onChangeText={this._onChangeText2}
                value={[inputData2, setInputData2]}
                isClear={false}
                ref={ref2}></Input>
            </View>
            <Text style={styles.textStyle0}>kg</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textStyle1}>头围</Text>
            <View style={styles.inputContianer}>
              <Input
                style={styles.inputStyle}
                placeholder="请输入头围"
                maxLength={2}
                // onChangeText={this._onChangeText3}
                value={[inputData3, setInputData3]}
                isClear={false}
                ref={ref3}></Input>
            </View>
            <Text style={styles.textStyle0}>cm</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={styles.textStyle1}>时间</Text>
            <Text style={styles.textStyle2}>{getTodayDate()}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};
//样式
const styles = StyleSheet.create({
  // container0: {
  //   width: ScreenWidth,
  //   height: '22%',
  //   backgroundColor: colors.gray[0],
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  contianer1: {
    width: ScreenWidth,
    paddingLeft: '5.4%',
    top: 10,
    backgroundColor: colors.gray[0],
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    // color: colors.font[300],
  },
  inputContianer: {
    width: (DEVICE_WIDTH / 10) * 7,
    left: 10,
  },
  // iconStyle: {
  //   fontSize: 24,
  //   fontFamily: 'iconfont',
  //   color: colors.gray[100],
  //   left: 16,
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  // },
  inputStyle: {
    paddingVertical: 0,
    left: 23,
  },
  touchStyle: {
    width: 52,
    height: 25,
    backgroundColor: colors.rose[400],
    borderRadius: 16,
    right: 16,
    top: '3%',
  },
  textStyle0: {
    // fontSize: 14,
    // fontWeight: '400',
    paddingVertical: 10,
    left: 15,
    color: colors.font[300],
  },
  textStyle1: {
    // fontSize: colors.fontSize[300],
    // fontWeight: '400',
    paddingVertical: 10,
    color: colors.font[300],
  },
  textStyle2: {
    // fontSize: 14,
    // fontWeight: '400',
    paddingVertical: 10,
    left: 30,
    color: colors.font[300],
  },
  // textStyle3: {
  //   fontSize: 18,
  //   fontWeight: '400',
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  // },
  // textStyle4: {
  //   color: colors.font[200],
  //   fontSize: 14,
  //   fontWeight: '400',
  //   textAlign: 'center',
  //   textAlignVertical: 'center',
  // },
});

export default defaultComponentHOC(AddGrowthRecord);
