/*
 * @description:
 * @Version:
 * @Autor: Xu
 * @Date: 2022-08-17 23:49:44
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-09 15:32:51
 */
import colors from '@/assets/color';
import Dialog from '@/components/Dialog/Dialog';
import IconPark from '@/components/IconPark';
import TitleHeader from '@/components/TitleHeader';
import { HOME_SCREEN_VACCINATION } from '@/navigation/navigationNames';
import {
  vaccinationDetails,
  postVaccination,
  deleteVaccination,
} from '@/network/api/family';
import { defaultComponentHOC } from '@/utils/hoc';
import { Right } from '@icon-park/svg';
import { NavigationHelpers } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import DatePicker from './components/DatePicker';

const VaccinationDetails = ({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any>;
  route: any;
}) => {
  const { name, status, id } = route.params;
  const [isFirstPage, setIsFirstPage] = useState(true); //页面切换
  const [isDelDialog, setIsDelDialog] = useState(false); // “删除弹窗”是否显示
  const [isPitchOn, setIsPitchOn] = useState(status); // “接种状态”是否接种
  const [isDateDialog, setIsDateDialog] = useState(false); // “日期弹窗”是否显示
  const [isGetTime, setIsGetTime] = useState(false);
  const [time, setTime] = useState();

  /**
   * @description: sign
   * @return {*}
   * @author:   Xu
   */

  const choose = () => {
    if (!isPitchOn) {
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          '未接种状态下无法选择接种日期',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
      }
    } else {
      setIsDateDialog(!isDateDialog);
      console.log('状态' + '由' + !isDateDialog + '到' + isDateDialog);
    }
  };
  return (
    <>
      {/* 标题栏 */}
      <>
        {isFirstPage ? (
          <TitleHeader
            title={name}
            navigation={navigation}
            headerLeftPress={() => {
              navigation.goBack();
            }}
            headerRight={() => (
              <Text
                style={{ paddingRight: (2 / 100) * ScreenWidth }}
                onPress={() => {
                  setIsFirstPage(!isFirstPage);
                  if (Platform.OS == 'android') {
                    ToastAndroid.showWithGravity(
                      '已进入编辑状态',
                      ToastAndroid.BOTTOM,
                      ToastAndroid.LONG,
                    );
                  }
                }}>
                编辑
              </Text>
            )}
          />
        ) : (
          <TitleHeader
            title={name}
            navigation={navigation}
            headerLeftPress={() => {
              setIsFirstPage(!isFirstPage);
            }}
            headerRight={() => (
              <Text
                style={{ paddingRight: (2 / 100) * ScreenWidth }}
                onPress={() => {
                  setIsDelDialog(!isDelDialog);
                  deleteVaccination(id);
                }}>
                删除
              </Text>
            )}
          />
        )}
      </>
      {/* “删除”弹窗 */}
      <Dialog
        isShow={isDelDialog}
        style={styles.dialogStyle}>
        <View>
          <View
            style={{
              borderBottomColor: colors.gray[200],
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                fontSize: colors.fontSize[300],
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 1)',
                textAlign: 'center',
                padding: 12,
              }}>
              确定删除？
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity>
              <View style={{ width: (1 / 2) * 201 }}>
                <Text
                  style={[
                    styles.dialogBottomTextStyle,
                    { color: colors.auxiliary[100] },
                  ]}
                  onPress={() => {
                    setIsDelDialog(!isDelDialog);
                  }}>
                  取消
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={{ width: (1 / 2) * 201 }}>
                <Text
                  style={styles.dialogBottomTextStyle}
                  onPress={() => {
                    navigation.navigate(HOME_SCREEN_VACCINATION);
                  }}>
                  确定
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>
      {/* 接种状态和接种日期 */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.inoculateStyle}>
          <Text style={styles.inoculateTextStyle}>接种状态</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: (2.5 / 100) * ScreenHeight,
              paddingRight: (2 / 100) * ScreenWidth,
            }}>
            <View style={{ flexDirection: 'row', right: 12 }}>
              <TouchableOpacity
                style={
                  isPitchOn
                    ? [
                        styles.touchableStyle,
                        { backgroundColor: colors.auxiliary[100] },
                      ]
                    : [
                        styles.touchableStyle,
                        { backgroundColor: colors.gray[100] },
                      ]
                }
                onPress={() => {
                  if (!isFirstPage) {
                    setIsPitchOn(!isPitchOn);
                  }
                }}>
                {/* <Text style={styles.iconStyle}>{'\ue687'}</Text> */}
              </TouchableOpacity>
              <Text style={{ color: 'rgba(0, 0, 0, 1)' }}>已接种</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={
                  isPitchOn
                    ? [
                        styles.touchableStyle,
                        { backgroundColor: colors.gray[100] },
                      ]
                    : [
                        styles.touchableStyle,
                        { backgroundColor: colors.auxiliary[100] },
                      ]
                }
                onPress={() => {
                  if (!isFirstPage) {
                    setIsPitchOn(!isPitchOn);
                  }
                }}>
                {/* <Text style={styles.iconStyle}>{'\ue687'}</Text> */}
              </TouchableOpacity>
              <Text style={{ color: 'rgba(0, 0, 0, 1)' }}>未接种</Text>
            </View>
          </View>
        </View>
        <View style={styles.inoculateStyle}>
          <Text style={styles.inoculateTextStyle}>接种日期</Text>
          {isFirstPage ? (
            <>
              {isPitchOn ? (
                <Text
                  style={{
                    paddingTop: (2.5 / 100) * ScreenHeight,
                    paddingRight: (2 / 100) * ScreenWidth,
                  }}>
                  已获取到时间
                </Text>
              ) : (
                <Text
                  style={{
                    paddingTop: (2.5 / 100) * ScreenHeight,
                    paddingRight: (2 / 100) * ScreenWidth,
                  }}>
                  未获取到时间
                </Text>
              )}
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  paddingTop: (2.5 / 100) * ScreenHeight,
                  paddingRight: (2 / 100) * ScreenWidth,
                }}
                onPress={() => {
                  choose();
                }}>
                {isGetTime ? (
                  <View>
                    <Text>{time}</Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <Text>请选择</Text>
                    <IconPark
                      iconPark={Right({
                        theme: 'outline',
                        fill: colors.font[200],
                      })}
                      size={20}
                    />
                  </View>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      {/* 日期选择器 */}
      <DatePicker
        isShow={isDateDialog}
        onBackPress={() => {
          console.log('back press');

          setIsDateDialog(false);
        }}
        onConfirmPress={itemTime => {
          setTime(itemTime);
          console.log('获取时间' + itemTime);
          setIsGetTime(true);
          setIsDateDialog(false);
        }}></DatePicker>
      {/* 疫苗介绍 */}
      <View style={{ marginTop: 10, backgroundColor: '#ffffff' }}>
        <Text style={styles.inoculateTextStyle}>疫苗介绍</Text>
        <Text style={styles.introduceDetailsTextStyle}>{id}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inoculateStyle: {
    height: (8 / 100) * ScreenHeight,
    width: ScreenWidth,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.gray[200],
    borderTopWidth: 1,
  },
  inoculateTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: '#000000',
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: (2 / 100) * ScreenHeight,
  },
  touchableStyle: {
    height: 16,
    width: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderStyle: 'solid',
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: colors.fontSize[300],
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dialogStyle: {
    height: 98,
    width: 201,
    borderRadius: 16,
  },
  dialogBottomTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    paddingTop: 9,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  introduceDetailsTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: '#000000',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingLeft: (3.5 / 100) * ScreenWidth,
    paddingRight: (3.5 / 100) * ScreenWidth,
    paddingBottom: (2 / 100) * ScreenHeight,
  },
});

export default defaultComponentHOC(VaccinationDetails);
