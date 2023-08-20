/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-18 19:50:10
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 20:59:21
 */
import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import {
  ME_ORDERSMANAGE,
  ME_ORDERSMANAGEALL,
  ME_ORDERSMANAGEUNPAID,
  ME_ORDERSMANAGEUNPICKGOODS,
  ME_ORDERSMANAGEUNRECEIVE,
  ME_SETTING_SCREEN,
  ME_ARTICLESMANAGE,
  ME_LIKEMANAGE,
  ME_LIKEFANS,
  ME_LIKEMY_ATTENTION,
  ME_SCREEN_VIP,
} from '@/navigation/navigationNames';
import { defaultComponentHOC } from '@/utils/hoc';
import { Avatar } from '@/plugins/elementUI';
import IconPark from '@/components/IconPark';
import {
  Right,
  VipOne,
  VolumeNotice,
  Transporter,
  Bill,
  BankCard,
  Commodity,
} from '@icon-park/svg';
import colors from '@/assets/color';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, setUserInfoState } from '@/store/modules/user';
import { useEffect } from 'react';
import { getPersonalInfo } from '@/network/api/user';
import { NavigationHelpers } from '@react-navigation/native';

const Me = ({ navigation }: { navigation: NavigationHelpers<any> & any }) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (!navigation.isFocused()) {
        getPersonalInfo()
          .then(res => {
            console.log(res.data);
            dispatch(setUserInfoState({ ...res.data }));
          })
          .catch(err => {
            console.log('Me getPersonalInfo err\n', err);
          });
      }
    });
    return unsubscribe;
  });

  return (
    <View style={{ height: DEVICE_HEIGHT, backgroundColor: colors.gray[100] }}>
      {/* 背景图片 */}
      <ImageBackground
        source={require('@/assets/imgs/bg.png')}
        style={styles.bg}>
        {/* 头像 + 设置中心 */}
        <View style={[styles.horizonBox, styles.infoContainer]}>
          <View style={[styles.horizonBox]}>
            <Avatar
              source={{
                uri: userInfo.headPor,
              }}
              rounded
              size={64}
            />
            <View style={{ marginLeft: 20, justifyContent: 'space-evenly' }}>
              <Text style={[styles.bigText, { color: colors['font']['300'] }]}>
                {userInfo.name}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {
                    color: colors['font']['200'],
                  },
                ]}>
                {userInfo.introduction}
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.horizonBox, { alignItems: 'center' }]}
            onPress={() => {
              navigation.navigate(ME_SETTING_SCREEN);
            }}>
            <Text style={[styles.middleText, { color: colors['font']['200'] }]}>
              设置中心
            </Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
        </View>
        {/* 粉丝 + 关注 + 投稿 */}
        <View style={[styles.horizonBox, styles.personContainer]}>
          <Pressable
            style={styles.personContent}
            onPress={() => {
              navigation.navigate(ME_LIKEMANAGE, {
                initialRouteName: ME_LIKEFANS,
              });
            }}>
            <Text
              style={[
                styles.bigestText,
                { color: colors['font']['300'], paddingBottom: 9 },
              ]}>
              {userInfo.fansCount}
            </Text>
            <Text>喜欢我的</Text>
          </Pressable>
          <Pressable
            style={styles.personContent}
            onPress={() => {
              navigation.navigate(ME_LIKEMANAGE, {
                initialRouteName: ME_LIKEMY_ATTENTION,
              });
            }}>
            <Text
              style={[
                styles.bigestText,
                { color: colors['font']['300'], paddingBottom: 9 },
              ]}>
              {userInfo.attentionCount}
            </Text>
            <Text style={[styles.middleText]}>我喜欢的</Text>
          </Pressable>
          <Pressable
            style={styles.personContent}
            onPress={() => {
              navigation.navigate(ME_ARTICLESMANAGE);
            }}>
            <Text
              style={[
                styles.bigestText,
                { color: colors['font']['300'], paddingBottom: 9 },
              ]}>
              1
            </Text>
            <Text>文章管理</Text>
          </Pressable>
        </View>
      </ImageBackground>
      {/* VIP会员折扣 */}
      <View style={styles.vipContainer}>
        <Pressable style={styles.vipContent}>
          <View style={[styles.horizonBox, { alignItems: 'center' }]}>
            <IconPark
              iconPark={VolumeNotice({
                theme: 'filled',
                fill: colors['rose']['400'],
              })}
              size={colors['fontSize']['400']}
            />
            <Text
              style={[styles.roseText, styles.tinyText, { marginLeft: 10 }]}>
              专属会员折扣
            </Text>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate(ME_SCREEN_VIP);
            }}
            style={[
              {
                backgroundColor: colors['auxiliary']['100'],
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 16,
              },
              styles.horizonBox,
            ]}>
            <IconPark
              iconPark={VipOne({
                theme: 'filled',
                fill: '#FFF',
              })}
              size={colors['fontSize']['400']}
            />
            <Text style={[styles.middleText, styles.whiteText]}>会员权益</Text>
          </Pressable>
        </Pressable>
      </View>
      {/* 推荐有奖 */}
      <View style={styles.recommendContainer}>
        <Pressable style={styles.recommendContent}>
          <View>
            <View style={[styles.horizonBox, { alignItems: 'center' }]}>
              <Text
                style={[
                  styles.whiteText,
                  styles.bigText,
                  { fontWeight: 'bold' },
                ]}>
                推荐有奖
              </Text>
              <View
                style={{
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  padding: 2,
                  marginLeft: 5,
                  alignItems: 'center',
                }}>
                <IconPark
                  iconPark={Right({
                    theme: 'outline',
                    fill: colors['auxiliary']['300'],
                  })}
                  size={colors['fontSize']['500']}
                />
              </View>
            </View>
            <Text
              style={[
                styles.whiteText,
                {
                  paddingTop: 6,
                },
              ]}>
              推荐好友加入我们领取惊喜大礼包~
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.whiteText,
                styles.smallText,
                {
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 4,
                },
              ]}>
              推荐有奖
            </Text>
          </View>
          {/* 圆圈1 */}
          <View
            style={[
              styles.circle,
              {
                left: (104 / 390) * DEVICE_WIDTH,
                top: -32,
              },
            ]}></View>
          {/* 圆圈2 */}
          <View
            style={[
              styles.circle,
              {
                right: -9,
                bottom: -19,
              },
            ]}></View>
        </Pressable>
      </View>
      {/* 我的订单 */}
      <View style={styles.orderContainer}>
        <Pressable
          style={styles.orderContent}
          onPress={() => {
            navigation.navigate(ME_ORDERSMANAGE);
          }}>
          <Text
            style={[
              styles.orderText,
              {
                paddingBottom: 16,
              },
            ]}>
            我的订单
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              onPress={() => {
                navigation.navigate(ME_ORDERSMANAGE, {
                  screen: ME_ORDERSMANAGEALL,
                });
              }}
              style={styles.orderItem}>
              <IconPark
                iconPark={Bill({
                  theme: 'outline',
                  fill: colors.font['300'],
                })}
                size={24}
                style={[styles.icon, styles.orderIcon]}
              />
              <Text style={styles.orderText}>全部</Text>
            </Pressable>
            <Pressable
              style={styles.orderItem}
              onPress={() => {
                navigation.navigate(ME_ORDERSMANAGE, {
                  screen: ME_ORDERSMANAGEUNPAID,
                });
              }}>
              <IconPark
                iconPark={BankCard({
                  theme: 'outline',
                  fill: colors.font['300'],
                })}
                size={24}
                style={[styles.icon, styles.orderIcon]}
              />
              <Text style={styles.orderText}>待支付</Text>
            </Pressable>
            <Pressable
              style={styles.orderItem}
              onPress={() => {
                navigation.navigate(ME_ORDERSMANAGE, {
                  screen: ME_ORDERSMANAGEUNPICKGOODS,
                });
              }}>
              <IconPark
                iconPark={Commodity({
                  theme: 'outline',
                  fill: colors.font['300'],
                })}
                size={24}
                style={[styles.icon, styles.orderIcon]}
              />
              <Text style={styles.orderText}>待取货</Text>
            </Pressable>
            <Pressable
              style={styles.orderItem}
              onPress={() => {
                navigation.navigate(ME_ORDERSMANAGE, {
                  screen: ME_ORDERSMANAGEUNRECEIVE,
                });
              }}>
              <IconPark
                iconPark={Transporter({
                  theme: 'outline',
                  fill: colors.font['300'],
                })}
                size={24}
                style={[styles.icon, styles.orderIcon]}
              />
              <Text style={styles.orderText}>待收货</Text>
            </Pressable>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  icon: {
    fontFamily: 'iconfont',
  },
  tinyText: {
    fontSize: 10,
  },
  smallText: {
    fontSize: 12,
  },
  middleText: {
    fontSize: 14,
  },
  bigText: {
    fontSize: 16,
  },
  bigestText: {
    fontSize: 18,
  },
  horizonBox: {
    flexDirection: 'row',
  },
  roseText: {
    color: colors['rose']['400'],
  },
  whiteText: {
    color: '#fff',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: ((45 + DEVICE_STATUS_BAR_HEIGHT) / 844) * DEVICE_HEIGHT,
    paddingHorizontal: (30 / 390) * DEVICE_WIDTH,
  },
  personContainer: {
    paddingTop: (20 / 844) * DEVICE_HEIGHT,
  },
  personContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 9,
  },
  vipContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  vipContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: colors.gray[0],
    borderRadius: 8,
  },
  recommendContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: colors['auxiliary']['300'],
    borderRadius: 8,
    overflow: 'hidden',
  },
  recommendContent: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 5,
  },
  orderContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 20,
    backgroundColor: colors.gray[0],
    borderRadius: 8,
    paddingVertical: 10,
  },
  orderContent: {
    paddingHorizontal: (15 / 390) * DEVICE_WIDTH,
    paddingVertical: 10,
  },
  orderItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderIcon: {
    fontSize: 24,
    paddingBottom: 5,
  },
  orderText: {
    color: colors['font']['300'],
    fontSize: 14,
  },
});
export default defaultComponentHOC(Me, {
  fillStatusBar: false,
});
