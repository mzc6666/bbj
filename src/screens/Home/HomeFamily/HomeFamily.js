/*
 * @Description:首页-家庭
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-07-17 14:22:21
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 20:16:11
 */
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  Animated,
  View,
  ToastAndroid,
} from 'react-native';
import TitleHeader from '@/components/TitleHeader';
import colors from '@/assets/color';
import { HOME_SCREEN_INVITE } from '@/navigation/navigationNames';
import { useNavigationAnimate, useAsyncState } from '@/utils/hooks';
import { defaultComponentHOC } from '@/utils/hoc';
import HomeFamilyInvite from './HomeFamilyInvite/HomeFamilyInvite';
import family, {
  selectFamilyInfo,
  setFamilyInfoState,
} from '@/store/modules/family';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from '@/plugins/elementUI';
import { dateToString } from '@/utils/util';
import {
  DEVICE_HEADER_BAR_HEIGHT,
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
} from '@/config/modules/global';
import { getFamilyInfo } from '@/network/api/family';

const HomeFamily = ({ props, navigation }) => {
  const [isHomeFamilyInvite, setIsHomeFamilyInvite] = useState(false); // 跳转邀请页面
  const familyInfo = useSelector(selectFamilyInfo);
  const [flatListLoading, setFaltListLoading] = useState(false); // 刷新状态
  const dispatch = useDispatch();

  console.log(familyInfo);

  /**
   * @description: 刷新重新请求数据
   * @return {*}
   * @author: Ban
   */
  const refresh = () => {
    setFaltListLoading(true);
    getFamilyInfo()
      .then(res => {
        setFaltListLoading(false);
        dispatch(setFamilyInfoState({ ...res.data }));
      })
      .catch(e => {
        ToastAndroid.showWithGravity(
          '加载失败',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        setFaltListLoading(false);
        console.log(e);
      });
  };

  if (isHomeFamilyInvite) {
    return (
      <HomeFamilyInvite
        close={() => {
          setIsHomeFamilyInvite(false);
        }}
      />
    );
  }
  return (
    <View>
      <TitleHeader
        title="家庭"
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => (
          <Text
            style={styles.headerRight}
            onPress={() => {
              setIsHomeFamilyInvite(true);
            }}>
            邀请
          </Text>
        )}></TitleHeader>
      <FlatList
        style={{
          height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
        }}
        onRefresh={refresh}
        refreshing={flatListLoading}
        data={familyInfo.members}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                marginTop: 20,
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    paddingTop: 24,
                    paddingBottom: 24,
                    paddingLeft: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Avatar
                      source={{
                        uri: item.user.avatar,
                      }}
                      size={64}
                      rounded
                    />
                  </View>
                  <View style={{ marginLeft: 20 }}>
                    <View>
                      <Text
                        style={{
                          color: colors.font[300],
                          fontWeight: 'bold',
                          fontSize: colors.fontSize[400],
                        }}>
                        {item.identity.name}
                      </Text>
                      {/* {item.item.user.id == } */}
                    </View>
                    {/* <View
                      style={{
                        marginTop: 11,
                      }}>
                      <Text
                        style={{
                          color: colors.font[200],
                        }}>
                        添加时间：{' '}
                        {dateToString(item.time, 'YYYY-MM-DD hh:mm:ss')}
                      </Text>
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.identity.id}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 20,
    fontSize: colors.fontSize[300],
  },
});

// export default HomeFamily;
export default defaultComponentHOC(HomeFamily);
