/*
 * @description: 购物车
 * @Version:
 * @Autor: 许志兴
 * @Date: 2022-12-21 12:59:10
 * @LastEditors: Xu
 * @LastEditTime: 2023-04-14 17:41:11
 */

import colors from '@/assets/color';
import Dialog from '@/components/Dialog/Dialog';
import IconPark from '@/components/IconPark';
import TitleHeader from '@/components/TitleHeader';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';
import { MALL_SCREEN_SHOPPINGCARTPAYMENT } from '@/navigation/navigationNames';
import { shopCar, changeShopCar } from '@/network/api/mall';
import { defaultComponentHOC } from '@/utils/hoc';
import { useAsyncState, useToast } from '@/utils/hooks';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Down } from '@icon-park/svg';
import { add, subtract, multiply } from '@/utils/math';
import { NavigationHelpers, useTheme } from '@react-navigation/native';
import MallCommodityOption from '../components/MallCommodityOption';

const MallShoppingCart = ({
  navigation,
}: {
  navigation: NavigationHelpers<any>;
}) => {
  const [isManage, setIsManage] = useState(false); // 是否进入管理状态
  const [isAllPicked, setIsAllPicked] = useState(false); // 全选
  const [sum, setSum] = useState(0);
  const [cartData, setCartData] = useAsyncState([]); // 购物车数据
  const [pickedNum, setPickedNum] = useAsyncState(0); // 已选中的数量
  const [optionDialog, setOptionDialog] = useAsyncState(false);
  const [optionId, setOptionId] = useAsyncState(0);

  // 全选/取消全选
  const allPick = () => {
    if (!isAllPicked) {
      let sum = 0;
      cartData.forEach((item: any) => {
        sum = add(sum, item.price);
        item.isPicked = true;
      });
      setSum(sum);
      setCartData([...cartData]);
      setPickedNum(cartData.length);
    } else {
      cartData.forEach((item: any) => {
        item.isPicked = false;
      });
      setSum(0);
      setCartData([...cartData]);
      setPickedNum(0);
    }
    setIsAllPicked(!isAllPicked);
  };

  // 获取数据
  useEffect(() => {
    shopCar()
      .then((res: any) => {
        const data = res.data.map((item: any) => {
          return { ...item, isPicked: false };
        });
        console.log(data);
        setCartData([...data]);
      })
      .catch(e => {
        console.log(e);
      });
  });

  // 商品选择数量+1
  const addShop = (() => {
    let flag = true; // 是否可以进行操作
    return (item: any) => {
      if (!flag) return;
      flag = false;
      changeShopCar(item.id, {}, item.count + 1)
        .then(res => {
          item.count++;
          setCartData([...cartData]);
          if (item.isPicked) setSum(add(sum, item.price));
          flag = true;
        })
        .catch(err => {
          console.log(err);
        });
    };
  })();

  // 商品选择数量-1
  const reduce = (() => {
    let flag = true; // 是否可以进行操作
    return (item: any) => {
      if (item.count == 1 || !flag) return;
      flag = false;
      changeShopCar(item.id, {}, item.count - 1)
        .then(res => {
          item.count--;
          setCartData([...cartData]);
          if (item.isPicked) setSum(subtract(sum, item.price));
          flag = true;
        })
        .catch(err => {
          console.log(err);
        });
    };
  })();

  // 勾选商品
  const pick = (item: any) => {
    if (item.isPicked) {
      if (pickedNum - 1 !== cartData.length) setIsAllPicked(false);
      setPickedNum(pickedNum - 1);
      item.isPicked = false;
      setSum(subtract(sum, multiply(item.price, item.count)));
    } else {
      if (pickedNum + 1 == cartData.length) setIsAllPicked(true);
      setPickedNum(pickedNum + 1);
      item.isPicked = true;
      setSum(add(sum, multiply(item.price, item.count)));
    }
    setCartData([...cartData]);
  };

  const manageShop = () => {
    setIsManage(!isManage);
  };

  return (
    <View
      style={{
        // height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
        flex: 1,
      }}>
      <View>
        {/* 标题栏 */}
        <TitleHeader
          title="购物车"
          navigation={navigation}
          headerLeftPress={() => {
            navigation.goBack();
          }}
          headerRight={() => (
            <Text
              style={{ marginRight: 15, fontSize: 14, color: '#000' }}
              onPress={() => {
                manageShop();
              }}>
              {isManage ? '完成' : '管理'}
            </Text>
          )}
        />
        {/* 购物车商品栏 */}
        {optionDialog && (
          <MallCommodityOption
            confirm={option => {
              useToast('修改成功');
              setOptionDialog(false);
            }}
            id={optionId}
            show={optionDialog}
            onBackPress={() => {
              setOptionDialog(false);
            }}
          />
        )}
        <ScrollView style={styles.scroll}>
          {cartData.map((item: any) => {
            return (
              <View
                style={styles.item}
                key={item.id}>
                <TouchableOpacity
                  style={
                    item.isPicked || isAllPicked
                      ? [
                          styles.item_touchableStyle,
                          {
                            backgroundColor: colors.rose[400],
                          },
                        ]
                      : [
                          styles.item_touchableStyle,
                          { backgroundColor: colors.gray[100] },
                        ]
                  }
                  onPress={() => {
                    pick(item);
                  }}></TouchableOpacity>
                {/* 图片 */}
                <Image
                  source={{ uri: item.img }}
                  style={styles.itemImage}
                />
                {/* 详细信息 */}
                <View style={{ marginLeft: 5, flex: 1 }}>
                  {/* 标题 */}
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={StyleSheet.flatten([
                      styles.textStyle,
                      {
                        color: colors.font[300],
                      },
                    ])}>
                    {item.title}
                  </Text>
                  {/* 选项 */}

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                    }}
                    onPress={() => {
                      setOptionId(item.id);
                      setOptionDialog(true);
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.gray[200],
                        borderRadius: 4,
                        padding: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text style={{ marginRight: 2, color: colors.font[200] }}>
                        {item.option}
                      </Text>
                      <IconPark
                        iconPark={Down({
                          theme: 'outline',
                          fill: [colors.font[200]],
                        })}
                        size={18}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* 价格 */}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: colors.fontSize[500],
                          color: colors.font[300],
                          marginTop: 5,
                        }}>
                        ¥{item.price}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        onPress={() => {
                          reduce(item);
                        }}
                        style={{
                          fontSize: colors.fontSize[300],
                          paddingRight: 3,
                          paddingLeft: 3,
                          marginRight: 3,
                          borderColor: colors.font[100],
                          borderWidth: 1,
                        }}>
                        -
                      </Text>
                      <Text
                        style={{
                          fontSize: colors.fontSize[300],
                        }}>
                        {item.count}
                      </Text>
                      <Text
                        onPress={() => {
                          addShop(item);
                        }}
                        style={{
                          fontSize: colors.fontSize[300],
                          paddingRight: 3,
                          marginLeft: 3,
                          paddingLeft: 3,
                          borderColor: colors.font[100],
                          borderWidth: 1,
                        }}>
                        +
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
          {/* 猜你喜欢 */}
          <Text style={styles.middle_title}>猜你喜欢</Text>

          <View style={{ backgroundColor: '#fff', height: 300 }}></View>
        </ScrollView>
      </View>
      {/* 底部 */}
      <View style={styles.bottom_contianer}>
        <View style={{ flexDirection: 'row', padding: 14 }}>
          <TouchableOpacity
            style={
              isAllPicked
                ? [styles.touchableStyle, { backgroundColor: colors.rose[400] }]
                : [styles.touchableStyle, { backgroundColor: colors.gray[100] }]
            }
            onPress={() => {
              allPick();
            }}></TouchableOpacity>
          <Text
            style={{
              paddingLeft: 10,
              color: colors.font[300],
              fontSize: colors.fontSize[400],
            }}>
            全选
          </Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 8 }}>
          {isManage ? (
            <></>
          ) : (
            <View style={{ flexDirection: 'row', margin: 8 }}>
              <Text
                style={{
                  color: colors.font[200],
                  fontSize: colors.fontSize[200],
                  paddingRight: 6,
                }}>
                总计:
              </Text>
              <Text
                style={{
                  color: colors.rose[400],
                  fontSize: colors.fontSize[200],
                  paddingRight: 10,
                }}>
                ¥{sum}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.bottom_button}
            onPress={() => {
              setIsManage(false);
              setIsAllPicked(false);
            }}>
            {isManage ? (
              <Text style={styles.button_text}>删除</Text>
            ) : (
              <Text
                style={styles.button_text}
                onPress={() => {
                  if (sum == 0) {
                    useToast('尚未选择任何商品');
                    console.log('尚未选择任何商品');
                  } else {
                    navigation.navigate(MALL_SCREEN_SHOPPINGCARTPAYMENT, {
                      data: cartData,
                      price: sum,
                    });
                  }
                }}>
                结算
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: 10,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 8,
    // width: '100%'
  },
  item_touchableStyle: {
    height: 16,
    width: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderStyle: 'solid',
    marginTop: 35,
    marginRight: 12,
    marginLeft: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    paddingLeft: 40,
  },
  middle_title: {
    paddingLeft: 10,
    color: colors.font[300],
    fontSize: colors.fontSize[300],
    marginTop: 10,
    marginBottom: 10,
  },
  bottom_contianer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: colors.gray[0],
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  touchableStyle: {
    height: 16,
    width: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderStyle: 'solid',
    marginTop: 2,
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: colors.fontSize[300],
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  bottom_button: {
    backgroundColor: colors.rose[400],
    borderRadius: 16,
    width: 100,
    marginRight: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_text: {
    color: '#fff',
    fontSize: colors.fontSize[400],
  },
  textStyle: {
    fontSize: colors.fontSize[400],
    fontWeight: '400',
  },
  dialogStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: (3 / 4) * ScreenHeight,
    width: ScreenWidth,
  },
});

export default defaultComponentHOC(MallShoppingCart);
