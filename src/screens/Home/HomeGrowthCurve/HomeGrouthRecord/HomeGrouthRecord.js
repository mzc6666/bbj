/*
 * @Description: 生长记录
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-17 18:47:03
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-08 19:43:34
 */
import React, { useState, useEffect } from 'react';
import { useAsyncState } from '@/utils/hooks';
import colors from '@/assets/color';
import { GrouthRecord } from '@/network/api/family';
import LinearProgress from '@/components/LinearProgress';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBabyGrowthRecords,
  setBabyGrowthRecords,
} from '@/store/modules/baby';
import { dateToString } from '@/utils/util';
import { DEVICE_HEIGHT } from '@/config/modules/global';

/**
 * @description: 生长记录组件
 * @param {Boolean} state 检测data状态
 * @param {Array} data 生长记录数组
 * @param {*} bid 传入的bid数据
 * @param {*} progressStatus 进度条状态
 * @return {*}
 * @author: Austral
 */
const HomeGrouthRecord = props => {
  const dispatch = useDispatch();
  const babyGrowthRecords = useSelector(selectBabyGrowthRecords);
  // console.log(babyGrowthRecords);
  const [state, setState] = useAsyncState(
    babyGrowthRecords.length === 0 ? false : true,
  ); // 是否有记录

  const [bid, setBid] = useAsyncState(1);
  const [progressStatus, setProgressStatus] = useAsyncState('unload');

  useEffect(() => {
    GrouthRecord(bid, {
      beforeRequest: () => {
        setProgressStatus('loading');
      },
      afterResponse: () => {
        setProgressStatus('done');
      },
    })
      .then(res => {
        //日期转换
        for (let i in res.data.records) {
          res.data.records[i].time = dateToString(
            res.data.records[i].time,
            'YYYY-MM-DD hh:mm:ss',
          );
        }
        dispatch(setBabyGrowthRecords(res.data.records));
        setProgressStatus('done');
        if (res.data.records.length === 0) {
          setState(false);
          setProgressStatus('done');
        }
      })
      .catch(e => {
        console.log(e);
      });
  });

  if (state) {
    return (
      <View>
        <LinearProgress status={progressStatus} />
        <FlatList
          ListFooterComponent={() => (
            <View
              style={{
                height: 20,
              }}></View>
          )}
          data={babyGrowthRecords}
          renderItem={RendItem}
          keyExtractor={(item, index) => {
            return index;
          }}></FlatList>
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginTop: 100,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: colors.font[200],
            fontSize: 12,
            fontWeight: '400',
          }}>
          快来添加宝宝的生长记录吧！
        </Text>
      </View>
    );
  }
};

/**
 * @description: 单个生长记录
 * @param {*} item
 * @return {*}
 * @author: Austral
 */
const RendItem = ({ item, index }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardtop}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.time}>{item.month}</Text>
      </View>
      <View>
        <View style={styles.record}>
          <Text style={styles.title}>身高：</Text>
          {item.height && (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.number}>{item.height}</Text>
              <Text
                style={{
                  color: colors.rose[400],
                }}>
                cm
              </Text>
            </View>
          )}
        </View>
        <View style={styles.record}>
          <Text style={styles.title}>体重：</Text>
          {item.weight && (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.number}>{item.weight}</Text>
              <Text
                style={{
                  color: colors.rose[400],
                }}>
                斤
              </Text>
            </View>
          )}
        </View>
        <View style={styles.record}>
          <Text style={styles.title}>头围：</Text>
          {item.head && (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text style={styles.number}>{item.head}</Text>
              <Text
                style={{
                  color: colors.rose[400],
                }}>
                cm
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 16,
    shadowColor: '#00000016',
    backgroundColor: '#ffffff',
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 2,
  },
  cardtop: {
    paddingTop: 10,
    paddingBottom: 9,
    flexDirection: 'row',
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  time: {
    color: colors.font[200],
    marginRight: 10,
  },
  record: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  title: {
    color: colors.font[100],
    fontSize: colors.fontSize[300],
    fontWeight: '400',
  },
  number: {
    width: 30,
    color: colors.rose[400],
  },
});
export default HomeGrouthRecord;
