/*
 * @Description: 待收货screen
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-15 10:45:08
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-13 20:53:31
 */
import { NavigationHelpers, Route } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Pressable, View, Text, StyleSheet, ScrollView } from 'react-native';
import { getOrderList } from '@/network/api/mall';
import { useAsyncState, useToast } from '@/utils/hooks';
import colors from '@/assets/color';
import { Image } from '@/plugins/elementUI';

/**
 * @description: 待收货scrren
 * @param {*} navigation 导航器对象
 * @param {*} route 路由对象
 * @return {*}
 * @author: mzc
 */

const MeOrderManageUnreceive = ({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any>;
  route: Route<any> & any;
}) => {
  const [listData, setListData] = useAsyncState([]);
  const status = ['待支付', '待取货', '待收货', '完成', '已取消'];

  useEffect(() => {
    getOrderList(2)
      .then(res => {
        setListData([...res.data]);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
        useToast('获取失败，请刷新');
      });
  });

  const cancel = (item: any) => {
    item.status = 4;
    useToast('取消成功');
    setListData([...listData]);
  };

  const deleteItem = (index: number) => {
    listData.splice(index, 1);
    useToast('删除成功');
    setListData([...listData]);
  };

  return (
    <ScrollView>
      {listData.map((i: any, index: number) => {
        return (
          <Pressable
            style={{
              backgroundColor: colors.gray[0],
              marginHorizontal: 20,
              borderRadius: 8,
              marginVertical: 10,
              padding: 10,
            }}
            key={i.id}>
            <Text
              style={{
                marginRight: 10,
                textAlign: 'right',
                color: i.status === 4 ? colors.font[200] : colors.rose[400],
              }}>
              {status[i.status]}
            </Text>
            <View
              style={{
                marginVertical: 10,
                paddingHorizontal: 5,
                flexDirection: 'row',
              }}>
              <Image
                source={{
                  uri: i.shop.img || undefined,
                }}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 4,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  flexShrink: 1,
                  marginLeft: 20,
                }}>
                <Text
                  numberOfLines={2}
                  style={{
                    flexShrink: 1,
                    marginRight: 5,
                    color: colors.font[300],
                  }}>
                  {i.shop.name}
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text>{i.shop.price}</Text>
                  <Text>x {i.shop.count}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: colors.font[200],
                  fontSize: colors.fontSize[400],
                  marginRight: 10,
                }}>
                共{i.shop.count}件
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: colors.font[200],
                  fontSize: colors.fontSize[400],
                  flex: 1,
                  textAlign: 'right',
                }}>
                总价{i.shop.price} 优惠{i.shop.reducePrice} 实付
                {i.shop.payPrice}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <View
                style={{
                  backgroundColor: colors.rose[400],
                  right: 0,
                }}></View>
              <Text
                onPress={() => {
                  i.status == 0
                    ? useToast('立即支付')
                    : i.status > 2
                    ? deleteItem(index)
                    : cancel(i);
                }}
                style={{
                  fontSize: colors.fontSize[400],
                  paddingHorizontal: 12,
                  backgroundColor:
                    i.status > 0 ? colors.rose[400] : colors.gray[0],
                  paddingVertical: 5,
                  color: i.status > 0 ? colors.gray[0] : colors.font[300],
                  borderRadius: 4,
                  borderColor: colors.gray[200],
                  borderWidth: 1,
                }}>
                {i.status == 0
                  ? '立即支付'
                  : i.status > 2
                  ? '删除订单'
                  : '取消订单'}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default MeOrderManageUnreceive;
