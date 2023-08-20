/*
 * @Description: 商品页-选择商品选项
 * @Version:
 * @Autor: Ban
 * @Date: 2023-03-10 19:37:29
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 16:48:23
 */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getShopOptions } from '@/network/api/mall';
import { useAsyncState } from '@/utils/hooks';
import Dialog from '@/components/Dialog/Dialog';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { Image } from '@/plugins/elementUI';
import colors from '@/assets/color';
import Button from '@/components/Button';

interface Props {
  id: number | string;
  show: boolean;
  onBackPress?(): void;
  confirm?(option: {
    cid: number;
    fid: number;
    name: string;
    count: number;
  }): void;
}

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const MallCommodityOption = ({
  id,
  show,
  onBackPress,
  confirm = () => {},
}: Props) => {
  const [optionData, setOptionData] = useAsyncState({}); // 选项数据
  const [price, setPrice] = useAsyncState(0); // 价格
  const [count, setCount] = useAsyncState(1); // 数量
  const [option, setOption] = useAsyncState({ fid: 1, cid: 2 }); // 最终的选择项

  useEffect(() => {
    getShopOptions(id)
      .then(res => {
        console.log(res.data);
        // const data = res.data.options[0];
        // const price = res.data.opPrices[0].chOptions;
        // // 处理数据
        // for (let i in data.content) {
        //   for (let j in price) {
        //     if (data.content[i]['id'] === price[j]['cid']) {
        //       data.content[i].price = price[j].price;
        //       data.content[i].inventory = price[j].inventory;
        //     }
        //   }
        // }
        // console.log(data);
        // setOption({
        //   fid: data.id,
        //   cid: data.content[0].id,
        // });
        // setPrice(data.content[0].price);
        // setOptionData({ ...data });
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);
  return (
    <View>
      <Dialog
        isShow={show}
        onBackPress={onBackPress}
        style={{
          borderRadius: 8,
        }}
        position="bottom">
        {optionData.id && (
          <View
            style={{
              width: DEVICE_WIDTH,
              height: (DEVICE_HEIGHT / 3) * 2,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}>
            {/* 图片 + 价格 */}
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={{
                  uri: 'http://asset.itsban.cn/assets/image/goods.jpg',
                }}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 4,
                }}
              />
              <Text
                style={{
                  fontSize: colors.fontSize[400],
                  color: colors.rose[400],
                  marginLeft: 15,
                }}>
                ￥ {price}
              </Text>
            </View>
            {/* 大选项 */}
            <Text
              style={{
                marginVertical: 15,
                color: colors.font[300],
                fontSize: colors.fontSize[400],
              }}>
              {optionData?.name || ''}
            </Text>
            {/* 小选项 */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {optionData.content.map((i: any, index: number) => {
                return (
                  <Pressable
                    key={i.id}
                    onPress={() => {
                      setOption({ ...option, cid: i.id });
                      setPrice(i.price);
                    }}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      marginHorizontal: 10,
                      backgroundColor:
                        option.cid === i.id
                          ? `${colors.rose[300]}60`
                          : `${colors.gray[200]}40`,
                      borderRadius: 16,
                    }}>
                    <Text
                      style={{
                        color: colors.rose[400],
                      }}>
                      {i.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {/* 数量 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text>数量</Text>
              <Text>1</Text>
            </View>
            <Button
              onPress={() => {
                confirm({ ...option });
              }}
              title="确定"
              style={{
                bottom: 10,
                position: 'absolute',
                width: '100%',
                marginHorizontal: 20,
              }}></Button>
          </View>
        )}
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MallCommodityOption;
