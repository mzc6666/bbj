/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2023-02-13 20:10:57
 * @LastEditors: Ban
 * @LastEditTime: 2023-02-13 21:33:55
 */
import React, { useRef } from 'react';
import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '@/config/modules/global';
import { useAsyncState } from '@/utils/hooks';

/**
 * @description: 图片预览组件
 * @param {object} props
 * @param {bollean} props.visible 是否可见
 * @param {string} props.img 图片路径
 * @param {function} props.onRequestClose 点击返回键触发
 * @return {*}
 * @author: Ban
 */

const ImageViewer = ({ visible, img, onRequestClose, ...options }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}>
      <ImageZoom
        cropHeight={DEVICE_HEIGHT}
        cropWidth={DEVICE_WIDTH}
        imageHeight={DEVICE_HEIGHT}
        imageWidth={DEVICE_WIDTH}>
        <Image
          style={{
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
          }}
          resizeMode="contain"
          source={{
            uri: img,
          }}></Image>
      </ImageZoom>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ImageViewer;
