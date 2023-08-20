/*
 * @Description: 商品详情
 * @Version:
 * @Autor: Ban
 * @Date: 2022-12-24 14:48:15
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 16:40:06
 */
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { defaultComponentHOC, defaultScreenHOC } from '@/utils/hoc';
import {
  DEVICE_HEIGHT,
  DEVICE_HEIGHT_GLOBA,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';
import MallCommodityOption from '../components/MallCommodityOption';
import {
  MALL_SCREEN_SHOPPINGCART,
  MALL_SCREEN_SHOPPINGCARTPAYMENT,
} from '@/navigation/navigationNames';
import { useAsyncState, useToast } from '@/utils/hooks';

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const MallCommodityDetail = ({ props, navigation, route }) => {
  const webViewRef = useRef(null);
  const id = route.params.id;
  const [optionDialog, setOptionDialog] = useAsyncState(false);

  const operations = {
    goBack: () => {
      navigation.goBack();
    },
    goMore: () => {},
    goShoppingCart: () => {
      navigation.navigate(MALL_SCREEN_SHOPPINGCART);
    },
    goBuy: () => {
      navigation.navigate(MALL_SCREEN_SHOPPINGCARTPAYMENT);
    },
    goGuide: () => {},
    addShoppingCart: () => {
      setOptionDialog(true);
    },
  };
  // 向页面注入javascript
  const inject = () => {
    // const data = babyGrowthRecords.map(value => {
    //   return [new Date(value.time).getTime(), value.head];
    // });
    // data.sort((cur, next) => {
    //   return cur[0] - next[0];
    // });
    // console.log(data);
    // let s = JSON.stringify(data);
    const script = `const goodsId = ${id}`;
    // console.log(script);
    webViewRef.current?.injectJavaScript(script);
  };

  return (
    <View
      style={{
        height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
      }}>
      {optionDialog && (
        <MallCommodityOption
          confirm={option => {
            useToast('添加成功');
            setOptionDialog(false);
          }}
          id={id}
          show={optionDialog}
          onBackPress={() => {
            setOptionDialog(false);
          }}
        />
      )}
      <View
        style={{
          // height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
          flex: 1,
          // height: '100%'
        }}>
        <WebView
          nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
          ref={r => {
            webViewRef.current = r;
          }}
          onLoad={syntheticEvent => {
            inject();
          }}
          source={{
            uri: 'http://114.132.180.167:9000/app/mall',
            // uri: 'http://127.0.0.1:8080/app/growth',
          }}
          onMessage={e => {
            console.log('accept message', e.nativeEvent);
            if (e.nativeEvent.data == 'go-back') operations.goBack();
            if (e.nativeEvent.data == 'open-shopping-cart')
              operations.goShoppingCart();
            if (e.nativeEvent.data == 'add-shopping-cart')
              operations.addShoppingCart();
            if (e.nativeEvent.data == 'go-buy') operations.goBuy();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default defaultComponentHOC(MallCommodityDetail, {
  fillStatusBar: true,
});
