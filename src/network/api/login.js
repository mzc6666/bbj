/*
 * @Description: 用户登陆api
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-10 20:24:51
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-26 18:27:30
 */

import { post, get } from '../request';

/**
 * @description: 用户登陆
 * @param {string} telephone 手机号码
 * @param {string} password 密码
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @author: Ban
 */

export const userLogin = (telephone, password, RequestLifeCycle = {}) => {
  return post({
    url: '/user/login',
    data: {
      telephone,
      password,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 用户注册(获取验证码)
 * @param { string} telephone 手机号码
 * @param { object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @autor: mzc
 */

export const userRegisterGetVerificationCode = (
  telephone,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/user/getCheckCode',
    params: {
      telephone,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 用户注册(输入验证码进行验证)
 * @param {string} telephone 手机号码
 * @param {string} code 验证码
 * @param {object}  RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @autor: mzc
 */

export const userRegisteInputrVerificationCode = (
  telephone,
  code,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/user/checkCoding',
    params: {
      telephone,
      code,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 用户注册(设置用户名和密码)
 * @param {string} name 昵称
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {object}  RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @autor: mzc
 */

export const userRegisterSetUserInfo = (
  name,
  password,
  telephone,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/user/register',
    data: {
      telephone,
      password,
      name,
    },
    all: true,
    ...RequestLifeCycle,
  });
};

/**
 * @description: 忘记密码(获取验证码)
 * @param {string} telephone 手机号码
 * @param {object}   RequestLifeCycle 生命周期 `选填`
 * @return {*}
 * @autor: mzc
 */
export const userForgetGetVerificationCode = (
  telephone,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/user/getChangePassCheckCode',
    params: {
      telephone,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 忘记密码(输入验证码)
 * @param {string} telephone 电话号码
 * @param {string} code 验证码
 * @param {object}  RequestLifeCycle 生命周期 `选填`
 * @return {*}
 * @autor: mzc
 */

export const userForgetInputVertificationCode = (
  telephone,
  code,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/user/checkChangePassCheckCoding',
    params: {
      telephone,
      code,
    },
    all: true,
    ...RequestLifeCycle,
  });
};

/**
 * @description: 忘记密码(设置新密码)
 * @param {string} telephone 手机号码
 * @param {string} newPassword 需要设置的密码
 * @param {object}  RequestLifeCycle 生命周期 `选填`
 * @return {*}
 * @autor: mzc
 */

export const userForgetSetInfo = (
  telephone,
  newPassword,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/user/changePass',
    data: {
      telephone,
      newPassword,
    },
    all: true,
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取登录验证码
 * @param {string} telephone 手机号码
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @returns {*}
 * @author: Xu
 */

export const getLoginCheckCode = (telephone, RequestLifeCycle = {}) => {
  return get({
    url: '/user/getLoginCheckCode',
    params: {
      telephone,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 提交验证码
 * @param {string} telephone 手机号码
 * @param {string} code 验证码
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @returns {*}
 * @author: Xu
 */

export const checkLoginCoding = (telephone, code, RequestLifeCycle = {}) => {
  return get({
    url: '/user/checkLoginCoding',
    params: {
      telephone,
      code,
    },
    ...RequestLifeCycle,
  });
};
