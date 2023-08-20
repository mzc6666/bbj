/*
 * @description: 时间选择器
 * @Version:
 * @Autor: Xu
 * @Date: 2022-07-21 20:25:45
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-09 15:59:22
 */

import colors from '@/assets/color';
import Dialog from '@/components/Dialog/Dialog';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import { View, Text, Pressable } from 'react-native';
import { useAsyncState } from '@/utils/hooks';

interface Props {
  isShow: boolean;
  onBackPress?: () => void;
  onConfirmPress?: (data: any) => void;
}

const DatePicker = ({
  isShow,
  onBackPress = () => {},
  onConfirmPress = () => {},
}: Props) => {
  const nowDate = new Date();
  const [year, setYear] = useAsyncState(nowDate.getFullYear());
  const [month, setMonth] = useState(nowDate.getMonth() + 1);
  const [day, setDay] = useState(nowDate.getDate());

  const [isYearSelected, setIsYearSelected] = useState(false);
  const [isMonthSelected, setIsMonthSelected] = useState(false);

  /**
   * @description: 获取年份列表
   * @return {*}
   * @author: Xu
   */
  const getYearList = () => {
    const yearList = [];
    for (var i = 1949; i <= nowDate.getFullYear(); i++) {
      yearList.push(i);
    }
    return yearList;
  };

  /**
   * @description: 获取月份列表
   * @return {*}
   * @author: Xu
   */
  const getMonthList = () => {
    const monthList = [];
    const nowMonth = new Date().getMonth() + 1;
    for (var j = 1; j < 13; j++) {
      monthList.push(j);
    }
    return monthList;
  };

  /**
   * @description: 每月天数
   * @return {*}
   * @author: Xu
   */
  const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const isOddMonth = (month: number) => [1, 3, 5, 7, 8, 10, 12].includes(month);

  const getDateList = () => {
    if (isLeapYear(year) && month === 2) {
      return new Array(29).fill(0).map((_, index) => index + 1);
    }

    if (!isLeapYear(year) && month === 2) {
      return new Array(28).fill(0).map((_, index) => index + 1);
    }

    if (isOddMonth(month)) {
      return new Array(31).fill(0).map((_, index) => index + 1);
    }

    return new Array(30).fill(0).map((_, index) => index + 1);
  };

  return (
    <Dialog
      isShow={isShow}
      position="bottom"
      style={{
        padding: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
      <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT / 3 }}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            borderBottomColor: colors.gray[200],
            borderBottomWidth: 1,
          }}>
          <Text
            style={{
              color: colors.font[300],
              position: 'absolute',
              marginTop: 10,
              left: 10,
            }}
            onPress={() => {
              onBackPress();
            }}>
            取消
          </Text>
          <Text
            style={{
              color: colors.font[300],
              fontSize: colors.fontSize[400],
              padding: 10,
            }}>
            请选择
          </Text>
          <Text
            style={{
              color: colors.font[300],
              position: 'absolute',
              marginTop: 10,
              right: 10,
            }}
            onPress={() => {
              let data = year + '年' + month + '月' + day + '日';
              onConfirmPress(data);
            }}>
            确定
          </Text>
        </View>
        <View>
          <Picker
            style={{
              backgroundColor: colors.gray[100],
            }}
            selectedValue={year}
            onValueChange={(itemValue, itemIndex) => {
              setYear(itemValue);
              setIsYearSelected(true);
              setDay(1);
            }}>
            {getYearList().map((item, index) => {
              return (
                <Picker.Item
                  key={item}
                  label={item + '年'}
                  value={item}
                />
              );
            })}
          </Picker>
          <Picker
            selectedValue={month}
            onValueChange={(itemValue: any, itemIndex) => {
              if (year == nowDate.getFullYear()) {
                if (itemValue > nowDate.getMonth() + 1) {
                  if (Platform.OS == 'android') {
                    ToastAndroid.showWithGravity(
                      '时间无效',
                      ToastAndroid.BOTTOM,
                      ToastAndroid.LONG,
                    );
                    return;
                  }
                }
              }
              setMonth(itemValue);
              setIsMonthSelected(true);
              setDay(1);
            }}
            enabled={isYearSelected}>
            {getMonthList().map((item, index) => {
              return (
                <Picker.Item
                  key={item}
                  label={item + '月'}
                  value={item}
                />
              );
            })}
          </Picker>
          <Picker
            style={{ backgroundColor: colors.gray[100] }}
            selectedValue={day}
            onValueChange={(itemValue, itemIndex) => {
              setDay(itemValue);
            }}
            enabled={isMonthSelected}>
            {getDateList().map((item, index) => {
              return (
                <Picker.Item
                  key={item}
                  label={item + '日'}
                  value={item}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    </Dialog>
  );
};

export default DatePicker;
