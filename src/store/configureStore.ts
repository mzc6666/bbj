/*
 * @Description: redux配置
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-08 13:19:07
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-20 19:29:25
 */
// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // android storage
import { combineReducers, Reducer } from 'redux';
import loginReducer from './modules/login';
import familyReducer from './modules/family';
import deviceReducer from './modules/device';
import userReducer from './modules/user';
import babyReducer from './modules/baby';
import mallReducer from './modules/mall';
import communityReducer from './modules/community';
import messageReducer from './modules/message';
import shoppingReducer from './modules/shopping';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: ['device'],
};

const rootReducer = combineReducers({
  login: loginReducer,
  family: familyReducer,
  device: deviceReducer,
  user: userReducer,
  baby: babyReducer,
  mall: mallReducer,
  community: communityReducer,
  message: messageReducer,
  shopping: shoppingReducer,
});

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(logger),
  devTools: false,
});

export const persistor = persistStore(store);
