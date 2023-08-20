/*
 * @Description: 获取验证码
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-07 19:17:28
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-04 23:35:48
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ToastAndroid } from 'react-native';
import Button from '@/components/Button/index';
import { LOGIN_SCREEN_RESET_INPUTCODE } from '@/navigation/navigationNames';
import Input from '@/components/Input/index';
import { isTelephoneStyle } from '../LogIn';
import { userForgetGetVerificationCode } from '@/network/api/login';
import { useRef } from 'react';
/**
 * @description: 获取验证码函数组件
 * @param {*} navigation 导航对象
 * @param {*} route  路由对象
 * @return {*}
 * @autor: mzc
 */

const LogInForgetGetCode = ({ navigation, route }) => {
  const [tel, setTel] = useState(''); // 手机号码
  const phoneRef = useRef(); // ref对象

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
            style={styles.marginVerticalBox}
            style={{ width: '100%' }}
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
                /* 以下注释代码不要删，以后要用 */
                userForgetGetVerificationCode(tel)
                  .then(() => {
                    navigation.navigate(LOGIN_SCREEN_RESET_INPUTCODE, {
                      telephone: tel,
                    });
                  })
                  .catch(err => {
                    console.log('err : ' + err);
                  })
                  .finally(() => {});
              } else {
                ToastAndroid.showWithGravity(
                  '手机号码格式错误,请重新输入',
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
                );
              }
            }}
            style={{ height: 60 }}
            textStyle={{ fontSize: 24, fontWeight: '500' }}
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
    paddingVertical: 40,
  },
});
export default LogInForgetGetCode;
