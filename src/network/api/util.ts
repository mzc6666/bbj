/*
 * @Description: 其他apis
 * @Version:
 * @Autor: Ban
 * @Date: 2023-02-14 19:44:30
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 23:43:55
 */
import { post } from '../request';

/**
 * 上传图片
 * @date 2023-02-14
 * @param {any} img 图片地址
 * @param {any} RequestLifeCycle 生命周期
 * @returns {any}
 */
export const uploadImg = (file: any, RequestLifeCycle = {}) => {
  const formData = new FormData();
  formData.append('img', { ...file, name: file?.fileName });

  return post({
    url: '/article/upImg',
    data: formData,
    ...RequestLifeCycle,
  });
};
