/*
 * @Description: 重置密码
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-07 19:18:25
 * @LastEditors: mzc
 * @LastEditTime: 2022-08-01 15:34:38
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Button from '@/components/Button/index';
import { LOGIN_SCREEN } from '@/navigation/navigationNames';
import Input from '@/components/Input';
import { isPasswordStyle } from '../LogIn';
import { userForgetSetInfo } from '@/network/api/login';
import { useRef } from 'react';
/**
 * @description: 重置密码函数组件
 * @param {*} navigation 导航对象
 * @param {*} route 路由对象
 * @return {*}
 * @author: code_mzc
 */

const SetNewPassword = ({ navigation, route }) => {
  const { telephone } = route.params;
  // 两个密码
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  // 两个ref对象
  const ref1 = useRef();
  const ref2 = useRef();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        ref1.current.blur();
        ref2.current.blur();
      }}>
      <View>
        <View>
          <Text style={styles.itemText}>请设置您的密码</Text>
          <Input
            type="password"
            value={[pass1, setPass1]}
            placeholder="请输入密码"
            style={styles.itemInput}
            // width="100%"
            style={{ width: '100%' }}
            ref={ref1}
            onClear={() => {
              setPass1('');
            }}
            onChangeText={setPass1}
            verifyText={() => isPasswordStyle(pass1)}
          />
        </View>
        <View>
          <Text style={styles.itemText}>再次确定</Text>
          <Input
            type="password"
            value={[pass2, setPass2]}
            placeholder="请再次输入密码"
            style={styles.itemInput}
            // width="100%"
            style={{ width: '100%' }}
            ref={ref2}
            onClear={() => {
              setPass2('');
            }}
            onChangeText={setPass2}
            verifyText={() => isPasswordStyle(pass2) && pass1 === pass2}
          />
        </View>
        <View>
          <Button
            title="完成"
            style={styles.btnView}
            textStyle={{ fontSize: 24, fontWeight: '500' }}
            onPress={() => {
              // console.log('telephone : ' + telephone + '; pass : ' + pass1);
              userForgetSetInfo(telephone, pass1)
                .then(res => {
                  navigation.navigate(LOGIN_SCREEN);
                })
                .catch(err => {
                  console.log('userForgetSetInfo error');
                })
                .finally(() => {});
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
    paddingVertical: 10,
  },
  btnView: {
    height: 60,
    marginVertical: 40,
  },
});
export default SetNewPassword;
