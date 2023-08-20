/*
 * @Description: 商城首页
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-01 20:58:57
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 16:17:57
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { defaultComponentHOC } from '@/utils/hoc';
import SelectDialog from '@/components/SelectDialog';
import Dialog from '@/components/Dialog/Dialog';
import { getShopRecommend, getRecommendBanner } from '@/network/api/mall';
import { WaterFallList } from '@/components/WaterFallList';
import Swiper from 'react-native-swiper';
import { DEVICE_WIDTH } from '@/config/modules/global';
import { useAsyncState } from '@/utils/hooks';
import SearchInput from '@/components/SearchInput';
import IconPark from '@/components/IconPark';
import { Search, Shop, Shopping } from '@icon-park/svg';
import colors from '@/assets/color';

import {
  MALL_SCREEN_SHOPPINGCART,
  MALL_SCREEN_COMMODEITY_DETAIL,
  MALL_SCREEN_SEARCH,
} from '@/navigation/navigationNames';
import { Refresh } from '@/components/Refresh';

declare namespace Props {
  interface Props {}
}

/**
 * @description: 商城首页
 * @return {*}
 * @author: Ban
 */

const Mall = ({ props, navigation }: { props: any; navigation: any }) => {
  const [shopData, setShopData] = useState<any>([]); // 保存请求来的商品推荐数据
  const [bannerData, setBannerData] = useState<any>([]); // banner图推荐数据

  useEffect(() => {
    requestData();
  }, []);

  // 获取数据
  const requestData = () => {
    getShopRecommend()
      .then((res: any) => {
        console.log(res.data);
        setShopData([...res.data]);
      })
      .catch(e => {
        console.log(e);
      });
    getRecommendBanner()
      .then((res: any) => {
        console.log(res.data);
        setBannerData([...res.data]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View
      style={{
        backgroundColor: colors.gray[100],
      }}>
      <View style={[styles.mallTop]}>
        <TouchableOpacity
          onPress={e => {
            navigation.navigate(MALL_SCREEN_SEARCH);
          }}
          style={{
            flex: 1,
            backgroundColor: colors.gray[200],
            marginRight: 15,
            borderRadius: 16,
            height: 34,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconPark
            iconPark={Search({ theme: 'outline', fill: colors.font[200] })}
            size={colors['fontSize']['600']}
            style={{
              paddingLeft: 15,
              paddingRight: 8,
            }}
          />
        </TouchableOpacity>

        <Pressable
          style={{
            width: 28,
            height: 28,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate(MALL_SCREEN_SHOPPINGCART);
          }}>
          <IconPark
            iconPark={Shopping({
              theme: 'outline',
              fill: [colors.gray[800]],
            })}
            size={18}
          />
        </Pressable>
      </View>

      <View style={[styles.mallSwipe]}>
        <Swiper
          showsButtons={true}
          loop={true}
          autoplay={true}
          style={{
            height: 150,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 20,
          }}>
          {bannerData.map((item: any, index: any) => {
            return (
              <Image
                key={item.name}
                source={{
                  uri: item.img,
                }}
                style={{
                  height: 150,
                  width: DEVICE_WIDTH - 20,
                }}
              />
            );
          })}
        </Swiper>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <WaterFallList
            data={shopData}
            img="image"
            renderItem={(item: any) => {
              return (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    navigation.navigate(MALL_SCREEN_COMMODEITY_DETAIL, {
                      id: item.id,
                    });
                  }}
                  style={{
                    width: DEVICE_WIDTH / 2 - 10,
                    marginLeft: 5,
                    marginRight: 5,
                    backgroundColor: colors.gray[0],
                    marginBottom: 10,
                  }}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: item.image }}
                    style={{
                      width: DEVICE_WIDTH / 2 - 10,
                      height: item.imgHeight,
                    }}
                  />
                  <View
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        marginTop: 5,
                        marginBottom: 5,
                        color: colors.font[200],
                      }}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: colors.fontSize[100],
                        }}>
                        ￥
                      </Text>
                      <Text
                        style={{
                          fontSize: colors.fontSize[300],
                        }}>
                        {item.price}
                      </Text>
                      {item.isBargain ? (
                        <Text
                          style={{
                            marginLeft: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                            paddingTop: 1,
                            paddingBottom: 1,
                            backgroundColor: colors.rose[400] + '30',
                            color: colors.rose[400],
                            borderRadius: 4,
                            fontSize: colors.fontSize[100],
                          }}>
                          特价
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mallTop: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mallSwipe: {},
});

export default defaultComponentHOC(Mall, { scrollView: true });
