/*
 * @Description: 定位和地图
 * @Version:
 * @Autor: Ban
 * @Date: 2023-03-03 15:44:09
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 11:39:22
 */
import { PermissionsAndroid, Platform } from 'react-native';
import {
  init,
  Geolocation,
  setNeedAddress,
  setLocatingWithReGeocode,
  setHttpTimeout,
} from 'react-native-amap-geolocation';
import { AMapSdk } from 'react-native-amap3d';

// 创建定位实例
export const createGeolocation = async () => {
  // 对于 Android 需要自行根据需要申请权限
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);

  // 使用自己申请的高德 App Key 进行初始化
  await init({
    ios: '9bd6c82e77583020a73ef1af59d0c759',
    android: '1a3f485492e7b9d6ddc97c1b54a7e021',
  });

  // android逆地址编码
  setNeedAddress(true);
  // ios逆地址编码
  setLocatingWithReGeocode(true);
  // 联网超时时间
  setHttpTimeout(5000);
};

export const createAMap = () => {
  AMapSdk.init(
    Platform.select({
      android: '1a3f485492e7b9d6ddc97c1b54a7e021',
      ios: '9bd6c82e77583020a73ef1af59d0c759',
    }),
  );
};

/**
 * 获取当前位置
 * @date 2023-03-03
 * @returns {any}
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      ({ coords, location }) => {
        resolve({ coords, location });
      },
      err => {
        reject(err);
      },
    );
  });
};

/**
 * 逆地理编码
 * @param location 地理位置，经纬度
 * @returns
 */
export const georegeo = (latitude: number, longitude: number) => {
  latitude = parseFloat(
    latitude
      .toString()
      .split('.')
      .map((i, index) => (index == 1 ? i.slice(0, 6) : i))
      .join('.'),
  );
  longitude = parseFloat(
    longitude
      .toString()
      .split('.')
      .map((i, index) => (index == 1 ? i.slice(0, 6) : i))
      .join('.'),
  );

  return fetch(
    `https://restapi.amap.com/v3/geocode/regeo?key=a6e88d2bba09e7f2fb8694129788c39e&location=${longitude},${latitude}`,
  );
};
