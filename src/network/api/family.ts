/*
 * @Description: 首页页面相关api
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-19 15:57:47
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 17:02:19
 */
import { post, get, del, put } from '../request';

/**
 * @description: 获取生长记录
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @param {integer} bid
 * @return {Promise} 请求Promise
 * @author: Austral
 */

export const GrouthRecord = (bid: number, RequestLifeCycle = {}) => {
  return get({
    url: '/baby/deveRecord',
    params: {
      bid,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取可添加身份
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @param {integer}familyld
 * @param {string}token
 * @return {Promise} 请求Promise
 * @author:makka-pakka
 */

export const canAddIdentity = (familyId?: number, RequestLifeCycle = {}) => {
  return get({
    url: '/family/canAddIdentity',
    params: {
      familyId,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description:查看家庭信息
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @author:makka-pakka
 */
export const getFamilyInfo = (RequestLifeCycle = {}) => {
  return get({
    url: '/family/getInfo',
    ...RequestLifeCycle,
  });
};

/**
 * @description: 查看宝宝信息
 * @param {string} id 宝宝id
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @author: Ban
 */
export const getBabyInfo = (id: number, RequestLifeCycle = {}) => {
  return get({
    url: '/baby',
    params: {
      id,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 修改宝宝信息
 * @param {*} RequestLifeCycle
 * @returns
 */
export const changeBabyInfo = (
  {
    avatar,
    sex,
    birthday,
    height,
    weight,
    backgroundImg,
    name,
  }: {
    avatar?: string;
    sex?: number;
    birthday?: string;
    height?: number;
    weight?: number;
    backgroundImg?: string;
    name?: string;
  } = {},
  id: number,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/baby',
    data: {
      avatar,
      id,
      sex,
      birthday,
      height,
      weight,
      backgroundImg,
      name,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 邀请用户加入家庭
 * @param {string} telephone 邀请用户之手机号码
 * @param {number} identityId 邀请加入之身份id
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @author: Ban
 */
export const familyInvite = (
  telephone: string,
  identityId: number,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/family/invite',
    data: {
      telephone,
      identityId,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 为家庭添加宝宝
 * @param name
 * @param birthday
 * @param sex
 * @param familyId 家庭id
 * @param avatar
 * @param RequestLifeCycle
 * @returns
 */
export const addBaby = (
  name: string,
  birthday: number,
  sex: number,
  familyId: number,
  avatar: string,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/family/addbaby',
    data: {
      name,
      birthday,
      sex,
      familyId,
      avatar,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取疫苗信息（疫苗接种记录）
 * @param {number} bid 疫苗ID
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @return {Promise} 请求Promise
 * @author: Xu
 */
export const vaccinationRecord = (bid: number, RequestLifeCycle = {}) => {
  return get({
    url: '/baby/vaccinesList',
    params: {
      bid,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取疫苗详情（疫苗接种详情）
 * @param {number} id 疫苗ID
 * @param {string} name 疫苗名称
 * @param {string} time 接种日期
 * @param {number} status 接种状态（0或1）
 * @param {string} more 疫苗介绍
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @return {Promise} 请求Promise
 * @author: Xu
 */
export const vaccinationDetails = (
  id: number,
  name: string,
  time: number,
  status: number,
  more: string,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/baby/vaccines',
    params: {
      id,
      name,
      time,
      status,
      more,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 添加疫苗记录
 * @param {string} name 疫苗名称
 * @param {number} status 接种状态（0或1）
 * @param {string} time 接种日期
 * @param {string} more 疫苗介绍
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @return {Promise} 请求Promise
 * @author: Xu
 */
export const postVaccination = (
  name: string,
  status: number,
  time: number,
  more: string,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/baby/vaccines',
    params: {
      name,
      status,
      time,
      more,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 删除疫苗记录
 * @param {number} id 疫苗ID
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @return {Promise} 请求Promise
 * @author: Xu
 */
export const deleteVaccination = (id: number, RequestLifeCycle = {}) => {
  return del({
    url: '/baby/vaccines',
    params: {
      id,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 更新疫苗信息
 * @param {number} id 疫苗ID
 * @param {number} status 接种状态（0或1）
 * @param {string} time 接种时间
 * @param {object} RequestLifeCycle 生命周期（选填）
 * @return {Promise} 请求Promise
 * @author: Xu
 */
export const putVaccination = (
  id: number,
  status: number,
  time: number,
  RequestLifeCycle = {},
) => {
  return put({
    url: '/baby/vaccines',
    params: {
      id,
      status,
      time,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取宝宝成长日记列表
 * @param {string} bid 宝宝id
 * @param {string} time 依据时间分页
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @author: Ban
 */
export const getBabyEventList = (
  bid: number,
  time = null,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/baby/eventList',
    params: {
      bid,
      time,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取相册
 * @param {string} bid 宝宝id
 * @param {object} RequestLifeCycle
 * @return {Promise}
 * @author: Ban
 */
export const getAlbum = (bid: number, RequestLifeCycle = {}) => {
  return get({
    url: '/album',
    params: {
      id: bid,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 添加图片进云相册
 * @date 2023-03-15
 * @param {any} id 宝宝id
 * @param {any} urls 图片路径
 * @param {any} RequestLifeCycle 生命周期
 * @returns {any}
 */
export const addAlbum = (
  id: number,
  urls: { url: string }[] = [],
  RequestLifeCycle = {},
) => {
  return post({
    url: '/album',
    data: {
      bid: id,
      urls,
    },
    ...RequestLifeCycle,
  });
};
