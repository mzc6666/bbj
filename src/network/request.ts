/*
 * @Description: axois实例
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-09 14:47:58
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:26:52
 */

import {
  baseDevelopmentURL,
  timeout,
  baseDebugURL,
  localDebugURL,
  productionURL,
} from '@/config/modules/network';
import axios, { AxiosRequestConfig } from 'axios';
import { getData, removeItem } from '@/utils/localStorage';
import { store } from '@/store/configureStore';
import { persistor } from '@/store/configureStore';
import { useDispatch } from 'react-redux';
import { signout } from '@/store/modules/login';

interface RequestLifeCycle {
  beforeRequest?: () => void;
  afterResponse?: () => void;
  successBeforeRequest?: () => void;
  successAfterResponse?: () => void;
  failBeforeRequest?: () => void;
  failAfterResponse?: () => void;
}

interface RequestConfig extends AxiosRequestConfig, RequestLifeCycle {
  all?: boolean;
}

// const RequestLifeCycle = [];

const cacheMap = new Map(); // 执行请求缓存，解决同时间多此请求同一接口问题

const cacheRequest = async (options: RequestConfig) => {
  let promise = null,
    optionsString = JSON.stringify(options);

  if (!cacheMap.has(optionsString)) {
    promise = new Promise((resolve, reject) => {
      request(options)
        .then(res => {
          cacheMap.delete(optionsString);
          resolve(res);
        })
        .catch(e => {
          cacheMap.delete(optionsString);
          reject(e);
        });
    });
    cacheMap.set(optionsString, promise);
    return promise;
  } else {
    return cacheMap.get(optionsString);
  }
};
/**
 * @description: request请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise} 返回请求后的Promise
 * @author: Ban
 */
export function request(options: RequestConfig) {
  if (!options['all']) options['all'] = true; // 是否返回全部信息
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = axios.create({
      // baseURL: baseDevelopmentURL,
      // baseURL: baseDebugURL,
      // baseURL: localDebugURL,
      baseURL: productionURL,
      timeout: timeout,
    });

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      params => {
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画，或者执行一段程序
        if (options.successBeforeRequest) options.successBeforeRequest();
        if (options.beforeRequest) options.beforeRequest();

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
        if (
          !Object.prototype.hasOwnProperty.call(params.headers, 'token') ||
          !params.headers['token']
        )
          params.headers['token'] = store.getState().user.token;
        // r0JPzyQo2bMNwiWQRnCpTLOhJHyhSLkP

        // 3.对请求的参数进行序列化(看服务器是否需要序列化)

        // 4.等等
        return params;
      },
      err => {
        if (options.failBeforeRequest) options.failBeforeRequest();
        if (options.beforeRequest) options.beforeRequest();
        return Promise.reject(err);
      },
    );

    // 响应拦截
    instance.interceptors.response.use(
      response => {
        if (options.successAfterResponse) options.successAfterResponse();
        if (options.afterResponse) options.afterResponse();

        return response;
      },
      err => {
        // 身份验证失败
        if (err && err.response && err.response.code === 700) {
          // clearToken();
          removeItem('item');
          // store.commit('global/updateTokenInfo', { code: false });
        }
        // if (err && err.response && err.response.code === 410) router.push({ name: '404' });
        if (options.failAfterResponse) options.failAfterResponse();
        if (options.afterResponse) options.afterResponse();
        return Promise.reject(err);
      },
    );

    // 2.传入对象进行网络请求
    instance(options)
      .then(res => {
        if (res.data.code >= 200 && res.data.code < 300) {
          console.log(
            `\x1B[32m request ${options.url} success with a code of ${res.data.code} \x1B[39m`,
          );
          resolve(options.all ? res.data : res.data.data);
        } else {
          console.error(
            `Failed to load resource: the server responded with a code of ${res.data.code} (${res.data.msg})`,
          );
          // token过期退出登陆
          if (res.data.code == 700) {
            persistor
              .purge()
              .then(res => {
                store.dispatch(signout());
              })
              .catch(err => {
                console.log(err);
              });
          }
          reject(axios.isAxiosError(res.data));
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * @description: get请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: Ban
 */
export function get(options: RequestConfig) {
  if (options['method']) delete options['method'];
  return cacheRequest({
    ...options,
    method: 'GET',
  });
}

/**
 * @description: post请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: Ban
 */
export function post(options: RequestConfig) {
  if (options['method']) delete options['method'];
  return cacheRequest({
    ...options,
    method: 'POST',
  });
}

/**
 * @description: delete请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: Ban
 */
export function del(options: RequestConfig) {
  if (options['method']) delete options['method'];
  return cacheRequest({
    ...options,
    method: 'DELETE',
  });
}

/**
 * @description: put请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: Ban
 */
export function put(options: RequestConfig) {
  if (options['method']) delete options['method'];
  return cacheRequest({
    ...options,
    method: 'PUT',
  });
}

/**
 * @description: 上传文件 upload 请求
 * @param {RequestConfig} options axios参数(请参考AxiosRequestConfig，附加参数参考RequestConfig)，携带文件时采用，请传入data参数
 * @return {Promise<unknown>} 返回请求后的Promise
 * @author: Ban
 */
// export function upload(options) {
//   const data: FormData = new FormData();
//   if (options['data'])
//     for (const key in options.data) data.append(key, options.data[key]);
//   options.data = data;
//   let headers: Record<string, unknown>;
//   if (options['headers']) {
//     headers = options['headers'];
//     headers['Content-Type'] = 'multipart/form-data';
//     delete options['headers'];
//   } else headers = { 'Content-Type': 'multipart/form-data' };

//   return post({
//     ...options,
//     headers,
//   });
// }
