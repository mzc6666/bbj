/*
 * @description:
 * @Version:
 * @Autor: Xu
 * @Date: 2022-08-10 00:51:59
 * @LastEditors: Xu
 * @LastEditTime: 2022-09-17 18:08:44
 */
import TitleHeader from '@/components/TitleHeader';
import Input from '@/components/Input';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ToastAndroid,
} from 'react-native';
import { ScreenHeight, ScreenWidth } from '@rneui/base';
import colors from '@/assets/color';
import {
  Switch,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { ME_SETTING_SHOPPINGADDRESS } from '@/navigation/navigationNames';
import { defaultComponentHOC } from '@/utils/hoc';

const MeSettingAddShopAddress = ({ navigation }) => {
  /**
   * @description: 点击空白处键盘消失
   * @return {*}
   * @author: Xu
   */

  // 创建五个ref对象
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();

  // 绑定输入框数据
  const [inputData1, setInputData1] = useState('');
  const [inputData2, setInputData2] = useState('');
  const [inputData3, setInputData3] = useState('');
  const [inputData4, setInputData4] = useState('');
  const [inputData5, setInputData5] = useState('');

  /**
   * @description: Switch相关函数
   * @return {*}
   * @author: Xu
   */

  // 设置开关初始状态
  const [isEnabled, setIsEnabled] = useState(false);

  // 改变开关状态
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log(!isEnabled, '状态');
  };

  /**
   * @description: 验证手机格式
   * @params {*} telephone
   * @return {*}
   * @author: Ban (来源于HomeFamilyInvite)
   */

  const isTelephoneStyle = telephone => {
    const len = 11;
    const telRegexp = /^1(([3,5,8]\d{9})|(4[5,7]\d{8})|(7[0,6-8]\d{8}))$/;
    return telephone.length === len && telRegexp.test(telephone) && telephone;
  };

  /**
   * @description: 保存收货信息
   * @return {*}
   * @author: Xu
   */

  const submit = () => {
    if (!inputData1) {
      if (Platform.OS == 'android')
        ToastAndroid.showWithGravity(
          '请输入收件人',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
    } else if (!inputData2) {
      if (Platform.OS == 'android')
        ToastAndroid.showWithGravity(
          '请输入联系电话',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
    } else if (!inputData3) {
      if (Platform.OS == 'android')
        ToastAndroid.showWithGravity(
          '请获取所在地区',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
    } else if (!inputData4) {
      if (Platform.OS == 'android')
        ToastAndroid.showWithGravity(
          '请输入详细地址',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
    } else if (!isTelephoneStyle(inputData2)) {
      if (Platform.OS == 'android')
        ToastAndroid.showWithGravity(
          '请输入正确的手机号码',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
    } else {
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          '保存成功',
          ToastAndroid.BOTTOM,
          ToastAndroid.LONG,
        );
        navigation.navigate(ME_SETTING_SHOPPINGADDRESS);
      }
    }
  };

  return (
    <>
      <Pressable
        onPress={() => {
          ref1.current.blur();
          ref2.current.blur();
          ref3.current.blur();
          ref4.current.blur();
          ref5.current.blur();
        }}>
        <View
          style={{
            height: ScreenHeight,
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <View>
            <TitleHeader
              title="新增收货地址"
              navigation={navigation}
              headerLeftPress={() => {
                navigation.goBack();
              }}
              headerRight={() => <Text></Text>}
            />
            <View style={styles.topContianerStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={[styles.inputLeftTextStyle]}>收件人</Text>
                <View
                  style={[styles.inputStyle, { left: colors.fontSize[300] }]}>
                  <Input
                    isclear={false}
                    placeholder="收件人姓名"
                    value={[inputData1, setInputData1]}
                    ref={ref1}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.inputLeftTextStyle}>联系电话</Text>
                <View style={styles.inputStyle}>
                  <Input
                    isclear={false}
                    placeholder="收件人号码"
                    value={[inputData2, setInputData2]}
                    ref={ref2}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.inputLeftTextStyle}>所在地区</Text>
                <View style={styles.inputStyle}>
                  <Input
                    isclear={false}
                    placeholder="点击定位图标，填写地址"
                    value={[inputData3, setInputData3]}
                    ref={ref3}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.inputLeftTextStyle}>详细地址</Text>
                <View style={styles.inputStyle}>
                  <Input
                    isclear={false}
                    placeholder="请输入地址"
                    value={[inputData4, setInputData4]}
                    ref={ref4}
                  />
                </View>
              </View>
              <View style={{ padding: 20 }}>
                <TextInput
                  style={{
                    height: 60,
                    backgroundColor: colors.gray[100],
                    paddingTop: 10,
                  }}
                  multiline={true}
                  textAlignVertical="top"
                  placeholder="粘贴文本至此处，可自动识别信息并填写"
                  placeholderTextColor={colors.font[200]}
                  value={[inputData5, setInputData5]}
                  ref={ref5}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    backgroundColor: colors.gray[100],
                  }}>
                  <TouchableOpacity
                    style={[
                      styles.touchableOpacityStyle,
                      {
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        borderColor: colors.rose[400],
                      },
                    ]}>
                    <Text
                      style={[
                        styles.touchableOpacityTextStyle,
                        { color: colors.rose[400] },
                      ]}>
                      粘贴
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.touchableOpacityStyle,
                      { backgroundColor: colors.rose[400] },
                    ]}>
                    <Text
                      style={[
                        styles.touchableOpacityTextStyle,
                        {
                          color: '#ffffff',
                        },
                      ]}>
                      识别
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.middleContianerStyle}>
              <Text style={styles.middleContianerTextStyle}>
                设置为默认地址
              </Text>
              <View style={styles.switchStyle}>
                <Switch
                  trackColor={{
                    false: colors.gray[300],
                    true: colors.rose[300],
                  }}
                  thumbColor={isEnabled ? colors.rose[400] : colors.gray[100]}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>
          <View style={{ padding: 8 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.rose[400],
                borderRadius: 18,
              }}
              onPress={() => {
                submit();
              }}>
              <Text
                style={{
                  fontSize: colors.fontSize[300],
                  fontWeight: '400',
                  color: '#ffffff',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  paddingTop: 7,
                  paddingBottom: 7,
                }}>
                保存收货信息
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  topContianerStyle: {
    height: 289,
    width: ScreenWidth,
    marginTop: 15,
    backgroundColor: '#ffffff',
  },
  inputStyle: {
    width: '74%',
  },
  inputLeftTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: colors.font[300],
    padding: 10,
  },
  touchableOpacityStyle: {
    width: 52,
    height: 25,
    borderRadius: 18,
    marginBottom: 10,
    marginRight: 10,
  },
  touchableOpacityTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  middleContianerStyle: {
    width: ScreenWidth,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginTop: 15,
  },
  middleContianerTextStyle: {
    fontSize: colors.fontSize[300],
    fontWeight: '400',
    color: colors.font[300],
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
  },
  switchStyle: {
    paddingRight: 20,
    paddingTop: 10,
  },
});

export default defaultComponentHOC(MeSettingAddShopAddress);
