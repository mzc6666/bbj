/*
 * @Description: 家庭相册
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-09 13:31:03
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:24:32
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getAlbum, addAlbum } from '@/network/api/family';
import { useSelector } from 'react-redux';
import { selectBabyInfo } from '@/store/modules/baby';
import { useAsyncState, useToast } from '@/utils/hooks';
import { timeToNow } from '@/utils/util';
import {
  DEVICE_WIDTH,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_HEIGHT,
} from '@/config/modules/global';
import { defaultComponentHOC } from '@/utils/hoc';
import TitleHeader from '@/components/TitleHeader';
import ImageViewer from '@/components/ImageViewer/ImageViewer';
import Dialog from '@/components/Dialog/Dialog';
import colors from '@/assets/color';
import { useCamera, useChooseLibrary } from '@/utils/photo';
import { uploadImg } from '@/network/api/util';

/**
 * @description: 家庭相册
 * @return {*}
 * @author: Ban
 */
const HomeAlbum = ({ props, navigation }) => {
  const bid = useSelector(selectBabyInfo).id;
  const [imageData, setImageData] = useAsyncState([]); // 图片数据
  const [handledImageData, setHandledImageData] = useAsyncState([]);
  const MARGIN = 20,
    PADDING = 10; // MARGIN左右边距、PADDING图片之间边距
  const [imgWidth, setImgWidth] = useAsyncState(0); // 图片宽高
  const [imgViewerVisible, setImgViewerVisible] = useAsyncState(false);
  const [img, setImg] = useAsyncState([]);
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
          uploadImg(result[0]).then(res => {
            console.log(res);
            addAlbum(bid, [
              {
                url: res.data,
              },
            ])
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
            useToast('上传成功');
            setHandledImageData(result.concat(handledImageData));
            setDialogShow(false);
          });
        });
      },
    },
    {
      name: '录像',
      fun: () => {
        useCamera({ mediaType: 'video' }, (errorCode, result) => {
          if (errorCode) {
            console.log(errorCode);
            return;
          }
          setHandledImageData(result.concat(handledImageData));
          setDialogShow(false);
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
          uploadImg(result[0]).then(res => {
            useToast('上传成功');
            setHandledImageData(result.concat(handledImageData));
            // console.log(res);
            addAlbum(bid, [{ url: res.data }])
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
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

  useEffect(() => {
    getAlbum(bid)
      .then(data => {
        // 暂时只请求一次
        setImageData([...data.data]);
      })
      .catch(err => {
        console.log(err);
      });
  });

  useEffect(() => {
    handleData();
  });
  // [imageData]

  const handleData = () => {
    imageData.sort((a, b) => {
      return b.time - a.time;
    });
    let width = (DEVICE_WIDTH - 2 * (MARGIN + PADDING)) / 3;
    setImgWidth(width);
    setHandledImageData([...imageData]);
    // console.log('data', data, imageData.length);
  };

  return (
    <View
      style={{
        height: DEVICE_HEIGHT - DEVICE_STATUS_BAR_HEIGHT,
      }}>
      <TitleHeader
        title="相册"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {
          return (
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPress={() => {
                setDialogShow(true);
              }}>
              <Text>添加</Text>
            </TouchableOpacity>
          );
        }}
      />
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
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginLeft: MARGIN,
            marginRight: MARGIN,
            marginTop: MARGIN,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {handledImageData.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setImg(item.url);
                  setImgViewerVisible(true);
                }}>
                <Image
                  source={{
                    uri: item.url || item.uri,
                  }}
                  resizeMethod="resize"
                  style={{
                    width: imgWidth,
                    height: imgWidth,
                    marginRight: (index + 1) % 3 === 0 ? 0 : PADDING,
                    marginBottom: PADDING,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {imgViewerVisible && (
          <ImageViewer
            visible={imgViewerVisible}
            img={img}
            onRequestClose={() => {
              setImgViewerVisible(false);
            }}
          />
        )}
        <View
          style={{
            height: 20,
          }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default defaultComponentHOC(HomeAlbum);
