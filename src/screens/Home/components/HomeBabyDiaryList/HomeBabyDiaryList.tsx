/*
 * @Description: 宝宝日记列表组件
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-18 15:31:18
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:51:32
 */
import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getBabyEventList } from '@/network/api/family';
import { useDispatch } from 'react-redux';
import { setBabyEventListState } from '@/store/modules/baby';
import colors from '@/assets/color';
import { computeDate, calculateTime, dateToString } from '@/utils/util';
import { DEVICE_WIDTH } from '@/config/modules/global';
import { useAsyncState } from '@/utils/hooks';

/**
 * @description: 宝宝日记列表组件
 * @param {number} bid 宝宝id
 * @return {*}
 * @author: Ban
 */

const HomeBabyDiaryList = ({ bid }: { bid: number }) => {
  const dispatch = useDispatch();
  const [babyEventList, setBabyEventList] = useAsyncState(undefined); // 时间列表数据
  // const times = useRef(0);
  // times.current++;

  useEffect(() => {
    getBabyEventList(bid)
      .then(res => {
        setBabyEventList([...res.data]);
        dispatch(setBabyEventListState([...res.data]));
      })
      .catch(e => {
        console.log(e);
      });
  }, [bid]);

  // console.log(`渲染${times.current}次, bid: ${bid}`);

  return (
    <View
      style={{
        marginLeft: 10,
        marginTop: 20,
      }}>
      {babyEventList?.map((item: any, index: number) => {
        return (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginRight: 10,
                alignItems: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    padding: 6,
                    backgroundColor: colors.auxiliary[100],
                    borderRadius: 16,
                  }}></View>
                <View
                  style={{
                    padding: 4,
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    borderRadius: 16,
                  }}></View>
              </View>
              {index === babyEventList.length - 1 || (
                <View
                  style={{
                    width: 1,
                    flex: 1,
                    backgroundColor: colors.gray[300],
                  }}></View>
              )}
            </View>
            <View
              style={{
                paddingBottom: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    color: colors.font[300],
                    marginRight: 10,
                    width: 50,
                    textAlign: 'right',
                  }}>
                  {computeDate(item.time)}
                </Text>
                <Text
                  style={{
                    color: colors.font[200],
                    fontSize: colors.fontSize[200],
                  }}>
                  {calculateTime(item.age)}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 9,
                  borderRadius: 16,
                  width: DEVICE_WIDTH - 70,
                  marginTop: 5,
                }}>
                <Image
                  source={{
                    uri: item.img || undefined,
                  }}
                  style={{
                    height: 160,
                    borderRadius: 16,
                    marginBottom: 8,
                  }}
                />
                <Text>{item.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    paddingBottom: 6,
                  }}>
                  <Text
                    style={{
                      color: colors.font[200],
                      fontSize: colors.fontSize[200],
                      marginRight: 10,
                    }}>
                    {item.identity}
                  </Text>
                  <Text
                    style={{
                      color: colors.font[200],
                      fontSize: colors.fontSize[200],
                    }}>
                    {dateToString(item.time, 'YYYY-MM-DD')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}

      {/* <Text>HomeBabyDiaryList</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default memo(HomeBabyDiaryList);
