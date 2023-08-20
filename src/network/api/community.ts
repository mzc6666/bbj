/*
 * @Description: 社区页面相关api
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-18 19:19:02
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-16 23:30:27
 */
import { post, get } from '../request';

/**
 * @description: 获取可添加的标签
 * @param {object} RequestLifeCycle 生命周期 `选填`
 * @return {Promise} 请求Promise
 * @author: Ban
 */

export const articleTag = (RequestLifeCycle = {}) => {
  return get({
    url: '/article/tag',
    ...RequestLifeCycle,
  });
};

/**
 * @description: 搜索文章
 * @param  key 搜索关键字
 * @param  type 1是全部文章，2是当前用户发布的文章，3是点赞过的文章，4是点赞和发布的文章，5是推荐文章，6是关注的人的文章，7是按照关键字查找
 * @param time 分页时间
 * @return {Promise} 请求Promise
 * @author: Austral
 */
export const articleSearch = (
  type: number,
  key?: string,
  time?: number,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/article/list',
    params: {
      key,
      type,
      time,
    },
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取热门搜索
 * @return {Promise} 请求 Promise
 * @author: Xu
 */

export const getHotArticle = (RequestLifeCycle = {}) => {
  return get({
    url: '/article/hot',
    ...RequestLifeCycle,
  });
};

/**
 * 搜索好友，粉丝和关注，1为粉丝列表，2为关注列表，3为全部列表，当有name时。为搜索用户
 * @param {number} type 类型
 * @param {string} name 用户名
 * @param {number} page 分页
 * @param {*} RequestLifeCycle
 * @returns
 */
export const getCommunityUsers = (
  type: number,
  name?: string,
  page?: number,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/community/search',
    params: {
      type,
      name,
      page,
    },
    ...RequestLifeCycle,
  });
};
