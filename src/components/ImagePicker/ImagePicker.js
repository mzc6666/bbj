/*
 * @Description: 图片选择器
 * @Version:
 * @Autor: Ban
 * @Date: 2022-09-26 20:50:58
 * @LastEditors: Ban
 * @LastEditTime: 2022-09-29 19:00:39
 */
import React from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

/**
 * @description: 图片选择器
 * @param {string} mode 模式 `可选从相册选择图片|视频|相机 image | video | photo`
 * @param {bollean} cropping 是否可剪裁，选择视频模式下需要关闭此选项 `默认 false`
 * @param {}
 * @return {*}
 * @author: Ban
 */

const ImagePicker = ({ mode, cropping = false }) => {};

const styles = StyleSheet.create({});

export default ImagePicker;
