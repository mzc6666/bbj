/*
 * @Description:
 * @Version:
 * @Autor: mzc
 * @Date: 2022-07-18 20:34:46
 * @LastEditors: Xu
 * @LastEditTime: 2023-04-14 23:25:01
 */
import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import TitleHeader from '@/components/TitleHeader';
import { DEVICE_WIDTH } from '@/config/modules/global';
import { Avatar } from '@/plugins/elementUI';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/modules/user';
import colors from '@/assets/color';
import { defaultComponentHOC } from '@/utils/hoc';
import {
  ME_SETTING_PERSONALINFOCHANGEINTRODUCE,
  ME_SETTING_PERSONALINFOCHANGENAME,
} from '@/navigation/navigationNames';
import IconPark from '@/components/IconPark';
import { Right } from '@icon-park/svg';
import Dialog from '@/components/Dialog/Dialog';
import { changeUserInfo } from '@/network/api/user';
import { setUserInfoState } from '@/store/modules/user';
import { useToast } from '@/utils/hooks';
import DatePicker from '@/screens/Home/HomeVaccinationDetails/components/DatePicker';

const MeSettingPersonalInfo = ({ navigation, route }) => {
  const userInfo = useSelector(selectUserInfo);
  const [Sex, selectSex] = useState(false); // 性别弹窗
  const [Date, selectDate] = useState(false); // 生日弹窗
  const [birthday, setBirthday] = useState('');
  const dispatch = useDispatch();
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'red',
      }}>
      <TitleHeader
        title="个人信息"
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <Pressable style={styles.item}>
          <Text style={styles.textLeft}>头像</Text>
          <View style={styles.itemRight}>
            <Avatar
              rounded
              size={24}
              source={{
                uri: userInfo.headPor,
              }}
            />
            <IconPark
              iconPark={Right({
                theme: 'outline',
                fill: colors['gray']['400'],
              })}
              size={colors['fontSize']['400']}
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate(ME_SETTING_PERSONALINFOCHANGENAME);
          }}>
          <Text style={styles.textLeft}>昵称</Text>
          <View style={styles.itemRight}>
            <Text style={styles.textRight}>{userInfo.name}</Text>
            <IconPark
              iconPark={Right({
                theme: 'outline',
                fill: colors['gray']['400'],
              })}
              size={colors['fontSize']['400']}
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </Pressable>

        <Pressable
          style={styles.item}
          onPress={() => {
            selectSex(true);
          }}>
          <Text style={styles.textLeft}>性别</Text>
          <View style={styles.itemRight}>
            <Text style={styles.textRight}>
              {userInfo.sex === 0 ? '请选择' : userInfo.sex === 1 ? '男' : '女'}
            </Text>
            <IconPark
              iconPark={Right({
                theme: 'outline',
                fill: colors['gray']['400'],
              })}
              size={colors['fontSize']['400']}
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </Pressable>

        <Dialog
          isShow={Sex}
          onBackPress={() => {
            selectSex(false);
          }}
          style={{ width: DEVICE_WIDTH, backgroundColor: colors.gray[100] }}
          position="bottom">
          <View style={{ display: 'flex' }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                onPress={() => {
                  changeUserInfo({ id: userInfo.id, sex: 0 });
                  selectSex(false);
                }}>
                取消
              </Text>
              <Text
                style={{
                  fontSize: colors.fontSize[400],
                  color: colors.font[300],
                }}>
                选择性别
              </Text>
              <Text
                onPress={() => {
                  selectSex(false);
                }}>
                确定
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  changeUserInfo({ sex: 1, id: userInfo.id })
                    .then(res => {
                      dispatch(setUserInfoState({ sex: 1 }));
                      useToast('修改成功');
                      selectSex(false);
                    })
                    .catch(err => {
                      useToast('修改失败，请稍后重试');
                    });
                }}
                style={
                  userInfo.sex == 1
                    ? { backgroundColor: colors.gray[100], width: 60 }
                    : { width: 60 }
                }>
                <Text
                  style={{
                    color: colors.font[200],
                    padding: 4,
                    textAlign: 'center',
                  }}>
                  男
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  changeUserInfo({ sex: 2, id: userInfo.id })
                    .then(res => {
                      dispatch(setUserInfoState({ sex: 2 }));
                      useToast('修改成功');
                      selectSex(false);
                    })
                    .catch(err => {
                      useToast('修改失败，请稍后重试');
                    });
                }}
                style={
                  userInfo.sex == 2
                    ? {
                        backgroundColor: colors.gray[100],
                        width: 100,
                      }
                    : { width: 100 }
                }>
                <Text
                  id="girl"
                  style={{
                    color: colors.font[200],
                    padding: 4,
                    textAlign: 'center',
                  }}>
                  女
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Dialog>

        <Pressable
          style={styles.item}
          onPress={() => {
            selectDate(true);
          }}>
          <Text style={styles.textLeft}>生日</Text>
          <View style={styles.itemRight}>
            <Text style={styles.textRight}>{userInfo.birthday}</Text>
            <IconPark
              iconPark={Right({
                theme: 'outline',
                fill: colors['gray']['400'],
              })}
              size={colors['fontSize']['400']}
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </Pressable>

        <DatePicker
          isShow={Date}
          onBackPress={() => {
            selectDate(false);
          }}
          onConfirmPress={data => {
            // console.log(data);
            const reg = /[0-9]+/g;
            let arr = data.match(reg);
            let str = arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + '00:00:00';
            console.log(str);
            changeUserInfo({ birthday: str, id: userInfo.id })
              .then(res => {
                dispatch(setUserInfoState({ birthday: str }));
                useToast('修改成功');
                console.log('修改成功');
                selectDate(false);
              })
              .catch(err => {
                useToast('修改失败，请稍后重试');
                console.log(err);
              });
          }}
        />

        <Pressable
          style={styles.item}
          onPress={() => {
            navigation.navigate(ME_SETTING_PERSONALINFOCHANGEINTRODUCE);
          }}>
          <Text style={styles.textLeft}>简介</Text>
          <View style={styles.itemRight}>
            <Text
              style={styles.textRight}
              numberOfLines={1}>
              {userInfo.introduction || '暂无简介'}
            </Text>
            <IconPark
              iconPark={Right({
                theme: 'outline',
                fill: colors['gray']['400'],
              })}
              size={colors['fontSize']['400']}
              style={{
                marginLeft: 5,
              }}
            />
          </View>
        </Pressable>

        <Pressable style={styles.item}>
          <Text style={styles.textLeft}>注册时间</Text>
          <View style={styles.itemRight}>
            <Text style={styles.textRight}>{userInfo.registerDay}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'iconfont',
    color: colors['gray']['400'],
    fontSize: colors['fontSize']['400'],
  },
  textLeft: {
    color: colors['font']['300'],
    fontSize: colors['fontSize']['400'],
  },
  textRight: {
    fontSize: colors['fontSize']['300'],
    color: colors['gray']['400'],
    marginRight: 5,
  },
});

export default defaultComponentHOC(MeSettingPersonalInfo);
