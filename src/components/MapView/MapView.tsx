/*
 * @Description: MapView 地图组件
 * @Version:
 * @Autor: Ban
 * @Date: 2023-03-11 15:49:17
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 14:19:51
 */
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MapView as Map, MapType, Marker } from 'react-native-amap3d';
import { createAMap } from '@/utils/geolocation';
import { useAsyncState } from '@/utils/hooks';
import colors from '@/assets/color';
import { georegeo } from '@/utils/geolocation';
import ActionDialog from '../ActionDialog/ActionDialog';

interface Props {
  latitude?: number;
  longitude?: number;
  // 是否显示位置
  showPosition?: boolean;
  confirm?(position: string): void;
  cancel?(): void;
  children?: any;
  /**
   * 选择门店标记触发
   */
  chooseShop?(shoplocation: { latitude: number; longitude: number }): void;
  /**
   * 是否显示门店
   */
  showShop?: boolean;
}

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const MapView = ({
  latitude = 28.649234,
  longitude = 115.827856,
  showPosition = false,
  cancel = () => {},
  confirm = () => {},
  chooseShop = () => {},
  children,
  showShop = false,
}: Props) => {
  const [markerPosition, setMarkerPosition] = useAsyncState({
    latitude,
    longitude,
  });
  const [position, setPosition] = useAsyncState('获取定位');
  const [shopLocation, setShopLocation] = useAsyncState({
    latitude: 28.6544439412459,
    longitude: 115.82614372707921,
  });
  const [showDialog, setShowDialog] = useAsyncState(false); // 是否显示对话框

  useEffect(() => {
    createAMap();
  }, []);

  useEffect(() => {
    georegeo(markerPosition.latitude, markerPosition.longitude)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.infocode !== '10000') setPosition('获取位置失败');
        setPosition(data.regeocode.formatted_address);
      })
      .catch(err => {
        console.log(err);
      });
  }, [markerPosition, setPosition]);

  return (
    <View
      style={{
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT - 100,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          numberOfLines={2}
          style={{
            flex: 1,
          }}>
          {position}
        </Text>
        <View style={styles.button}>
          <Text
            onPress={() => {
              cancel();
            }}>
            取消
          </Text>
        </View>
        <View style={styles.button}>
          <Text
            onPress={() => {
              confirm(position);
            }}>
            确定
          </Text>
        </View>
      </View>
      <Map
        mapType={MapType.Standard}
        myLocationEnabled={true}
        onPress={({ nativeEvent }) => {
          setMarkerPosition({
            latitude: nativeEvent.latitude,
            longitude: nativeEvent.longitude,
          });
        }}
        compassEnabled={false}
        initialCameraPosition={{
          target: {
            latitude: latitude,
            longitude: longitude,
          },

          zoom: 15,
        }}>
        <Marker
          position={{
            latitude: markerPosition.latitude,
            longitude: markerPosition.longitude,
          }}></Marker>
        {showShop && (
          <>
            <Marker
              onPress={() => {
                setShowDialog(true);
              }}
              position={{
                latitude: 28.6544439412459,
                longitude: 115.82614372707921,
              }}>
              <Image
                source={require('@/assets/imgs/bbj.jpg')}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </Marker>
            <ActionDialog
              isShow={showDialog}
              comfirm={() => {
                chooseShop(shopLocation);
              }}
              cancel={() => {
                setShowDialog(false);
              }}>
              <Text>确定选择该门店？</Text>
            </ActionDialog>
          </>
        )}

        {children}
      </Map>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: colors.rose[400],
    borderRadius: 8,
    marginRight: 10,
    justifyContent: 'center',
  },
});

export default MapView;
