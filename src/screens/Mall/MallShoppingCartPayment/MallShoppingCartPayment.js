/*
 * @description: 订单支付
 * @Version:
 * @Autor: 许志兴
 * @Date: 2022-12-28 16:53:45
 * @LastEditors: Xu
 * @LastEditTime: 2023-04-14 17:42:25
 */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { defaultComponentHOC } from '@/utils/hoc';
import TitleHeader from '@/components/TitleHeader';
import Dialog from '@/components/Dialog/Dialog';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import colors from '@/assets/color';
import IconPark from '@/components/IconPark';
import { Close, Check, Right, MultilayerSphere } from '@icon-park/svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  addShoppingCartState,
  selectShoppingCart,
} from '@/store/modules/shopping';
import { useAsyncState, useToast } from '@/utils/hooks';
import {
  MALL_SCREEN,
  ME_SETTING_ADDSHOPPINGADDRESS,
} from '@/navigation/navigationNames';
import { set } from 'immer/dist/internal';
import MapView from '@/components/MapView/MapView';

// 待完善
// “添加”按钮 对应代码 122行
// “商品” 对应代码 140行
// “价格” 对应代码 147，151，159，310行

const MallShoppingCartPayment = ({ navigation, route }) => {
  const [Payment, setPayment] = useState(false); // 默认关闭
  const [payment_ways, set_payment_ways] = useState(true); // 默认微信支付
  const [take_ways, set_take_ways] = useState(true); // 默认自提
  const [take_way_value, set_take_way_value] = useAsyncState(0); // 默认配送费为 ¥ 0

  const originLocation = '查看门店位置';
  const [location, setLocation] = useAsyncState(originLocation);
  const [showMap, setShowMap] = useAsyncState(false);
  const [isLocated, setIsLocated] = useAsyncState(false);

  const { data, price } = route.params;
  // console.log(data);
  // const shoppingCart = useSelector(selectShoppingCart);
  // const dispatch = useDispatch();

  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: colors.gray[0],
      }}>
      <TitleHeader
        title="订单支付"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => <></>}
      />
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <View style={styles.box_inner}>
            <Text>选择收货方式</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', right: 16 }}>
                <View style={{ marginTop: 2, right: 6 }}>
                  <TouchableOpacity
                    style={
                      take_ways ? styles.choose_one : styles.choose_another
                    }
                    onPress={() => {
                      set_take_ways(true);
                      set_take_way_value(0);
                    }}>
                    <View style={{ marginTop: 2 }}>
                      <IconPark
                        iconPark={Check({
                          theme: 'outline',
                          fill: ['#fff'],
                        })}
                        size={12}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text>自提</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: 2, right: 6 }}>
                  <TouchableOpacity
                    style={
                      !take_ways ? styles.choose_one : styles.choose_another
                    }
                    onPress={() => {
                      set_take_ways(false);
                      set_take_way_value(10);
                    }}>
                    <View style={{ marginTop: 2 }}>
                      <IconPark
                        iconPark={Check({
                          theme: 'outline',
                          fill: ['#fff'],
                        })}
                        size={12}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text>配送</Text>
              </View>
            </View>
          </View>
          <View style={styles.box_inner}>
            {isLocated ? (
              <>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  onPress={() => {
                    setShowMap(true);
                  }}>
                  {location}
                </Text>
              </>
            ) : (
              <>
                <Text>去线下任意门店即可核销</Text>
                <TouchableOpacity
                  style={styles.button_right}
                  onPress={() => {
                    setShowMap(true);
                  }}>
                  <Text>{originLocation}</Text>
                  <IconPark
                    iconPark={Right({
                      theme: 'outline',
                      fill: colors.font[200],
                    })}
                    size={20}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Dialog
            isShow={showMap}
            onBackPress={() => {
              setShowMap(false);
            }}>
            <MapView
              confirm={location => {
                setLocation(location);
                setIsLocated(true);
                setShowMap(false);
              }}
              cancel={() => {
                if (isLocated) {
                  setIsLocated(true);
                } else {
                  setLocation(originLocation);
                  setIsLocated(false);
                }
                setShowMap(false);
              }}></MapView>
          </Dialog>
          <View style={styles.box_inner}>
            <Text
              style={{
                color: colors.font[300],
                marginTop: 34,
                marginBottom: 34,
              }}>
              新建收货地址，让宝贝到家~
            </Text>
            <View style={{ marginTop: 33.5, marginBottom: 33.5 }}>
              {/* 添加按钮 */}
              <TouchableOpacity
                style={styles.button_right}
                onPress={() => {
                  navigation.navigate(ME_SETTING_ADDSHOPPINGADDRESS);
                }}>
                <Text>添加</Text>
                <IconPark
                  iconPark={Right({
                    theme: 'outline',
                    fill: colors.font[200],
                  })}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.box_inner, { paddingBottom: 0 }]}>
            {/* 商品 */}
            {/* <Text>商品</Text> */}
            <ScrollView>
              {data.map((item, index) => {
                return (
                  <View
                    style={{ flexDirection: 'row' }}
                    key={item.id}>
                    {item.isPicked ? (
                      <>
                        <View style={{ marginBottom: 10 }}>
                          <Image
                            source={{ uri: item.img }}
                            style={{
                              width: 80,
                              height: 80,
                              paddingLeft: 40,
                              borderRadius: 16,
                            }}
                          />
                        </View>
                        <View style={{ marginLeft: 5, flex: 1 }}>
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}>
                            {item.title}
                          </Text>
                          <View
                            style={{
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              marginTop: 4,
                            }}>
                            <Text
                              style={{
                                backgroundColor: colors.gray[200],
                                color: colors.font[200],
                                padding: 3,
                                borderRadius: 6,
                              }}>
                              {item.option}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginTop: 12,
                            }}>
                            <Text
                              style={{
                                color: colors.rose[400],
                              }}>
                              ¥ {item.price}
                            </Text>
                            <Text>{item.count}</Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View style={{ margin: 10, marginBottom: 0 }}>
            <View style={styles.box_inner_x}>
              <Text>订单总价</Text>
              <Text>¥ {price}</Text>
            </View>
            <View style={styles.box_inner_x}>
              <Text>外送费</Text>
              <Text>¥ {take_way_value}</Text>
            </View>
            <View
              style={{
                borderBottomColor: colors.gray[200],
                borderBottomWidth: 1,
              }}></View>
            <View style={styles.box_inner_x}>
              <Text>总计</Text>
              <Text>¥ {price + take_way_value}</Text>
            </View>
          </View>
          <View style={styles.box_inner}>
            <Text>支付方式</Text>
            <TouchableOpacity
              style={styles.button_right}
              onPress={() => {
                setPayment(true);
              }}>
              {payment_ways ? <Text>微信支付</Text> : <Text>支付宝</Text>}
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors.font[200],
                })}
                size={20}
              />
            </TouchableOpacity>
            <Dialog
              isShow={Payment}
              onBackPress={() => {
                setPayment(false);
              }}
              style={{ backgroundColor: colors.gray[100] }}
              position="bottom">
              <SafeAreaView
                style={{
                  height: ScreenHeight / 2,
                  width: ScreenWidth,
                }}>
                <View style={{ alignItems: 'center' }}>
                  <Text>选择支付方式</Text>
                  {/* <Text style={{ position: 'absolute', right: 10 }}></Text> */}
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 10 }}
                    onPress={() => {
                      setPayment(false);
                    }}>
                    <IconPark
                      iconPark={Close({
                        theme: 'filled',
                        fill: colors.font[200],
                      })}
                      size={16}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ margin: 10, marginBottom: 0 }}>
                  <View style={styles.box_inner_x}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('./Images/微信支付.png')}
                        style={{
                          width: 16.67,
                          height: 14.52,
                          marginTop: 2.12,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: colors.fontSize[300],
                          fontWeight: '400',
                          color: colors.font[300],
                          left: 10.67,
                        }}>
                        微信支付
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={
                        payment_ways ? styles.choose_one : styles.choose_another
                      }
                      onPress={() => {
                        set_payment_ways(true);
                      }}>
                      <View style={{ marginTop: 2 }}>
                        <IconPark
                          iconPark={Check({
                            theme: 'outline',
                            fill: ['#fff'],
                          })}
                          size={12}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.box_inner_x}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('./Images/支付宝.png')}
                        style={{ width: 16, height: 15.95, marginTop: 1.52 }}
                      />
                      <Text
                        style={{
                          fontSize: colors.fontSize[300],
                          fontWeight: '400',
                          color: colors.font[300],
                          left: 11,
                        }}>
                        支付宝
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={
                        !payment_ways
                          ? styles.choose_one
                          : styles.choose_another
                      }
                      onPress={() => {
                        set_payment_ways(false);
                      }}>
                      <View style={{ marginTop: 2 }}>
                        <IconPark
                          iconPark={Check({
                            theme: 'outline',
                            fill: ['#fff'],
                          })}
                          size={12}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    bottom: 0,
                    position: 'absolute',
                  }}>
                  <View style={{ backgroundColor: '#fff', width: ScreenWidth }}>
                    <TouchableOpacity
                      style={styles.enter}
                      onPress={() => {
                        setPayment(false);
                      }}>
                      <Text style={styles.button_text}>确认</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            </Dialog>
          </View>
        </View>
      </ScrollView>
      <View style={{ bottom: 0, position: 'absolute' }}>
        <View style={styles.bottom}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>总计:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={[
                  (styles.text, { color: colors.rose[400], marginTop: 6.5 }),
                ]}>
                ¥ {price + take_way_value}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              useToast('支付成功');
              navigation.navigate(MALL_SCREEN);
            }}>
            <Text style={styles.button_text}>立即支付</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: ScreenWidth,
    marginTop: 5,
  },
  box_inner: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    marginBottom: 0,
    padding: 10,
  },
  box_inner_x: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  bottom: {
    width: ScreenWidth,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button_right: {
    flexDirection: 'row',
  },
  button: {
    width: 150,
    backgroundColor: colors.rose[400],
    alignItems: 'center',
    borderRadius: 999,
  },
  button_text: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: '#ffffff',
    padding: 6.5,
  },
  text: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: colors.font[300],
    padding: 6.5,
  },
  enter: {
    width: ScreenWidth - 20,
    backgroundColor: colors.rose[400],
    alignItems: 'center',
    borderRadius: 999,
    margin: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  choose_one: {
    width: 16,
    height: 16,
    backgroundColor: colors.rose[400],
    alignItems: 'center',
    borderRadius: 999,
  },
  choose_another: {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: 999,
  },
  choose_one: {
    width: 16,
    height: 16,
    backgroundColor: colors.rose[400],
    alignItems: 'center',
    borderRadius: 999,
  },
});

export default defaultComponentHOC(MallShoppingCartPayment);
