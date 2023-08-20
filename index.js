/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-03 13:20:27
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:47:24
 */
import {
  AppRegistry,
  PermissionsAndroid,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { name as appName } from './app.json';
import React, { useEffect, useState } from 'react';
import Navigation, { AdminNavigation } from './src/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react'; // redux-persist
import { store, persistor } from './src/store/configureStore';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useToast } from './src/utils/hooks';
import NetInfo from '@react-native-community/netinfo';
import config from './src/config';
import { setNetInfoState } from './src/store/modules/device';
import { selectLogin } from './src/store/modules/login';
import { LogBox } from 'react-native';

import './src/utils/defaultStyles';

const InitApp = () => {
  const isLogin = useSelector(state => state.login).isLogin;
  const dispatch = useDispatch();

  LogBox.ignoreLogs(['ReactImageView: Image source "null" doesn\'t exist']);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(
        'connection type:',
        state.type,
        'isConnected:',
        state.isConnected,
      );
      if (state.isConnected == false) useToast('无网络连接，请检查网络状态');
      dispatch(setNetInfoState(state.isConnected));
    });

    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    ]);

    return () => {
      unsubscribe();
    };
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <>
          <StatusBar
            animated={true}
            translucent={true}
            backgroundColor="rgba(255, 255, 255, 0)"
            barStyle="dark-content"
          />
          {isLogin ? <Navigation /> : <AdminNavigation />}
        </>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <InitApp></InitApp>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
