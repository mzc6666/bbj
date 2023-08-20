/*
 * @Description: 用户信息 api
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-14 20:25:34
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 11:48:25
 */
import { get, post } from '../request';

/**
 * @description: 获取用户个人信息
 * @param {object} RequestLifeCycle  生命周期 `选填`
 * @return {*}
 * @author: mzc
 */

export const getPersonalInfo = (RequestLifeCycle = {}) => {
  return post({
    url: '/user/getInfo',
    ...RequestLifeCycle,
  });
};

/**
 * @description: 修改用户信息 (要改)
 * @param {object}  { name, sex, QQ, weChat, birthday} 要修改的值组成的对象
 * @param {object}   RequestLifeCycle  生命周期 `选填`
 * @return {*}
 * @author: mzc
 */
export const changeUserInfo = (
  {
    id = null,
    name = null,
    sex = null,
    QQ = null,
    weChat = null,
    birthday = null,
    introduction = null,
  } = {},
  RequestLifeCycle = {},
) => {
  return post({
    url: '/user/change',
    data: {
      id,
      name,
      sex,
      QQ,
      weChat,
      birthday,
      introduction,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 新建地址
 * @param code 省市县代码拼起来
 * @param more 详细地址
 * @param isDefault  是否默认地址，0默认，1不默认
 * @param name 姓名
 * @param telephone 电话号码
 * @param RequestLifeCycle 生命周期
 * @returns
 */
export const addAdress = (
  code: number | string,
  more: string,
  isDefault: number = 1,
  name: string,
  telephone: number | string,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/user/location',
    data: {
      code,
      more,
      isDefault,
      name,
      telephone,
    },
    ...RequestLifeCycle,
  });
};
