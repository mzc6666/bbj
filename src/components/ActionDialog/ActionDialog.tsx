import colors from '@/assets/color';
import { DEVICE_WIDTH } from '@/config/modules/global';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dialog from '../Dialog/Dialog';
// import Button from '../Button';

interface Props {
  isShow: boolean;
  cancelText?: string;
  comfirmText?: string;
  cancel?: () => void;
  comfirm?: () => void;
  children?: any;
  onBackPress?: () => void;
}

/**
 * @description:
 * @return {*}
 * @author: Ban
 */

/**
 * 提供确定和取消按钮的消息对话框
 * @date 2023-03-06
 * @returns {any}
 */
const ActionDialog = ({
  isShow,
  children,
  onBackPress = () => {},
  cancelText = '取消',
  comfirmText = '确定',
  cancel = () => {},
  comfirm = () => {},
}: Props) => {
  return (
    <Dialog
      isShow={isShow}
      onBackPress={() => {
        onBackPress();
      }}
      style={{
        borderRadius: 8,
      }}>
      <View
        style={{
          minWidth: DEVICE_WIDTH / 3,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: colors.fontSize[400],
            color: colors.font[300],
            fontWeight: '600',
            marginBottom: 5,
          }}>
          提示
        </Text>
        {children}
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderColor: colors.gray[200],
            paddingTop: 8,
            marginTop: 10,
          }}>
          <Text
            onPress={() => {
              cancel();
            }}
            style={{
              color: colors.font[200],
              fontSize: colors.fontSize[400],
              flex: 1,
              textAlign: 'center',
              borderRightWidth: 1,
              borderColor: colors.gray[200],
            }}>
            {cancelText}
          </Text>
          <Text
            onPress={() => {
              comfirm();
            }}
            style={{
              flex: 1,
              color: colors.rose[400],
              fontSize: colors.fontSize[400],
              textAlign: 'center',
            }}>
            {comfirmText}
          </Text>
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({});

export default ActionDialog;
