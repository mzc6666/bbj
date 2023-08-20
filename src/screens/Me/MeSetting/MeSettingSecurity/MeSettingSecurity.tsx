/*
 * @Description:  账号与安全 Screen
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-17 10:50:55
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-11 19:07:14
 */
import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import TitleHeader from '@/components/TitleHeader';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '@/config/modules/global';
import colors from '@/assets/color';
import {
  ME_SETTING_SECURITYSETPASS,
  ME_SETTING_SHOPPINGADDRESS,
} from '@/navigation/navigationNames';
import { defaultComponentHOC } from '@/utils/hoc';
import IconPark from '@/components/IconPark';
import { Right } from '@icon-park/svg';
import ActionDialog from '@/components/ActionDialog/ActionDialog';
import { useAsyncState, useToast } from '@/utils/hooks';
import { useDispatch } from 'react-redux';
import { signout } from '@/store/modules/login';

const MeSettingSecurity = ({ navigation, route }: any) => {
  const [showDialog, setShowDialog] = useAsyncState(false);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        height: DEVICE_HEIGHT,
        backgroundColor: colors.gray[100],
      }}>
      <TitleHeader
        title="账号与安全"
        headerLeftPress={() => {
          navigation.goBack();
        }}
        headerRight={() => {}}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.group}>
          <TouchableOpacity style={[styles.item, styles.lineItem]}>
            <Text style={styles.textLeft}>手机号</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textRight}>未设置</Text>
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors['font']['200'],
                })}
                size={colors['fontSize']['400']}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate(ME_SETTING_SECURITYSETPASS);
            }}>
            <Text style={styles.textLeft}>登陆密码</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textRight}>未设置</Text>
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors['font']['200'],
                })}
                size={colors['fontSize']['400']}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <TouchableOpacity style={[styles.item, styles.lineItem]}>
            <Text style={styles.textLeft}>微信账号</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textRight}>未绑定</Text>
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors['font']['200'],
                })}
                size={colors['fontSize']['400']}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.textLeft}>QQ账号</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textRight}>未设置</Text>
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors['font']['200'],
                })}
                size={colors['fontSize']['400']}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate(ME_SETTING_SHOPPINGADDRESS);
            }}>
            <Text style={styles.textLeft}>收货地址</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors['font']['200'],
                })}
                size={colors['fontSize']['400']}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.group}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setShowDialog(true);
            }}>
            <Text style={styles.textLeft}>注销账号</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <IconPark
                iconPark={Right({
                  theme: 'outline',
                  fill: colors['font']['200'],
                })}
                size={colors['fontSize']['400']}
              />
            </View>
          </TouchableOpacity>
        </View>
        <ActionDialog
          isShow={showDialog}
          cancel={() => {
            setShowDialog(false);
          }}
          comfirm={() => {
            useToast('注销成功');
            dispatch(signout());
          }}>
          <Text>确定注销吗，此操作不能撤销</Text>
        </ActionDialog>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 8,
    backgroundColor: colors.gray[0],
  },
  item: {
    marginHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineItem: {
    borderBottomColor: colors['gray']['100'],
    borderBottomWidth: 1,
  },
  textLeft: {
    color: '#000',
    fontSize: colors['fontSize']['300'],
  },
  textRight: {
    color: colors['font']['200'],
    fontSize: colors['fontSize']['300'],
    marginRight: 5,
  },
  icon: {
    fontFamily: 'iconfont',
    color: colors['font']['200'],
    fontSize: colors['fontSize']['400'],
  },
});
export default defaultComponentHOC(MeSettingSecurity);
