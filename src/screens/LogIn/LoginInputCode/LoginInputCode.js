/*
 * @Description: 登录输入验证码
 * @Version:
 * @Autor: Xu
 * @Date: 2023-03-18 21:41:10
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-26 18:35:13
 */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { HOME_SCREEN } from '@/navigation/navigationNames';
import CaptchaGrid from '@/components/CaptchaGrid/index';
import color from '@/assets/color';
import { checkLoginCoding } from '@/network/api/login';
import { useDispatch } from 'react-redux';
import { signin } from '@/store/modules/login';
import { setUserToken } from '@/store/modules/user';
/**
 * @description:  输入验证码函数组件
 * @param {*} navigation
 * @param {*} route
 * @return {*}
 * @autor: Xu
 */

const LoginInputCode = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { telephone } = route.params;
  const tel = telephone.replace(telephone.substring(3, 7), '****'); // 手机号码
  // 六位验证码
  const [authCode, setAuthCode] = useState(Array(6).fill(''));
  // refs对象
  const refs = Array(6)
    .fill(null)
    .map(item => useRef());
  // 应该输入的CaptchaGird组件索引
  const [order, setOrder] = useState(0);
  // 键盘是否弹出
  const [show, setShow] = useState(true);
  // 验证码已完成发送网络请求
  useEffect(() => {
    if (/^\d{6}$/.test(authCode.join('')) && !authCode.some(item => !item)) {
      checkLoginCoding(telephone, authCode.join(''))
        .then(res => {
          console.log(res);
          dispatch(setUserToken(res.data)); // 存入个人信息,个人信息通过token获得（待改）
          dispatch(signin());
        })
        .catch(err => {
          console.log('checkLoginCoding error!');
        });
    }
  }, [authCode, dispatch, telephone]);

  return (
    <Pressable
      style={{ backgroundColor: '#FFF', flex: 1 }}
      onPress={() => {
        setShow(false);
      }}>
      <View>
        <View>
          <Text
            style={[styles.bigTitle, { textAlign: 'center', color: '#000' }]}>
            请输入验证码
          </Text>
          <Text style={{ textAlign: 'center', color: '#000' }}>
            已发送至 +86 {tel}
          </Text>
        </View>
        <View>
          <View style={styles.codeView}>
            {authCode.map((item, index) => (
              <CaptchaGrid
                key={index}
                value={item}
                ref={refs[index]}
                isMe={index === order && show}
                // ref={refs[index]}
                onChangeText={text => {
                  if (text.length === 0) {
                    // 移动光标 > 更新数组 特殊情况(order === 0 时失去光标)
                    order === 0 ? setShow(false) : setOrder(order - 1);
                    const newList = [...authCode];
                    newList[index] = text;
                    setAuthCode(newList);
                  } else if (text.length === 1) {
                    // 输入 > 修改数组 > 光标移动到下一个输入框 > 上一级失去焦点 (特殊情况  order === length -1)
                    order === authCode.length - 1
                      ? setShow(false)
                      : setOrder(order + 1);
                    const newList = [...authCode];
                    newList[index] = text;
                    setAuthCode(newList);
                  }
                }}
                onFocus={() => {
                  setShow(true);
                  setOrder(order);
                }}
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 20,
            }}></View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  codeView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  bigTitle: {
    fontSize: 24,
    paddingVertical: 10,
  },
  smallTitle: {
    fontSize: 12,
    paddingBottom: 10,
  },
  roseText: {
    color: color['rose']['400'],
  },
});

export default LoginInputCode;
