/*
 * @description: 疫苗接种
 * @Version:
 * @Autor: Xu
 * @Date: 2022-07-20 22:29:52
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:38:55
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import { vaccinationDetails, vaccinationRecord } from '@/network/api/family';
import colors from '@/assets/color';
import { ScreenWidth } from '@rneui/base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { HOME_SCREEN_VACCINATION_DETAILS } from '@/navigation/navigationNames';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import { useAsyncState } from '@/utils/hooks';
import { DEVICE_HEIGHT } from '@/config/modules/global';
import { useToast } from '@/utils/hooks';
import { NavigationHelpers } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectBabyInfo } from '@/store/modules/baby';

const HomeVaccination = ({
  navigation,
}: {
  navigation: NavigationHelpers<any>;
}) => {
  //绑定疫苗信息数组
  const [dataArr, setDataArr] = useAsyncState([]);
  const babyInfo = useSelector(selectBabyInfo);
  console.log(babyInfo);

  // 获取疫苗信息
  useEffect(() => {
    vaccinationRecord(babyInfo.id)
      .then(res => {
        console.log(res.data);
        setDataArr([...res.data]);
      })
      .catch(e => {
        console.log(e);
      });
  }, [babyInfo.id, setDataArr]);
  /**
   * @description: 刷新重新获取数据
   * @return {*}
   * @author: Xu
   */
  const [refreshing, setRefreshing] = useAsyncState(false);

  const onRefresh = () => {
    setRefreshing(true);
    vaccinationRecord(babyInfo.id)
      .then(res => {
        setRefreshing(false);
        useToast('刷新成功');
        setDataArr([...res.data]);
      })
      .catch(e => {
        ToastAndroid.showWithGravity(
          '加载失败',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        setRefreshing(false);
        console.log(e);
      });
  };

  return (
    <View
      style={{
        height: DEVICE_HEIGHT,
      }}>
      <TitleHeader
        title="疫苗接种"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => (
          <Text style={styles.headerRightTextStyle}>添加</Text>
        )}
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          {dataArr.map((item: any, index: number) => {
            return (
              <View
                style={styles.boxStyle}
                key={item.id}>
                <Text style={styles.vaccinesTextStyle}>{item.name}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(HOME_SCREEN_VACCINATION_DETAILS, {
                      name: item.name,
                      status: item.status,
                      id: item.id,
                    });
                  }}>
                  {item.status ? (
                    <Text
                      style={[
                        styles.isInoculateStyle1,
                        {
                          backgroundColor: colors.auxiliary[200],
                          color: '#ffffff',
                          borderRadius: 16,
                        },
                      ]}>
                      已接种
                    </Text>
                  ) : (
                    <Text style={styles.isInoculateStyle1}>未接种</Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRightTextStyle: {
    marginRight: 20,
    color: colors.font[200],
  },
  vaccinesTextStyle: {
    color: colors.font[300],
    paddingLeft: 20,
  },
  isInoculateStyle1: {
    fontSize: colors.fontSize[300],
    color: colors.font[300],
    paddingRight: 12,
    paddingLeft: 12,
    paddingBottom: 3,
    paddingTop: 3,
    marginRight: 20,
  },
  boxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: ScreenWidth,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    backgroundColor: '#ffffff',
  },
});

// export default HomeVaccination;
export default defaultComponentHOC(HomeVaccination);
