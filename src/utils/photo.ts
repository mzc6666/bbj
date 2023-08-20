/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2023-02-28 16:51:49
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-16 13:44:50
 */
import {
  Asset,
  CameraOptions,
  ErrorCode,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

/**
 * 使用相机拍照
 * @date 2023-02-28
 * @param {object} options 配置信息
 * @param {'photo' | 'video'} options.mediaType 'photo' or 'video'
 * @param {function} callback (errorCode, result) => {}
 * @returns {any}
 */
export const useCamera = (
  options: CameraOptions,
  callback: (err: ErrorCode | undefined, assets: Asset[] | undefined) => void,
) => {
  launchCamera(options, ({ didCancel, errorCode, errorMessage, assets }) => {
    // console.log(assets);
    callback(errorCode, assets);
  });
};

/**
 * 从相册选择图片/视频
 * @date 2023-02-28
 * @param {function} callback (errorCode, result) => {}
 * @returns {any}
 */
export const useChooseLibrary = (
  callback: (err: ErrorCode | undefined, assets: Asset[] | undefined) => void,
) => {
  launchImageLibrary(
    {
      mediaType: 'mixed',
    },
    ({ didCancel, errorCode, errorMessage, assets }) => {
      // console.log(assets);
      callback(errorCode, assets);
    },
  );
};
