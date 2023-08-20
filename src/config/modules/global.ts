/*
 * @Description: 全局配置信息
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-22 20:26:08
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-05 13:37:40
 */
import { Dimensions, StatusBar, useWindowDimensions } from 'react-native';

export const DEVICE_HEIGHT = useWindowDimensions().height; // 设备屏幕高度
export const DEVICE_WIDTH = useWindowDimensions().width; // 设备屏幕宽度
export const DEVICE_HEIGHT_GLOBA = Dimensions.get('window').height; // 设备屏幕高度,对于 Android， window 维度将排除 status bar （如果不是半透明）和 bottom navigation bar 使用的尺寸
export const DEVICE_WIDTH_GLOBA = Dimensions.get('window').width; // 设备屏幕宽度,
export const DEVICE_STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0; // 设备状态栏高度
export const DEVICE_HEADER_BAR_HEIGHT = 50; // 全局标题栏高度
