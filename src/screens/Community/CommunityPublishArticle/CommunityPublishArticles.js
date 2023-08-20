import colors from '@/assets/color';
import Button from '@/components/Button';
import Dialog from '@/components/Dialog/Dialog';
import IconPark from '@/components/IconPark';
import MapView from '@/components/MapView/MapView';
import TitleHeader from '@/components/TitleHeader';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import { defaultComponentHOC } from '@/utils/hoc';
import { useAsyncState, useToast } from '@/utils/hooks';
import { useCamera, useChooseLibrary } from '@/utils/photo';
import { AtSign, Link, Local, PlusCross, Right, Topic } from '@icon-park/svg';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const CommunityPublishedArticles = ({ navigation }) => {
  const [content, setContent] = useAsyncState('');
  const [location, setLocation] = useAsyncState('请选择地点');
  const [imgList, setImgList] = useAsyncState([]);
  const [isAddPhotoDialog, setIsAddPhotoDialog] = useState(false);
  const [showMap, setShowMap] = useAsyncState(false);

  const handleImg = (errorCode, result) => {
    if (errorCode) {
      console.log('errorCode:', errorCode);
      return;
    }
    console.log(result);
    setImgList(imgList.concat([...result]));
    setIsAddPhotoDialog(false);
  };

  return (
    <View style={{ height: DEVICE_HEIGHT, backgroundColor: colors.gray[100] }}>
      <View>
        <TitleHeader
          title="发布文章"
          navigtion={navigation}
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
      </View>
      <View>
        <TextInput
          value={content}
          selectTextOnFocus={true}
          style={styles.inputStyle}
          multiline={true}
          textAlignVertical="top"
          onChangeText={text => {
            setContent(text);
          }}
          numberOfLines={10}
        />
      </View>
      {/* <View style={{ height: 10 }}></View> */}
      <View style={styles.imgBox}>
        {imgList.map((item, index) => {
          return (
            <Image
              key={item.fileName}
              style={styles.singleImg}
              source={{ uri: item.uri }}
            />
          );
        })}
        <TouchableOpacity
          onPress={() => {
            setIsAddPhotoDialog(!isAddPhotoDialog);
          }}
          style={{
            width: (DEVICE_WIDTH - 60) / 3,
            height: (DEVICE_WIDTH - 60) / 3,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            marginLeft: 10,
            marginTop: 10,
          }}>
          <IconPark
            iconPark={PlusCross({
              theme: 'filled',
              fill: [colors.gray[200]],
            })}
            size={16}
          />
        </TouchableOpacity>
      </View>

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
            useChooseLibrary(handleImg);
          }}
          style={[styles.touchAddStyle, { borderBottomWidth: 1 }]}>
          <Text style={styles.touchAddTextStyle}>从相册选择</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsAddPhotoDialog(!isAddPhotoDialog);
          }}
          style={styles.touchAddStyle}>
          <Text style={styles.touchAddTextStyle}>取消</Text>
        </TouchableOpacity>
      </Dialog>

      <View style={{ height: 10 }}></View>
      <View style={styles.selectBox1}>
        <View style={styles.selectLeft}>
          <View>
            <IconPark
              iconPark={AtSign({
                theme: 'outline',
                fill: [colors.gray[200]],
              })}
              size={16}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <IconPark
              iconPark={Link({
                theme: 'outline',
                fill: [colors.gray[200]],
              })}
              size={16}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <IconPark
              iconPark={Topic({
                theme: 'outline',
                fill: [colors.gray[200]],
              })}
              size={16}
            />
          </View>
        </View>
      </View>
      <View style={styles.selectBox2}>
        <View style={styles.selectLeft}>
          <View
            style={{ marginRight: 10, marginTop: colors.fontSize[300] - 12 }}>
            <IconPark
              iconPark={Local({
                theme: 'filled',
                fill: [colors.font[200]],
              })}
              size={16}
            />
          </View>
          <Text
            style={{ fontSize: colors.fontSize[300], color: colors.font[200] }}>
            所在位置
          </Text>
        </View>
        <TouchableOpacity
          style={styles.selectRight}
          onPress={() => {
            setShowMap(true);
          }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: colors.fontSize[300], color: colors.font[200] }}>
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
      </View>
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  selectBox1: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0,
    borderTopColor: colors.gray[100],
    backgroundColor: '#ffffff',
    width: DEVICE_WIDTH - 40,
    marginLeft: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  selectBox2: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    backgroundColor: '#ffffff',
    width: DEVICE_WIDTH - 40,
    marginLeft: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
  imgBox: {
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  singleImg: {
    width: (DEVICE_WIDTH - 60) / 3,
    height: (DEVICE_WIDTH - 60) / 3,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 8,
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

export default defaultComponentHOC(CommunityPublishedArticles, {
  scrollView: true,
});
