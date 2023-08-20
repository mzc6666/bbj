/*
 * @Description: 记录宝宝生长页面
 * @Version:
 * @Autor: Austral
 * @Date: 2022-07-19 20:13:04
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-12 14:23:14
 */
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Pressable,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import colors from '@/assets/color';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC } from '@/utils/hoc';
import { COMMUNITY_SCREEN_LINK_TAGS } from '@/navigation/navigationNames';
import {
  DEVICE_HEIGHT,
  DEVICE_STATUS_BAR_HEIGHT,
  DEVICE_WIDTH,
} from '@/config/modules/global';
import DatePicker from '../HomeVaccinationDetails/components/DatePicker';
import Dialog from '@/components/Dialog/Dialog';
import IconPark from '@/components/IconPark';
import { Local, Right, Time } from '@icon-park/svg';
import CommunityLinkTags from '@/screens/Community/CommunityLinkTags/CommunityLinkTags';
import { useAsyncState, useToast } from '@/utils/hooks';
import { useCamera, useChooseLibrary } from '@/utils/photo';
import { getLocation, createGeolocation } from '@/utils/geolocation';
import { NavigationHelpers } from '@react-navigation/native';
import MapView from '@/components/MapView/MapView';

const HomeRecordBabyEvents = ({
  props,
  navigation,
}: {
  props: any;
  navigation: NavigationHelpers<any>;
}) => {
  const [imgList, setImgList] = useAsyncState([]);
  const [tags, setTags] = useAsyncState([{ name: '+' }]);
  const [content, setContent] = useAsyncState(''); //输入框的值
  // const inputRef = useRef(); // input Ref
  const [isLinkTags, setIsLinkTags] = useAsyncState(false);
  const [isDateDialog, setIsDateDailog] = useState(false); // 是否显示日期选择器
  const [isAddPhotoDialog, setIsAddPhotoDialog] = useState(false); // 是否显示添加图片弹窗
  const [location, setLocation] = useState('请选择地点'); //获取地址值
  const [showMap, setShowMap] = useAsyncState(false);

  /**
   * @description: 获取默认时间（默认nowDate）
   * @return {*}
   * @author: Xu
   */

  let date = new Date();
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  let nowDate = year + '年' + month + '月' + day + '日';
  const [time, setTime] = useState(nowDate); //时间默认值值

  useEffect(() => {
    createGeolocation().then(() => {
      getLocation()
        .then(({ coords, location }: any) => {
          setLocation(location.address);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  const handleImg = (errorCode: any, result: any) => {
    if (errorCode) {
      console.log('errorCode:', errorCode);
      return;
    }
    console.log(result);
    setImgList(imgList.concat([...result]));
    setIsAddPhotoDialog(false);
  };

  if (isLinkTags) {
    return (
      <CommunityLinkTags
        close={() => {
          setIsLinkTags(false);
        }}
        confirm={(data: any) => {
          setTags(data.concat(tags));
        }}
      />
    );
  }

  return (
    <View
      style={{
        height: DEVICE_HEIGHT,
        backgroundColor: colors.gray[0],
      }}>
      {/* 标题栏 */}
      <TitleHeader
        title="记录"
        navigation={navigation}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => (
          <Button
            title="发布"
            onPress={() => {
              useToast('发布成功');
              navigation.goBack();
            }}
            style={{
              height: 30,
              paddingLeft: 12,
              paddingRight: 12,
              marginRight: 20,
            }}
          />
        )}
      />
      {/* 输入框 */}
      <TextInput
        value={content}
        selectTextOnFocus={true}
        style={styles.inputStyle}
        multiline={true}
        textAlignVertical="top"
        onChangeText={text => {
          setContent(text);
        }}
        numberOfLines={5}
      />
      {/* 图片部分 */}
      <View style={styles.imgBox}>
        {imgList.map((item: any) => {
          return (
            <Image
              key={item.fileName}
              style={styles.singleImg}
              source={{ uri: item.uri }}
            />
          );
        })}
        {/* 添加图片 */}
        <TouchableOpacity
          style={[
            styles.singleImg,
            {
              backgroundColor: colors.gray[200],
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            setIsAddPhotoDialog(true);
          }}>
          <Text
            style={{
              fontSize: colors.fontSize[600],
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* 添加图片弹窗 */}
      <Dialog
        isShow={isAddPhotoDialog}
        onBackPress={() => {
          setIsAddPhotoDialog(false);
        }}
        style={{ borderRadius: 16 }}>
        <TouchableOpacity
          onPress={() => {
            useCamera(
              {
                mediaType: 'photo',
              },
              handleImg,
            );
          }}
          style={[styles.touchAddStyle, { borderBottomWidth: 1 }]}>
          <Text style={styles.touchAddTextStyle}>拍照</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            useCamera(
              {
                mediaType: 'video',
              },
              handleImg,
            );
          }}
          style={[styles.touchAddStyle, { borderBottomWidth: 1 }]}>
          <Text style={styles.touchAddTextStyle}>录像</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            useChooseLibrary(handleImg);
          }}
          style={[styles.touchAddStyle, { borderBottomWidth: 1 }]}>
          <Text style={styles.touchAddTextStyle}>从相册选择</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchAddStyle}
          onPress={() => {
            setIsAddPhotoDialog(!isAddPhotoDialog);
          }}>
          <Text style={styles.touchAddTextStyle}>取消</Text>
        </TouchableOpacity>
      </Dialog>

      {/* <Tag/> */}
      <View style={{ marginTop: 10, flexDirection: 'row' }}>
        {tags.map((item: any) => {
          return (
            <Tag
              title={item.name}
              key={item.name}
              isSelect={true}
              style={{
                marginLeft: 12,
                marginBottom: 9,
              }}
              onPress={() => {
                setIsLinkTags(true);
              }}
            />
          );
        })}
      </View>

      {/* 所在位置 */}
      <View style={styles.selectBox}>
        <View style={styles.selectLeft}>
          <View style={{ marginRight: 10 }}>
            <IconPark
              iconPark={Local({
                theme: 'filled',
                fill: [colors.font[200]],
              })}
              size={16}
            />
          </View>
          <Text>所在位置</Text>
        </View>
        <TouchableOpacity
          style={styles.selectRight}
          onPress={() => {
            setShowMap(true);
          }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: colors.fontSize[300] }}>
            {location}
          </Text>
          <IconPark
            iconPark={Right({
              theme: 'filled',
              fill: [colors.font[200]],
            })}
            size={colors.fontSize[600]}
          />
        </TouchableOpacity>
      </View>
      {/* 地图 */}
      {showMap && (
        <Dialog
          isShow={showMap}
          onBackPress={() => {
            setShowMap(false);
          }}>
          <MapView
            confirm={location => {
              setLocation(location);
              setShowMap(false);
            }}
            cancel={() => {
              setShowMap(false);
            }}></MapView>
        </Dialog>
      )}
      {/* 发生时间 */}
      <View style={styles.selectBox}>
        <View style={styles.selectLeft}>
          <View style={{ marginRight: 10 }}>
            <IconPark
              iconPark={Time({
                theme: 'outline',
                fill: [colors.font[200]],
              })}
              size={colors.fontSize[300]}
            />
          </View>
          <Text>发生时间</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsDateDailog(!isDateDialog);
          }}
          style={{ flexDirection: 'row' }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: colors.fontSize[300] }}>
            {time}
          </Text>
          <IconPark
            iconPark={Right({
              theme: 'filled',
              fill: [colors.font[200]],
            })}
            size={colors.fontSize[600]}
          />
        </TouchableOpacity>
      </View>

      <DatePicker
        isShow={isDateDialog}
        onBackPress={() => {
          setIsDateDailog(false);
        }}
        onConfirmPress={item => {
          setIsDateDailog(!isDateDialog);
          setTime(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginLeft: 20,
    marginRight: 20,
    textAlignVertical: 'top',
    marginTop: 15,
    maxHeight: 200,
  },
  imgBox: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleImg: {
    width: (DEVICE_WIDTH - 40) / 3,
    height: (DEVICE_WIDTH - 40) / 3,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 8,
  },
  touchBox: {
    alignItems: 'center',
  },
  selectBox: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  selectLeft: {
    flexDirection: 'row',
    alignContent: 'center',
    fontSize: colors.fontSize[300],
    marginLeft: 20,
  },
  selectRight: {
    flexDirection: 'row',
    flexShrink: 1,
    marginLeft: 20,
    paddingRight: 20,
  },
  labelBox: {
    flexDirection: 'row',
  },
  timeBox: {
    height: 40,
  },
  touchAddStyle: {
    height: 37,
    width: 180,
    borderBottomColor: colors.gray[100],
  },
  touchAddTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: colors.font[300],
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 10,
    paddingBottom: 7,
  },
});

export default defaultComponentHOC(HomeRecordBabyEvents, {
  scrollView: true,
});
