/*
 * @Description: 修改昵称
 * @Version:
 * @Autor: mzc
 * @Date: 2022-08-17 16:33:58
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-15 12:44:46
 */
import colors from '@/assets/color';
import Input from '@/components/Input';
import TitleHeader from '@/components/TitleHeader';
import { DEVICE_WIDTH } from '@/config/modules/global';
import { selectUserInfo, setUserInfoState } from '@/store/modules/user';
import { defaultComponentHOC } from '@/utils/hoc';
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInfo } from '@/network/api/user';
import { ME_SETTING_PERSONALINFO } from '@/navigation/navigationNames';
import { useToast } from '@/utils/hooks';

/**
 * @description: 修改昵称 screen
 * @param {object} navigation 导航器
 * @param {object} route 路由对象
 * @return {*}
 * @author: mzc
 */
const MeSettingPersonInfoChange = ({ navigation, route }) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  console.log(userInfo);

  const [val, setVal] = useState(userInfo.name);
  const inputRef = useRef(null); // inputRef

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Pressable
      onPress={() => {
        inputRef.current.blur();
      }}
      style={{
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <TitleHeader
        title="修改昵称"
        headerRight={() => {}}
        headerLeftPress={() => {
          navigation.goBack();
        }}
        navigation={navigation}
        headerRight={navigation => (
          <Text
            style={styles.accomplish}
            onPress={() => {
              changeUserInfo({ name: val, id: userInfo.id })
                .then(res => {
                  useToast('修改成功');
                  dispatch(setUserInfoState({ name: val }));
                  navigation.goBack();
                })
                .catch(err => {
                  console.log(
                    'MeSettingPersonInfoChangeName changeUserInfo err',
                    err,
                  );
                });
            }}>
            完成
          </Text>
        )}
      />

      <View style={styles.container}>
        <Input
          value={[val, setVal]}
          ref={inputRef}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  accomplish: {
    color: colors['font']['200'],
    fontSize: colors['fontSize']['400'],
    marginRight: 10,
  },
  container: {
    paddingHorizontal: (30 / 390) * DEVICE_WIDTH,
    paddingTop: (30 / 390) * DEVICE_WIDTH,
  },
});

export default defaultComponentHOC(MeSettingPersonInfoChange);
