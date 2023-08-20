/*
 * @Description: 商城相关api
 * @Version:
 * @Autor: Ban
 * @Date: 2022-11-14 16:29:01
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-13 18:54:29
 */
import { get, post, put } from '../request';

/**
 * @description: 获取首页商品推荐
 * @param {object} RequestLifeCycle  生命周期 `选填`
 * @return {Promise} Promise
 * @author: Ban
 */

export const getShopRecommend = (RequestLifeCycle = {}) => {
  return get({
    url: '/shop/recommend',
    ...RequestLifeCycle,
  });
};

/**
 * @description: 获取首页banner图推荐
 * @param {object} RequestLifeCycle  生命周期 `选填`
 * @return {Promise} Promise
 * @author: Ban
 */

export const getRecommendBanner = (RequestLifeCycle = {}) => {
  return get({
    url: '/shop/recommend/banner',
    ...RequestLifeCycle,
  });
};

/*
 * @description: 购物车
 * @param {Object} RequestLifeCycle 生命周期（选填）
 * @param {Promise} 请求Promise
 * @author: 许志兴
 */

export const shopCar = (RequestLifeCycle = {}) => {
  return get({
    url: '/shop/car',
    ...RequestLifeCycle,
  });
};

/**
 * 修改购物车内某一商品信息
 * @date 2023-03-02
 * @param {any} id 商品id
 * @param {any} option 商品选项
 * @param {any} count 商品数量
 * @param {any} RequestLifeCycle 生命周期
 * @returns {any}
 */
export const changeShopCar = (
  id: string | number,
  option = {},
  count = 0,
  RequestLifeCycle = {},
) => {
  return put({
    url: '/shop/car',
    data: {
      id,
      option,
      count,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 获取热门搜索（猜你想搜）
 * @date 2023-03-06
 * @param {any} RequestLifeCycle 生命周期
 * @returns {any}
 */
export const getShopSearchHot = (RequestLifeCycle = {}): Promise<any> => {
  return get({
    url: '/shop/search/hot',
    ...RequestLifeCycle,
  });
};

/**
 * 获得商品选项
 * @date 2023-03-10
 * @param {any} id 商品id
 * @param {any} RequestLifeCycle 生命周期
 * @returns {any}
 */
export const getShopOptions = (id: number | string, RequestLifeCycle = {}) => {
  return get({
    url: '/shop/options',
    params: {
      id,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 获取订单列表，type为0是待支付，1待取货，2待收货，3全部，默认3
 * @param type
 * @param page
 * @param RequestLifeCycle
 * @returns
 */
export const getOrderList = (
  type: number = 3,
  page: number = 1,
  RequestLifeCycle = {},
) => {
  return get({
    url: '/shop/order/list',
    params: {
      page,
      type,
    },
    ...RequestLifeCycle,
  });
};

/**
 * 创建订单
 * @param way 配送方式，1 自取，2 配送
 * @param shop 商品信息
 * @param count 数量
 * @param address 外送地址
 * @param discountId 优惠券
 * @param RequestLifeCycle 生命周期
 * @author: Xu
 */

export const shopOrder = (
  way: number,
  shop: object,
  count: number | string,
  address: object,
  discountId: number | string,
  RequestLifeCycle = {},
) => {
  return post({
    url: '/shop/order',
    data: {
      way,
      shop,
      count,
      address,
      discountId,
    },
    ...RequestLifeCycle,
  });
};
