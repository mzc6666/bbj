/**
 * @Description: 文章详情
 * @Version:
 * @Author: Xu
 * @Date:
 * @LastEditor: Xu
 * @LastEditTime:
 */

import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';
import { defaultComponentHOC } from '@/utils/hoc';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

/**
 * @description: NULL
 * @param {*} param0
 * @returns {*}
 * @author: Xu
 */

const CommunityArticleDetails = ({ navigation, route }) => {
  const webViewRef = useRef(null);
  const id = route.params.id;
  const inject = () => {
    const script = `const articleId = ${id}`;
    webViewRef.current?.injectJavaScript(script);
  };
  return (
    <View style={{ height: '100%', padding: 10 }}>
      {/* <Text>跳转成功</Text> */}
      <View
        style={{
          height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
          flex: 1,
        }}>
        <WebView
          nativeConfig={{ props: { webContentDebuggingEnabled: true } }}
          ref={r => {
            webViewRef.current = r;
          }}
          onLoad={syntheticEvent => {
            console.log('onload');
            inject();
          }}
          source={{
            uri: 'http://114.132.180.167:9000/app/assay',
          }}
          onMessage={e => {
            console.log('accept message', e.nativeEvent);
            if (e.nativeEvent.data == 'go-back') navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default defaultComponentHOC(CommunityArticleDetails, {
  fillStatusBar: true,
});
