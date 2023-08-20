/*
 * @Description: 个人中心
 * @Version:
 * @Autor: Ban
 * @Date: 2022-07-03 21:09:15
 * @LastEditors: Xu
 * @LastEditTime: 2023-04-14 23:55:28
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Dialog from '@/components/Dialog/Dialog';
import IconPark from '@/components/IconPark';
import { Right } from '@icon-park/svg';
import { Avatar } from '@/plugins/elementUI';
import { useState } from 'react';
import {
  ME_SETTING_PERSONALINFO,
  ME_SETTING_SECURITY,
} from '@/navigation/navigationNames';
import TitleHeader from '@/components/TitleHeader';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '@/store/modules/user';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import colors from '@/assets/color';
import Button from '@/components/Button';
import { defaultComponentHOC } from '@/utils/hoc';
import { signout } from '@/store/modules/login';
import { persistor } from '@/store/configureStore';
import { useToast } from '@/utils/hooks';

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

const MeSetting = ({ navigation, route }) => {
  const userInfo = useSelector(selectUserInfo);

  const [quit, setQuit] = useState(false);
  

  const dispatch = useDispatch();

  return (
    <>
      <View
        style={{ height: DEVICE_HEIGHT, backgroundColor: colors.gray[100] }}>
        <TitleHeader
          style={{
            marginBottom: 10,
          }}
          headerLeftPress={() => {
            navigation.goBack();
          }}
          headerRight={() => {}}
          title="设置"
        />
        <TouchableOpacity style={[styles.group]}>
          <Pressable
            style={styles.item}
            onPress={() => {
              navigation.navigate(ME_SETTING_PERSONALINFO);
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Avatar
                rounded
                size={36}
                source={{
                  uri: userInfo.headPor,
                }}
              />
              <View
                style={{
                  marginLeft: (16 / 390) * DEVICE_WIDTH,
                }}>
                <Text
                  style={[
                    styles.itemText,
                    {
                      fontSize: 16,
                    },
                  ]}>
                  {userInfo.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors['font']['100'],
                    paddingTop: 2,
                  }}>
                  UID: {userInfo.id}
                </Text>
              </View>
            </View>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity style={styles.group}>
          <Pressable
            style={[styles.item, styles.lineItem]}
            onPress={() => {
              navigation.navigate(ME_SETTING_SECURITY);
            }}>
            <Text style={styles.itemText}>账号与安全</Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.itemText}>隐私设置</Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity style={styles.group}>
          <Pressable style={[styles.item, styles.lineItem]}>
            <Text style={styles.itemText}>通知设置</Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.itemText}>通用设置</Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
        </TouchableOpacity>

        <TouchableOpacity style={styles.group}>
          <Pressable style={[styles.item, styles.lineItem]}>
            <Text style={styles.itemText}>帮助与反馈</Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
          <Pressable style={styles.item}>
            <Text style={styles.itemText}>关于我们</Text>
            <IconPark
              iconPark={Right({ theme: 'outline', fill: colors.font[200] })}
              size={colors['fontSize']['400']}
            />
          </Pressable>
        </TouchableOpacity>

        <Button
          title="退出登录"
          onPress={() => {
            setQuit(true);
          }}
          style={{
            marginHorizontal: (10 / 390) * DEVICE_WIDTH,
          }}
        />
      </View>
      <Dialog
        isShow={quit}
        onBackPress={() => {
          setQuit(false);
        }}
        style={{ alignItems: 'center', borderRadius: 10 }}>
        <Text
          style={[
            styles.modalText,
            { paddingTop: 10, paddingBottom: 11, fontWeight: 'bold' },
          ]}>
          提示
        </Text>
        <Text style={[styles.modalText, { paddingBottom: 18 }]}>
          确定退出登录?
        </Text>
        <View
          style={{
            width: (300 / 390) * DEVICE_WIDTH,
            flexDirection: 'row',
            borderTopColor: colors['gray']['200'],
            borderTopWidth: 1,
          }}>
          <Text
            style={[
              styles.modalText,
              { flex: 1, paddingTop: 16, paddingBottom: 6 },
            ]}
            onPress={() => {
              setQuit(false);
            }}>
            取消
          </Text>
          <Text
            style={[
              styles.modalText,
              { flex: 1, paddingTop: 16, paddingBottom: 6 },
            ]}
            onPress={() => {
              setQuit(false);
              persistor
                .purge()
                .then(res => {
                  useToast('成功退出');
                  dispatch(signout());
                })
                .catch(err => {
                  useToast('遇到某些错误');
                });
            }}>
            确定
          </Text>
        </View>
      </Dialog>
    </>
  );
};

const styles = StyleSheet.create({
  group: {
    marginBottom: 20,
    marginHorizontal: 10,
    backgroundColor: colors.gray[0],
    borderRadius: 8,
  },
  icon: {
    fontFamily: 'iconfont',
    fontSize: colors['fontSize']['400'],
    color: colors['font']['200'],
  },
  item: {
    marginHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineItem: {
    borderBottomColor: colors['gray']['100'],
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: colors['fontSize']['300'],
    color: colors['font']['300'],
  },
  modalContainer: {
    width: (330 / 390) * DEVICE_WIDTH,
    alignItems: 'center',
  },
  modalText: {
    color: colors['font']['300'],
    fontSize: colors['fontSize']['400'],
    textAlign: 'center',
  },
});

export default defaultComponentHOC(MeSetting);
