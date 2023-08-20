/*
 * @Description: 修改个人介绍
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-17 16:33:58
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-20 19:24:27
 */
import colors from '@/assets/color';
import Input from '@/components/Input';
import TitleHeader from '@/components/TitleHeader';
import { DEVICE_WIDTH } from '@/config/modules/global';
import { selectUserInfo } from '@/store/modules/user';
import { defaultComponentHOC } from '@/utils/hoc';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo } from '@/network/api/user';
import { setUserInfoState } from '@/store/modules/user';
import { ME_SETTING_PERSONALINFO } from '@/navigation/navigationNames';
import { useToast } from '@/utils/hooks';
import { NavigationHelpers, RouteProp } from '@react-navigation/native';

/**
 * @description: 修改昵称 screen
 * @param {object} navigation 导航器
 * @param {object} route 路由对象
 * @return {*}
 * @author: mzc
 */
const MeSettingPersonInfoChange = ({
  navigation,
  route,
}: {
  navigation: NavigationHelpers<any>;
  route: RouteProp<any>;
}) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const [val, setVal] = useState(userInfo.introduction || '');
  const inputRef: any = useRef(null); // inputRef

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Pressable
      onPress={() => {
        inputRef.current.blur();
      }}
      style={{
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <TitleHeader
        title="修改个人简介"
        headerLeftPress={() => {
          navigation.goBack();
        }}
        navigation={navigation}
        headerRight={(navigation: any) => (
          <Text
            style={styles.accomplish}
            onPress={() => {
              changeUserInfo({ introduction: val })
                .then(res => {
                  dispatch(setUserInfoState({ introduction: val }));
                  useToast('修改成功');
                  navigation.goBack();
                })
                .catch(err => {
                  console.log(
                    'MeSettingPersonInfoChangeIntroduce changeUserInfo err',
                    err,
                  );
                });
            }}>
            完成
          </Text>
        )}
      />

      <View style={styles.container}>
        <Input
          value={[val, setVal]}
          ref={inputRef}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  accomplish: {
    color: colors['font']['200'],
    fontSize: colors['fontSize']['400'],
    marginRight: 10,
  },
  container: {
    paddingHorizontal: (30 / 390) * DEVICE_WIDTH,
    paddingTop: (30 / 390) * DEVICE_WIDTH,
  },
});

export default defaultComponentHOC(MeSettingPersonInfoChange);
