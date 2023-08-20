/*
 * @Description:家庭-邀请
 * @Version:
 * @Autor: makka-pakka
 * @Date: 2022-07-26 16:08:40
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:23:30
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ToastAndroid,
  Platform,
} from 'react-native';
import Input from '@/components/Input';
import colors from '@/assets/color';
import SelectDialog from '@/components/SelectDialog';
import { canAddIdentity } from '@/network/api/family';
import { ScrollView } from 'react-native-gesture-handler';
import { useAsyncState, useToast } from '@/utils/hooks';
import { familyInvite } from '@/network/api/family';
import TitleHeader from '@/components/TitleHeader';
import { defaultComponentHOC, defaultScreenHOC } from '@/utils/hoc';

const HomeFamilyInviteContent = ({ close }: any) => {
  const inputRef = React.createRef(); // inputRef
  const [inputData, setInputData] = useState(''); //输入框数据
  const [dialog, setDialog] = useState(false); //设置弹出框状态
  const [name, setName] = useState({ name: '请选择' }); //选中的数据

  /**
   * @description: 验证手机号格式
   * @param {*} telephone
   * @return {*}
   * @author: Ban
   */
  const isTelephoneStyle = (telephone: string) => {
    const len = 11;
    const telRegexp = /^1(([3,5,8,6]\d{9})|(4[5,7]\d{8})|(7[0,6-8]\d{8}))$/;
    return telephone.length === len && telRegexp.test(telephone);
  };

  /**
   * @description: 提交
   * @return {*}
   * @author: Ban
   */
  const submit = () => {
    if (!isTelephoneStyle(inputData)) {
      useToast('请输入正确的手机号码');
    } else if (name.name == '请选择') {
      useToast('请选择正确的身份');
    } else {
      familyInvite(inputData, name.id)
        .then(res => {
          close();
          useToast('邀请成功');
        })
        .catch(err => {
          useToast('出现了某些错误，请稍后重试');
        });
    }
  };

  const [dataArr, setDataArr] = useAsyncState([]);
  useEffect(() => {
    canAddIdentity()
      .then(res => {
        // console.log(res);

        let arr = [...dataArr];
        res.data.forEach((data: any) => {
          arr.push({ ...data });
        });
        setDataArr(arr);
      })
      .catch(err => {
        console.log(err);
      });
  }); //可邀请用户

  return (
    <>
      <TitleHeader
        headerRightPress={submit}
        title={'邀请'}
        headerLeftPress={() => {
          close();
        }}></TitleHeader>
      <View style={styles.container}>
        <View style={styles.register}>
          <Text style={styles.phoneNumber}>注册手机号:</Text>
          <View style={styles.inputContainer}>
            <Input
              placeholder="请输入手机号码"
              maxLength={11}
              value={[inputData, setInputData]}
              ref={inputRef}
              isClear={true}
              keyboardType="numeric"
              verifyText={isTelephoneStyle}
            />
          </View>
        </View>
        <View style={styles.identity}>
          <Text style={styles.homeIdentity}>家庭身份:</Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              borderBottomColor: colors.gray[100],
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setDialog(true);
              }}>
              <Text
                style={{
                  color: colors.font[200],
                }}>
                {name.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'iconfont',
                  fontSize: colors.fontSize[400],
                  color: colors.font[200],
                  marginLeft: 5,
                }}>
                {'\ue65f'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {dialog && (
        <SelectDialog
          isShow={dialog}
          data={dataArr}
          keyExtractor={item => item.id}
          renderItem={item => {
            return item.name;
          }}
          onConfirmPress={item => {
            console.log(item);
            setName({ ...item });
          }}
          onBackPress={() => {
            setDialog(false);
          }}
        />
      )}
    </>
  );
};
export default defaultScreenHOC(HomeFamilyInviteContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  register: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  phoneNumber: {
    fontSize: colors.fontSize[300],
    color: colors.font[300],
    width: 100,
  },
  inputContainer: {
    flex: 1,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  homeIdentity: {
    color: colors.font[300],
    fontSize: colors.fontSize[300],
    width: 100,
  },
  selectedView: {
    backgroundColor: '#FB718550',
  },
  selectedText: {
    color: colors.rose[400],
  },
});
