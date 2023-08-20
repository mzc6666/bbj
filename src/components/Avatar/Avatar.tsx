import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar as ElAvatar } from '@/plugins/elementUI';
import { useCamera, useChooseLibrary } from '@/utils/photo';
import colors from '@/assets/color';
import { useAsyncState, useToast } from '@/utils/hooks';
import Dialog from '../Dialog/Dialog';
import { uploadImg } from '@/network/api/util';
import { DEVICE_WIDTH } from '@/config/modules/global';

interface Props {
  /**
   * 是否显示上传头像，从相册选择
   */
  changeAvatar: boolean;
  size?: number;
  round?: boolean;
  img?: string;
  onChangeImg?(newImg: string): void;
}

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const Avatar = ({
  changeAvatar = false,
  size = 64,
  round = true,
  img,
  onChangeImg = () => {},
}: Props) => {
  const [dialogShow, setDialogShow] = useAsyncState(false);

  const ops = [
    {
      name: '拍照',
      fun: () => {
        useCamera({ mediaType: 'photo' }, (errorCode, result) => {
          if (errorCode) {
            console.log(errorCode);
            return;
          }
          uploadImg(result![0])
            .then(res => {
              useToast('上传成功');
              onChangeImg(res.data);
              setDialogShow(false);
            })
            .catch(err => {
              setDialogShow(false);
              console.log(err);
              useToast('图片上传失败');
            });
        });
      },
    },
    {
      name: '从相册选择',
      fun: () => {
        useChooseLibrary((errorCode, result) => {
          if (errorCode) {
            console.log(errorCode);
            return;
          }
          uploadImg(result![0]).then(res => {
            console.log(res);

            useToast('上传成功');
            onChangeImg(res.data);
            setDialogShow(false);
          });
        });
      },
    },
    {
      name: '取消',
      fun: () => {
        setDialogShow(false);
      },
    },
  ];

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ElAvatar
        onPress={() => {
          changeAvatar && setDialogShow(true);
        }}
        size={size}
        rounded={round}
        source={{
          uri: img,
        }}
        containerStyle={{
          backgroundColor: colors.gray[200],
        }}></ElAvatar>
      <Dialog
        isShow={dialogShow}
        onBackPress={() => {
          setDialogShow(false);
        }}
        style={{
          borderRadius: 8,
        }}>
        <View>
          {ops.map(i => (
            <TouchableOpacity
              key={i.name}
              style={{
                margin: 10,
                width: DEVICE_WIDTH / 3,
              }}
              onPress={i.fun}>
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.font[300],
                }}>
                {i.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Avatar;
