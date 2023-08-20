/*
 * @Description: 头围曲线组件
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-12 13:44:14
 * @LastEditors: Ban
 * @LastEditTime: 2022-12-24 13:25:30
 */
import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import WebView from 'react-native-webview';
import { DEVICE_HEIGHT } from '@/config/modules/global';
import { useSelector } from 'react-redux';
import { selectBabyGrowthRecords } from '@/store/modules/baby';

const HomeHeaderCurve = () => {
  const babyGrowthRecords = useSelector(selectBabyGrowthRecords);
  const webViewRef = useRef(null);

  // 向页面注入javascript
  const inject = () => {
    const data = babyGrowthRecords.map(value => {
      return [new Date(value.time).getTime(), value.head];
    });
    data.sort((cur, next) => {
      return cur[0] - next[0];
    });
    console.log(data);
    let s = JSON.stringify(data);
    const script = `window.dispatchEvent(new CustomEvent('message', {detail: ${s}}));
  true;`;
    // console.log(script);
    webViewRef.current?.injectJavaScript(script);
  };

  return (
    <View>
      <View
        style={{
          height: '100%',
        }}>
        <WebView
          nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
          ref={r => {
            webViewRef.current = r;
          }}
          onLoad={syntheticEvent => {
            console.log('onload');
            inject();
          }}
          source={{
            uri: 'http://114.132.180.167:9000/app/growth',
            // uri: 'http://127.0.0.1:8080/app/growth',
          }}
          onMessage={e => {
            console.log('accept message', e.nativeEvent);
          }}
        />
      </View>
    </View>
  );
};

export default HomeHeaderCurve;

const styles = StyleSheet.create({});
