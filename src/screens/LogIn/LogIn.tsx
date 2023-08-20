/*
 * @Description: 登录界面组件
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-02 18:59:12
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 16:07:18
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '@/components/Input/index';
import Button from '@/components/Button';
import { Avatar } from '@/plugins/elementUI';
import {
  LOGIN_SCREEN_RESET_GETCODE,
  LOGIN_SCREEN_REGISTER_GETCODE,
  LOGIN_SCREEN_LOGIN_GETCODE,
} from '@/navigation/navigationNames';
import { userLogin } from '@/network/api/login';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '@/store/modules/login';
import { getPersonalInfo } from '@/network/api/user';
import { setUserInfoState, setUserToken } from '@/store/modules/user';
import colors from '@/assets/color';
import { useAsyncState } from '@/utils/hooks';
import { NavigationHelpers } from '@react-navigation/native';
import { defaultComponentHOC } from '@/utils/hoc';
import { useWindowDimensions } from 'react-native';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '@/config/modules/global';
/**
 * @description: 登录页面组件
 * @param {*} navigation 导航对象
 * @param {*} route  路由对象
 * @return {*}
 * @autor: mzc
 */

const LogIn = ({ navigation }: { navigation: NavigationHelpers<any> }) => {
  const logo = {
    uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
  };

  const phoneRef = useRef<any>(null); // phone 的tRef
  const passwordRef = useRef<any>(null); // password的 tRef

  const [username, setUsername] = useAsyncState('');
  const [password, setPassword] = useAsyncState('');

  // store
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{
        height: DEVICE_HEIGHT,
      }}>
      <Pressable
        style={{
          flex: 1,
        }}
        onPress={event => {
          phoneRef.current.blur();
          passwordRef.current.blur();
        }}>
        <View style={styles.box}>
          <View
            style={{
              paddingVertical: (62 / 844) * DEVICE_HEIGHT,
              alignItems: 'center',
            }}>
            <Avatar
              rounded
              size={100}
              source={require('@/assets/imgs/bbj.jpg')}
            />
            <Text
              style={[
                {
                  fontSize: colors['fontSize']['600'],
                  color: '#000',
                  marginTop: (20 / 844) * DEVICE_HEIGHT,
                },
                styles.text,
              ]}>
              贝贝佳，欢迎您
            </Text>
          </View>
        </View>
        <View
          style={[
            {
              paddingHorizontal: (30 / 390) * DEVICE_WIDTH,
            },
          ]}>
          <Input
            type="text"
            maxLength={11}
            placeholder="请输入登录手机号"
            style={StyleSheet.flatten([{ width: '100%' }, styles.inputBoxItem])}
            keyboardType="numeric"
            value={[username, setUsername]}
            ref={phoneRef}
            verifyText={() => isTelephoneStyle(username)}
          />
          <Input
            type="password"
            placeholder="请输入密码"
            maxLength={18}
            style={[{ width: '100%' }, styles.inputBoxItem]}
            value={[password, setPassword]}
            ref={passwordRef}
            verifyText={() => isPasswordStyle(password)}
          />
          <Button
            title="登录"
            onPress={() => {
              //  && isPasswordStyle(password)
              if (isTelephoneStyle(username)) {
                userLogin(username, password)
                  .then(res => {
                    console.log(res.data);
                    dispatch(setUserToken(res.data)); // 存入token

                    getPersonalInfo() // 获取用户信息
                      .then((res: any) => {
                        // console.log(res.data);

                        dispatch(setUserInfoState(res.data)); // 存入个人信息,个人信息通过token获得（待改）
                        dispatch(signin());
                      })
                      .catch((err: any) => {
                        console.log('getPersonalInfo error', err);
                      });
                  })
                  .catch(err => {
                    console.log('catch userLogin ' + err);
                  });
              } else {
                ToastAndroid.showWithGravity(
                  '账号密码错误，请重新输入',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              }
            }}
            style={[
              styles.inputBoxItem,
              {
                height: 60,
              },
            ]}
            textStyle={{
              fontSize: 24,
              fontWeight: '500',
            }}
          />
        </View>
        <View style={styles.horizonBox}>
          <Text
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN_RESET_GETCODE);
            }}
            style={styles.optionText}>
            忘记密码
          </Text>
          <Text
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN_LOGIN_GETCODE);
            }}
            style={styles.optionText}>
            验证码登录
          </Text>
          <Text
            onPress={() => {
              navigation.navigate(LOGIN_SCREEN_REGISTER_GETCODE);
            }}
            style={styles.optionText}>
            用户注册
          </Text>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  box: {
    alignItems: 'center',
  },
  inputBoxItem: {
    marginVertical: 30,
  },
  introduce: {
    alignItems: 'center',
  },
  horizonBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'red',
  },
  optionText: {
    color: colors['font']['200'],
  },
});

/**
 * @description:     验证手机号码格式是否正确
 * @param {string}   telephone 手机号码
 * @return {boolean} 是否符合手机号码格式
 * @autor: mzc
 */

export const isTelephoneStyle = (telephone: string) => {
  const len = 11;
  const telRegexp = /^1(([3,5,8,6]\d{9})|(4[5,7]\d{8})|(7[0,6-8]\d{8}))$/;
  return telephone.length === len && telRegexp.test(telephone);
};

/**
 * @description:     验证密码格式是否正确
 * @param {string}   password 手机号码
 * @return {boolean} 是否符合要求
 * @autor: mzc
 */

export const isPasswordStyle = (password: string) => {
  const regexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
  return regexp.test(password);
};

/**
 * @description:      判断六位验证码是否符合格式
 * @param {Array}    code 验证码数组
 * @return {boolean}  是否符合规则
 * @autor: mzc
 */

export const isVerificationCode = (code: any) => {
  const regexp = /^\d{6}$/;
  return regexp.test(code.join(''));
};

/**
 * @description: 是否符合用户名的格式要求
 * @param {string} username 用户名
 * @return {boolean} 是否符合
 * @autor: mzc
 */

export const isUsernameStyle = (username: string) => {
  const maxLen = 10;
  const minLen = 4;
  return username.length >= minLen && username.length <= maxLen;
};

export default defaultComponentHOC(LogIn);
