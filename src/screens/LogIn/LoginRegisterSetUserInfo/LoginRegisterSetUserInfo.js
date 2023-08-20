/*
 * @Description: 完善用户信息
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-07 20:40:02
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-01 16:38:17
 */
import React, { useState } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import Button from '@/components/Button/index';
import { LOGIN_SCREEN } from '@/navigation/navigationNames';
import Input from '@/components/Input';
import { isPasswordStyle, isUsernameStyle } from '../LogIn';
import { useRef } from 'react';
import { userRegisterSetUserInfo } from '@/network/api/login';

/**
 * @description: 用户信息完善函数组件
 * @param {*} navigation 导航对象
 * @param {*} route 路由对象
 * @return {*}
 * @autor: mzc
 */

const SetUserInfo = ({ navigation, route }) => {
  const { telephone } = route.params;
  // 昵称
  const [name, setName] = useState('');
  // 两个密码
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  // ref对象
  const nameRef = useRef();
  const pass1Ref = useRef();
  const pass2Ref = useRef();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        nameRef.current.blur();
        pass1Ref.current.blur();
        pass2Ref.current.blur();
      }}>
      <View>
        <View>
          <Text style={styles.itemText}>设置昵称</Text>
          <Input
            type="text"
            value={[name, setName]}
            placeholder="请输入您的昵称"
            style={styles.itemInput}
            // width="100%"
            style={{ width: '100%' }}
            ref={nameRef}
            onChangeText={setName}
            onClear={() => {
              setName('');
            }}
            verifyText={() => isUsernameStyle(name)}
          />
        </View>
        <View>
          <Text style={styles.itemText}>输入您的登录密码</Text>
          <Input
            type="password"
            value={[pass1, setPass1]}
            placeholder="请输入您的登录密码"
            style={styles.itemInput}
            // width="100%"
            style={{ width: '100%' }}
            ref={pass1Ref}
            onChangeText={setPass1}
            onClear={() => {
              setPass1('');
            }}
            verifyText={() => isPasswordStyle(pass1)}
          />
        </View>
        <View>
          <Text style={styles.itemText}>请确认您的登录密码</Text>
          <Input
            type="password"
            value={[pass2, setPass2]}
            placeholder="请确认您的密码"
            style={styles.itemInput}
            // width="100%"
            style={{ width: '100%' }}
            ref={pass2Ref}
            onChangeText={setPass2}
            onClear={() => {
              setPass2('');
            }}
            verifyText={() => pass1 === pass2 && isPasswordStyle(pass2)}
          />
        </View>
        <View>
          <Button
            title="完成"
            style={styles.btnView}
            textStyle={{ fontSize: 24, fontWeight: '500' }}
            onPress={() => {
              if (
                isUsernameStyle(name) &&
                pass1 === pass2 &&
                isPasswordStyle(pass1)
              ) {
                userRegisterSetUserInfo(name, pass1, telephone)
                  .then(() => {
                    navigation.navigate(LOGIN_SCREEN);
                  })
                  .catch(err => {
                    console.log('userRegisterSetUserInfo error');
                  })
                  .finally(() => {});
              } else {
                ToastAndroid.showWithGravity(
                  '信息错误，请进行核对',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                );
              }
            }}
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: '7.7%',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 10,
  },
  itemInput: {
    marginVertical: 10,
  },
  btnView: {
    marginVertical: 40,
    height: 60,
  },
});
export default SetUserInfo;
