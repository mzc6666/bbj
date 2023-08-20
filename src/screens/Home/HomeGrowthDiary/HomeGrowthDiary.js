/*
 * @Description: 成长日记
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-06 19:57:41
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-08 20:09:15
 */
import colors from '@/assets/color';
import {
  HOME_SCREEN_ADD_GROWTH_RECORD,
  HOME_SCREEN_RECORD_BABY_EVENT,
} from '@/navigation/navigationNames';
import { defaultComponentHOC } from '@/utils/hoc';
import { Button, color } from '@rneui/base';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TitleHeader from '@/components/TitleHeader';
import { getBabyEventList } from '@/network/api/family';
import { useSelector } from 'react-redux';
import { selectBabyInfo } from '@/store/modules/baby';
import { useAsyncState } from '@/utils/hooks';
import HomeBabyDiaryList from '../components/HomeBabyDiaryList/HomeBabyDiaryList';
import {
  DEVICE_HEIGHT,
  DEVICE_HEADER_BAR_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';

/**
 * @description: 成长日记
 * @return {*}
 * @author: Ban
 */

const HomeGrowthDiary = ({ navigation }) => {
  // const babyInfo = useSelector(selectBabyInfo); // 宝宝信息
  // const [pageTime, setPageTime] = useAsyncState(0); // 分页请求时间
  // const [data, setData] = useAsyncState(); // 列表信息

  // useEffect(() => {
  //   getBabyEventList(babyInfo.id)
  //     .then(data => {
  //       setData([...data.data]);
  //       setPageTime(data.time);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });

  return (
    <View>
      <TitleHeader
        title="成长日记"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {
          return (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPress={() => {
                navigation.navigate(HOME_SCREEN_RECORD_BABY_EVENT);
              }}>
              <Text>添加</Text>
            </TouchableOpacity>
          );
        }}
      />
      <ScrollView
        style={{
          height: DEVICE_HEIGHT - DEVICE_HEADER_BAR_HEIGHT,
        }}>
        <HomeBabyDiaryList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default defaultComponentHOC(HomeGrowthDiary, {
  fillStatusBar: true,
});
