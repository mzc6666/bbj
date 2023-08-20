/*
 * @Description: 登录获取验证码
 * @Version:
 * @Autor:
 * @Date: 2023-03-18 21:19:28
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-26 18:25:43
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Button from '@/components/Button/index';
import { LOGIN_SCREEN_LOGIN_INPUTCODE } from '@/navigation/navigationNames';
import { getLoginCheckCode } from '@/network/api/login';
import Input from '@/components/Input/index';
import { isTelephoneStyle } from '../LogIn';
import { useRef } from 'react';
import { useToast } from '@/utils/hooks';
import colors from '@/assets/color';
/**
 * @description: 获取验证码函数组件
 * @param {*} navigation 导航对象
 * @param {*} route 路由对象
 * @return {*}
 * @autor: Xu
 */

const LoginGetCode = ({ navigation, route }) => {
  // 手机号码
  const [tel, setTel] = useState('');
  // ref对象
  const phoneRef = useRef();
  // 是否成功获取验证码
  const [verified, setVerified] = useState(false);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        phoneRef.current.blur();
      }}>
      <View>
        <View>
          <Text style={[styles.text, styles.marginVerticalBox]}>
            请输入您的手机号码
          </Text>
          <Input
            type="text"
            placeholder="请输入登录手机号码"
            keyboardType="numeric"
            style={[styles.marginVerticalBox, { width: '100%' }]}
            maxLength={11}
            value={[tel, setTel]}
            ref={phoneRef}
            onChangeText={setTel}
            onClear={() => {
              setTel('');
            }}
            verifyText={() => isTelephoneStyle(tel)}
          />
        </View>
        <View style={styles.btnView}>
          <Button
            title="获取验证码"
            onPress={() => {
              if (isTelephoneStyle(tel)) {
                getLoginCheckCode(tel).then(res => {
                  console.log(res);
                  if (res.code == '200') {
                    // console.log('获取验证码成功');
                    useToast('发送验证码成功，验证码五分钟内有效');
                    navigation.navigate(LOGIN_SCREEN_LOGIN_INPUTCODE, {
                      telephone: tel,
                    });
                  } else {
                    useToast('号码为空，请重新输入');
                  }
                });
              } else {
                useToast('格式错误，请重新输入');
                setTel('');
              }
            }}
            style={{ paddingHorizontal: 30, paddingVertical: 10 }}
            textStyle={{ fontSize: colors.fontSize[600], fontWeight: '500' }}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: '7.7%',
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontWeight: '400',
  },
  marginVerticalBox: {
    marginVertical: 10,
  },
  btnView: {
    marginVertical: 40,
  },
});

export default LoginGetCode;
