/*
 * @Description: 首页页面
 * @Version:
 * @Autor: Ban
 * @Date: 2022-06-28 16:53:13
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:44:18
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import Input from '@/components/Input/index';
import { Avatar } from '@/plugins/elementUI';
import { useSelector, useDispatch } from 'react-redux';
import { setFamilyInfoState } from '@/store/modules/family';
import {
  HOME_SCREEN_ALBUM,
  HOME_SCREEN_GROUTH_CURVE,
  HOME_SCREEN_VACCINATION,
  HOME_SCREEN_GROWTH_DIARY,
  HOME_SCREEN_FAMILY,
  HOME_SCREEN_RECORD_BABY_EVENT,
  HOME_SCREEN_ADD_BABY,
} from '@/navigation/navigationNames';
import { defaultComponentHOC } from '@/utils/hoc';
import colors from '@/assets/color';
import {
  getFamilyInfo,
  getBabyInfo,
  changeBabyInfo,
} from '@/network/api/family';
import { useAsyncState, useToast } from '@/utils/hooks';
import HomeBabyDiaryList from './components/HomeBabyDiaryList/HomeBabyDiaryList';
import { setBabyInfoState } from '@/store/modules/baby';
import { Camera, WritingFluently } from '@icon-park/svg';
import IconPark from '@/components/IconPark';
import { selectFamilyInfo } from '@/store/modules/family';
import { selectBabyInfo } from '@/store/modules/baby';
import { calculateTime } from '@/utils/util';
import HomeClickOptions from './components/HomeClickOptions';
import { NavigationHelpers } from '@react-navigation/native';
import { useChooseLibrary } from '@/utils/photo';
import { uploadImg } from '@/network/api/util';

/**
 * @description: 首页
 * @return {*}
 * @author: Ban
 */

const Home = ({
  props,
  navigation,
}: {
  props: any;
  navigation: NavigationHelpers<any> & any;
}) => {
  const [dialog, setDialog] = useAsyncState(false); // 是否显示对话框
  const [progressStatus, setProgressStatus] = useAsyncState('unload'); // 进度条状态
  const familyInfo = useSelector(selectFamilyInfo); // 家庭信息
  const [isBackgroundImg, setIsBackgroundImg] = useAsyncState(false); // 是否有背景图片
  const babyInfo = useSelector(selectBabyInfo); // 宝宝信息
  const [optionsShow, setOptionsShow] = useAsyncState(false); // 点击背景显示组件
  const dispatch = useDispatch();

  const homeOptions = [
    {
      title: '相册',
      url: HOME_SCREEN_ALBUM,
    },
    {
      title: '生长曲线',
      url: HOME_SCREEN_GROUTH_CURVE,
    },
    {
      title: '疫苗接种',
      url: HOME_SCREEN_VACCINATION,
    },
    {
      title: '成长日记',
      url: HOME_SCREEN_GROWTH_DIARY,
    },
    {
      title: '家庭',
      url: HOME_SCREEN_FAMILY,
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      if (!navigation.isFocused())
        getFamilyInfo()
          .then(res => {
            dispatch(setFamilyInfoState({ ...res.data }));
          })
          .catch(e => {
            console.log(e);
          });
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    getFamilyInfo()
      .then(res => {
        dispatch(setFamilyInfoState({ ...res.data }));
      })
      .catch(e => {
        console.log(e);
      });
  });

  useEffect(() => {
    if (familyInfo?.babies && familyInfo.babies.length > 0) {
      // 获取宝宝信息
      getBabyInfo(familyInfo.babies[0])
        .then(res => {
          dispatch(setBabyInfoState({ ...res.data }));
          if (res.data.backgroundImg) setIsBackgroundImg(true);
          else setIsBackgroundImg(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [familyInfo, dispatch, setIsBackgroundImg]);

  /**
   * @description: 页面跳转
   * @param {string} path 跳转页面name
   * @return {*}
   * @author: Ban
   */
  const goToScreen = (path: string) => {
    navigation.navigate(path);
  };

  /**
   * 点击改变背景图片
   */
  const changeBackground = () => {
    useChooseLibrary((err, result) => {
      if (err) {
        setOptionsShow(false);
        useToast('出现了某些错误');
        console.log(err);
        return;
      }
      // @ts-ignore
      uploadImg(result[0])
        .then(res => {
          console.log(res);
          changeBabyInfo({ backgroundImg: res.data }, babyInfo.id)
            .then(data => {
              setOptionsShow(false);
              dispatch(setBabyInfoState({ backgroundImg: res.data }));
              useToast('修改成功');
            })
            .catch(err => {
              console.log(err);
              setOptionsShow(false);
              useToast('出现了某些错误');
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  /**
   * 点击添加宝宝
   */
  const addBaby = () => {
    setOptionsShow(false);
    navigation.navigate(HOME_SCREEN_ADD_BABY);
  };

  return (
    <View
      style={{
        backgroundColor: colors.gray[100],
      }}>
      <Pressable
        style={{
          height: 180,
        }}
        onPress={() => {
          console.log('click image', optionsShow);
          setOptionsShow(true);
        }}>
        <Image
          source={
            isBackgroundImg
              ? {
                  uri: babyInfo.backgroundImg,
                }
              : require('@/assets/imgs/bbj-logo.jpg')
          }
          style={{
            height: 180,
            width: '100%',
            backgroundColor: colors.gray[200],
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 58,
            width: '100%',
            height: 180 - 58,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              marginLeft: 35,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              size={64}
              rounded
              source={{
                uri: babyInfo?.avatar ? babyInfo.avatar : undefined,
              }}
            />
            <View
              style={{
                marginLeft: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: isBackgroundImg ? '#ffffff' : colors.font[300],
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {babyInfo.name}
                </Text>
                <Pressable
                  onPress={() => {
                    console.log('click editor');
                  }}>
                  <IconPark
                    style={{
                      marginLeft: 10,
                    }}
                    iconPark={WritingFluently({
                      theme: 'filled',
                      fill: isBackgroundImg ? '#ffffff' : colors.font[200],
                    })}
                    size={16}
                  />
                </Pressable>
              </View>
              <View>
                <Text
                  style={{
                    color: isBackgroundImg ? '#ffffff' : colors.font[200],
                  }}>
                  {calculateTime(babyInfo.birthday)}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={{
              flexDirection: 'row',
              paddingLeft: 37,
              paddingRight: 37,
              justifyContent: 'space-between',
              marginBottom: 5,
            }}>
            {homeOptions.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    goToScreen(item.url);
                  }}>
                  <Text
                    style={{
                      color: isBackgroundImg ? '#ffffff' : colors.font[200],
                    }}>
                    {item.title}
                  </Text>
                </Pressable>
              );
            })}
          </Pressable>
        </View>
      </Pressable>
      <HomeClickOptions
        show={optionsShow}
        onChangeBackground={changeBackground}
        onAddBaby={addBaby}
        onBackPress={() => {
          setOptionsShow(false);
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate(HOME_SCREEN_RECORD_BABY_EVENT);
        }}
        style={StyleSheet.flatten([
          styles.photo,
          {
            position: 'absolute',
            right: 20,
            top: 15,
          },
        ])}>
        <IconPark
          iconPark={Camera({
            theme: 'multi-color',
            fill: [
              'transparent',
              '#ffffff',
              'transparent',
              colors.auxiliary[100],
            ],
          })}
          size={18}
        />
      </Pressable>

      <View
        style={{
          height: 50,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 30,
          paddingRight: 30,
        }}>
        <Text
          style={{
            color: colors.font[200],
          }}>
          邀请家人一起记录宝宝成长吧~
        </Text>
        <Pressable
          onPress={() => {
            goToScreen(HOME_SCREEN_FAMILY);
          }}
          style={{
            borderRadius: 16,
            backgroundColor: colors.auxiliary[100],
          }}>
          <Text
            style={{
              color: '#ffffff',
              paddingRight: 12,
              paddingLeft: 12,
              paddingTop: 3,
              paddingBottom: 3,
            }}>
            邀请家人
          </Text>
        </Pressable>
      </View>
      <HomeBabyDiaryList bid={babyInfo.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    borderColor: '#000000',
    margin: 10,
  },
  photo: {
    height: 28,
    width: 28,
    backgroundColor: colors.auxiliary[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default defaultComponentHOC(Home, { scrollView: true });
