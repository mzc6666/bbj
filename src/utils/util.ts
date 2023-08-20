/*
 * @Description: 通用工具
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-11 13:24:12
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-16 23:42:30
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import zh_ch from 'dayjs/locale/zh-cn';

dayjs.locale(zh_ch);
dayjs.extend(relativeTime);

/**
 * @description: 日期变字符串
 * @param {Date} date
 * @param {string} format 返回的数据格式 `YYYY-MM-DD hh:mm:ss`
 * @return {string} date
 * @author: Ban
 */
export const dateToString = (date: number | Date, format: string) => {
  date = new Date(date);
  if (Number.isNaN(date))
    throw new Error('Type error. date is need a date type');
  const o = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };

  for (let i in o) {
    // @ts-ignore
    format = format.replace(new RegExp(`${i}`), o[i]);
  }

  return format;
};

/**
 * @description: 计算日期，返回 多少时间前
 * @param {Date} date
 * @return {string} 计算结果
 * @author: Ban
 */
export const computeDate = (date: number | Date) => {
  date = new Date(date);
  if (Number.isNaN(date))
    throw new Error('Type error. date is need a date type');
  const SECOND = 1000,
    MINUTE = 60 * SECOND,
    HOUR = 60 * MINUTE,
    DAY = 24 * HOUR;
  let now = new Date(),
    difference = now.getTime() - date.getTime();
  if (difference < MINUTE) return '现在';
  if (difference < HOUR) return `${Math.floor(difference / MINUTE)}分钟前`;
  if (difference < DAY) return `${Math.floor(difference / HOUR)}小时前`;
  if (now.getFullYear() - date.getFullYear())
    return `${now.getFullYear() - date.getFullYear()}年前`;
  if (now.getMonth() - date.getMonth())
    return `${now.getMonth() - date.getMonth()}月前`;
  if (now.getDate() - date.getDate())
    return `${now.getDate() - date.getDate()}天前`;
};

/**
 * @description: 计算天数，返回字符串 xx个月xx天
 * @param {Date} time 时间
 * @return {*}
 * @author: Ban
 */
export const calculateTime = (time: number | Date) => {
  const nowDate = new Date();
  const date = new Date(time);
  let years = nowDate.getFullYear() - date.getFullYear();
  let months = nowDate.getMonth() - date.getMonth();
  let days = nowDate.getDate() - date.getDate();
  if (days < 0) {
    days =
      new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate() -
      date.getDate();
    months--;
  }
  return `${years * 12 + months}个月${days}天`;
};

export const timeToNow = (time: number | Date) => {
  if (time instanceof Date || typeof time === 'number')
    return dayjs(time).toNow(true);
};
