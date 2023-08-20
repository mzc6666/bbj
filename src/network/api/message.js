/*
 * @Description: 消息页面相关api
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-07-22 20:39:11
 * @LastEditors: mzc
 * @LastEditTime: 2023-03-21 21:27:15
 */
import { post, get } from '../request';
import { instance, SOCKET_EVENT_TYPE } from '../socket';
/**
 * @description:新增关注
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @param {integer}type
 * @param {string}name
 * @return {Promise} 请求Promise
 * @author:makka-pakka
 */
export const concernUser = (name, type, RequestLifeCycle = {}) => {
  return get({
    url: '/message/attention',
    users: {
      name,
      type,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description:是否互相关注
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @param {integer}attentionld
 * @param {string}token
 * @return {Promise} 请求Promise
 * @author:makka-pakka
 */
export const userAttention = (homeId, token, RequestLifeCycle = {}) => {
  return get({
    url: '/message/attention',
    data: {
      homeId,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 给好友发消息
 * @param {number} id 好友ID
 * @param {string} content 发送内容
 * @return {*}
 * @author: mzc
 */
export const sendMessageToFriend = (id, content) => {
  instance?.sendData({
    eventName: SOCKET_EVENT_TYPE.RECEIVE_MESSAGE_EVENT,
    id,
    content,
  });
};
