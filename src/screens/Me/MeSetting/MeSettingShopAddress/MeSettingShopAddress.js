/*
 * @Description: 收货地址设置
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-21 21:39:41
 * @LastEditors: Xu
 * @LastEditTime: 2022-09-17 18:07:43
 */
import colors from '@/assets/color';
import TitleHeader from '@/components/TitleHeader';
import {
  ME_SETTING_ADDSHOPPINGADDRESS,
  ME_SETTING_SHOPPINGADDRESS,
} from '@/navigation/navigationNames';
import { defaultComponentHOC } from '@/utils/hoc';
import { Button, ScreenWidth } from '@rneui/base';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const MeSettingShopAddress = ({ navigation, route }) => {
  /**
   * @description: 设置初始数据
   * @return {*}
   * @author: Xu
   */

  const dataOfShopAddress = [
    {
      id: 1,
      receiver: '小王',
      telephone: '18779472653',
      shippingAddress: '河北保定市莲池区东山路26号',
      isChosen: true,
    },
    {
      id: 2,
      receiver: '小李',
      telephone: '18867631234',
      shippingAddress: '',
      isChosen: false,
    },
  ];

  /**
   * @description: 跳转函数
   * @return {*}
   * @author: Xu
   */

  const skipToAddShoppingAddress = () => {
    navigation.navigate(ME_SETTING_ADDSHOPPINGADDRESS);
  };

  return (
    <>
      <TitleHeader
        title="收货地址"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => (
          <Text
            style={styles.headerRightTextStyle}
            onPress={() => {
              navigation.navigate(ME_SETTING_ADDSHOPPINGADDRESS);
            }}>
            新增
          </Text>
        )}
      />
      <View>
        <ScrollView>
          {dataOfShopAddress.map((item, index) => {
            const [isPicked, setIsPicked] = useState(item.isChosen);
            return (
              <View
                style={styles.boxStyle}
                key={item.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {item.isChosen ? (
                    <View style={{ flexDirection: 'row' }}>
                      <View style={styles.boxTopLeftTextStyle1}>
                        <Text
                          style={{
                            fontSize: colors.fontSize[200],
                            fontWeight: '400',
                            color: '#ffffff',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                          }}>
                          默认
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.boxTopLeftTextStyle2,
                          {
                            left: 8,
                          },
                        ]}>
                        {item.receiver}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.boxTopLeftTextStyle2}>
                        {item.receiver}
                      </Text>
                    </View>
                  )}
                  <Text
                    style={{
                      fontSize: colors.fontSize[300],
                      fontWeight: '400',
                      color: colors.font[300],
                      paddingRight: 12,
                    }}>
                    {item.telephone}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: colors.fontSize[200],
                    fontWeight: '400',
                    color: colors.font[100],
                  }}>
                  {item.shippingAddress}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row', marginTop: 6 }}>
                    <TouchableOpacity
                      style={[
                        styles.touchableOpacityStyle,
                        {
                          height: 16,
                          width: 16,
                          marginTop: 2,
                        },
                      ]}
                      onPress={() => {}}>
                      {/* 勾选函数未实现 */}
                      {item.isChosen ? (
                        <Text style={styles.iconStyle}>{'\ue67e'}</Text>
                      ) : (
                        <Text></Text>
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: colors.fontSize[300],
                        fontWeight: '400',
                        color: colors.font[300],
                        left: 10,
                      }}>
                      设为默认地址
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', paddingRight: 12 }}>
                    <TouchableOpacity
                      style={[
                        styles.touchableOpacityStyle,
                        {
                          right: 20,
                        },
                      ]}>
                      <Text style={styles.touchableOpacityTextStyle}>编辑</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.touchableOpacityStyle]}>
                      <Text style={styles.touchableOpacityTextStyle}>删除</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerRightTextStyle: {
    marginRight: 20,
    color: colors.font[200],
  },
  boxStyle: {
    marginTop: 10,
    height: 147,
    width: ScreenWidth,
    padding: 16,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  boxTopLeftTextStyle1: {
    height: 18,
    width: 40,
    backgroundColor: colors.rose[400],
    borderRadius: 18,
    marginTop: 2,
  },
  boxTopLeftTextStyle2: {
    fontSize: colors.fontSize[400],
    fontWeight: '400',
    color: colors.font[300],
  },
  touchableOpacityStyle: {
    borderColor: colors.gray[300],
    borderWidth: 1,
  },
  touchableOpacityTextStyle: {
    fontSize: colors.fontSize[100],
    fontWeight: '500',
    color: colors.font[300],
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: colors.fontSize[200],
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default defaultComponentHOC(MeSettingShopAddress);
