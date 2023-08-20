/*
 * @Description: 本地存储
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-09 20:57:40
 * @LastEditors: Ban
 * @LastEditTime: 2022-08-08 12:37:41
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description: 持久化存储数据
 * @param {string} itemName 键名
 * @param {object || string} value 值
 * @return {Promise} 返回Promise
 * @author: Ban
 */

export const storeData = async (itemName, value) => {
  try {
    if (typeof value == 'object') value = JSON.stringify(value);
    return await AsyncStorage.setItem(itemName, value).then(() => {
      console.log(
        `\x1B[32m set store ${itemName} success with value of ${value} \x1B[39m`,
      );
    });
  } catch (e) {
    throw new Error(e);
  }
};
/**
 * @description: 获取持久化数据
 * @param {string} itemName 键名
 * @return {Promise} 返回Promise || null
 * @author: Ban
 */

export const getData = async itemName => {
  try {
    if (typeof itemName != 'string')
      throw new Error('The argument passed in should be a string');
    const value = await AsyncStorage.getItem(itemName).then(() => {
      console.log(`\x1B[32m get store ${itemName} success \x1B[39m`);
    });
    return value == null ? null : JSON.parse(value);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @description: 键名是否存在
 * @param {string} itemName 键名
 * @return {Promise} 返回Promise， true || false
 * @author: Ban
 */

export const isExist = async itemName => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    for (const i of allKeys) {
      if (i == itemName) return true;
    }
    return false;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @description: 相同键名数据合并
 * @param {itemName} 键名
 * @param {vlue} 值
 * @return {Promise} 返回Promise || null
 * @author: Ban
 */

export const mergeItem = async (itemName, value) => {
  try {
    if (await isExist(item)) {
      return await AsyncStorage.mergeItem(itemName, value).then(() => {
        console.log(
          `\x1B[32m merge store ${itemName} success with value of ${value} \x1B[39m`,
        );
      });
    } else return null;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @description: 删除数据
 * @param {string} itemName 键名
 * @return {Promise} 返回Promise
 * @author: Ban
 */

export const removeItem = async itemName => {
  try {
    if (await isExist(itemName)) {
      return await AsyncStorage.removeItem(itemName).then(() => {
        console.log(`\x1B[32m remove store ${itemName} success \x1B[39m`);
      });
    } else throw new Error('Data does not exist');
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @description: 清除全部数据
 * @return {Promise} 返回Promise
 * @author: Ban
 */

export const clearAll = async () => {
  try {
    return await AsyncStorage.clear().then(() => {
      console.log(`\x1B[32m clear all store success \x1B[39m`);
    });
  } catch (e) {
    throw new Error(e);
  }
};
