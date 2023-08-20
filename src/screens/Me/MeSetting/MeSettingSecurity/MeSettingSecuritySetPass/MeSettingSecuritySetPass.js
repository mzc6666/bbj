/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-17 13:54:33
 * @LastEditors: Xu
 * @LastEditTime: 2023-04-14 23:54:14
 */

import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Pressable, View, Text, TextInput } from 'react-native';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import { useToast } from '@/utils/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, setUserInfoState } from '@/store/modules/user';
import Input from '@/components/Input';
import { DEVICE_WIDTH } from '@/config/modules/global';
import colors from '@/assets/color';
import { changeUserInfo } from '@/network/api/user';

const MeSettingSecuritySetPass = ({ navigation, route }) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const [val, setVal] = useState(userInfo.password);

  return (
    <View>
      <TitleHeader
        title="修改密码"
        navigation={navigation}
        headerRight={navigation => (
          <Text
            onPress={() => {
              changeUserInfo({ password: val })
                .then(res => {
                  dispatch(setUserInfoState({ password: val }));
                  useToast('修改成功');
                  navigation.goBack();
                })
                .catch(err => {
                  useToast('修改失败，请稍后重试');
                  console.log(err);
                });
            }}
            style={{
              marginRight: 20,
            }}>
            完成
          </Text>
        )}
        headerLeftPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contianer}>
        <TextInput
          style={{
            height: 40,
            borderColor: colors.gray[100],
            borderWidth: 1,
            borderRadius: 16,
            backgroundColor: '#ffffff',
          }}
          value={val}
          onChange={password => setVal(password)}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: (30 / 390) * DEVICE_WIDTH,
    paddingTop: (30 / 390) * DEVICE_WIDTH,
  },
});

export default defaultComponentHOC(MeSettingSecuritySetPass);
