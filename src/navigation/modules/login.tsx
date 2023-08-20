/*
 * @Description: 登陆导航
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-05 19:36:06
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-05 13:11:48
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { initAuthNavigation, initStackNavigation } from '../navigation';
import {
  LOGIN_SCREEN,
  LOGIN_SCREEN_RESET_GETCODE,
  LOGIN_SCREEN_RESET_INPUTCODE,
  LOGIN_SCREEN_RESET_SETNEWPASSWORD,
  LOGIN_SCREEN_REGISTER_GETCODE,
  LOGIN_SCREEN_REGISTER_INPUTCODE,
  LOGIN_SCREEN_REGISTER_SETUSERINFO,
  LOGIN_SCREEN_LOGIN_GETCODE,
  LOGIN_SCREEN_LOGIN_INPUTCODE,
} from '../navigationNames';

import LogIn from '@/screens/LogIn/LogIn';
import LoginForgetGetCode from '@/screens/LogIn/LogInForgetGetCode/LogInForgetGetCode';
import LoginForgetInputCode from '@/screens/LogIn/LoginForgetInputCode/LoginForgetInputCode';
import LoginForgetSetNewPass from '@/screens/LogIn/LogInForgetSetNewPass/LogInForgetSetNewPass';
import LoginRegisterGetCode from '@/screens/LogIn/LoginRegisterGetCode/LoginRegisterGetCode';
import LoginRegisterInputCode from '@/screens/LogIn/LoginRegisterInputCode/LoginRegisterInputCode';
import LoginRegisterSetUserInfo from '@/screens/LogIn/LoginRegisterSetUserInfo/LoginRegisterSetUserInfo';
import LoginGetCode from '@/screens/LogIn/LoginGetCode/LoginGetCode';
import LoginInputCode from '@/screens/LogIn/LoginInputCode/LoginInputCode';

/**
 * @description: 登录注册相关路由
 * @return {*}
 * @autor: mzc
 */

const loginNavigation = () => {
  const loginStack = createStackNavigator();
  console.log('loginNavigation');

  return (
    <loginStack.Navigator>
      {initStackNavigation(loginStack, LOGIN_SCREEN, LogIn)}
      {/* {initAuthNavigation('登录', LOGIN_SCREEN, LogIn, loginStack, false)} */}
      {initAuthNavigation(
        '忘记密码',
        LOGIN_SCREEN_RESET_GETCODE,
        LoginForgetGetCode,
        loginStack,
      )}
      {initAuthNavigation(
        '忘记密码',
        LOGIN_SCREEN_RESET_INPUTCODE,
        LoginForgetInputCode,
        loginStack,
      )}
      {initAuthNavigation(
        '忘记密码',
        LOGIN_SCREEN_RESET_SETNEWPASSWORD,
        LoginForgetSetNewPass,
        loginStack,
      )}
      {initAuthNavigation(
        '用户注册',
        LOGIN_SCREEN_REGISTER_GETCODE,
        LoginRegisterGetCode,
        loginStack,
      )}
      {initAuthNavigation(
        '用户注册',
        LOGIN_SCREEN_REGISTER_INPUTCODE,
        LoginRegisterInputCode,
        loginStack,
      )}
      {initAuthNavigation(
        '用户注册',
        LOGIN_SCREEN_REGISTER_SETUSERINFO,
        LoginRegisterSetUserInfo,
        loginStack,
      )}
      {initAuthNavigation(
        '验证码登录',
        LOGIN_SCREEN_LOGIN_GETCODE,
        LoginGetCode,
        loginStack,
      )}
      {initAuthNavigation(
        '验证码登录',
        LOGIN_SCREEN_LOGIN_INPUTCODE,
        LoginInputCode,
        loginStack,
      )}
    </loginStack.Navigator>
  );
};
export { loginNavigation as AdminNavigation };
