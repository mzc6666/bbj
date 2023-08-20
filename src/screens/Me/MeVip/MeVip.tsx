/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2023-03-12 19:41:48
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 20:28:55
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { defaultComponentHOC, defaultScreenHOC } from '@/utils/hoc';
import { NavigationHelpers } from '@react-navigation/native';
import TitleHeader from '@/components/TitleHeader';
import colors from '@/assets/color';
import Button from '@/components/Button';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';
import { useAsyncState, useToast } from '@/utils/hooks';

interface Props {
  navigation: NavigationHelpers<any>;
}

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const MeVip = ({ navigation }: Props) => {
  const list = [
    {
      title: '黄铜会员',
      weal: [
        '7x24h在线客服服务',
        '一对一专属导购',
        '会员折上折',
        '每月价值100元消费券',
      ],
    },
    {
      title: '黄金会员',
      weal: [
        '7x24h在线客服服务',
        '一对一专属导购',
        '会员折上折',
        '每月价值300元消费券',
        '积分当钱花',
        '专属礼品',
      ],
    },
    {
      title: '钻石会员',
      weal: [
        '7x24h在线客服服务',
        '一对一专属导购',
        '会员折上折',
        '每月价值500元消费券',
        '积分当钱花',
        '专属礼品',
        '优质售后服务',
        '每月3次快速退款',
      ],
    },
  ];
  const [selectedIndex, setSelectedIndex] = useAsyncState(0);

  return (
    <View
      style={{
        height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
      }}>
      <TitleHeader
        title="会员权益"
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => null}
      />
      <ScrollView
        style={{
          marginHorizontal: 20,
          flex: 1,
        }}>
        {/* 占位 */}
        <View style={{ height: 20 }}></View>
        {/* 内容 */}
        {list.map((i, index) => {
          return (
            <Pressable
              onPress={() => {
                setSelectedIndex(index);
              }}
              key={i.title}
              style={{
                paddingVertical: 10,
                backgroundColor: colors.gray[0],
                paddingHorizontal: 10,
                borderRadius: 8,
                marginVertical: 10,
                borderColor: colors.rose[400],
                borderWidth: selectedIndex === index ? 2 : 0,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: colors.fontSize[600],
                  color: colors.rose[400],
                  marginBottom: 10,
                }}>
                {i.title}
              </Text>
              <View>
                {i.weal.map((j, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        fontSize: colors.fontSize[400],
                        color: colors.font[300],
                        marginVertical: 5,
                      }}>
                      {j}
                    </Text>
                  );
                })}
              </View>
            </Pressable>
          );
        })}
        <Button
          onPress={() => {
            useToast('恭喜你，成功加入会员');
          }}
          title="成为会员"
          style={{
            marginVertical: 20,
          }}></Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default defaultComponentHOC(MeVip);
