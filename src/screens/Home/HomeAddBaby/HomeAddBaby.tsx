import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { defaultComponentHOC } from '@/utils/hoc';
import TitleHeader from '@/components/TitleHeader';
import Avatar from '@/components/Avatar/Avatar';
import colors from '@/assets/color';
import { useAsyncState } from '@/utils/hooks';
import Input from '@/components/Input';
import { NavigationHelpers } from '@react-navigation/native';
import Dialog from '@/components/Dialog/Dialog';
import SelectDialog from '@/components/SelectDialog';
import DatePicker from '../HomeVaccinationDetails/components/DatePicker';
import { addBaby } from '@/network/api/family';
import { useSelector } from 'react-redux';
import { selectFamilyInfo } from '@/store/modules/family';

interface Props {
  navigation: NavigationHelpers<any>;
}

/**
 * @description: 家庭添加宝宝
 * @return {*}
 * @author: Ban
 */

const HomeAddBaby = ({ navigation }: Props) => {
  const [avatar, setAvatar] = useAsyncState(undefined);
  const [name, setName] = useAsyncState('');
  const [showSexDialog, setShowSexDialog] = useAsyncState(false);
  const [sex, setSex] = useAsyncState('');
  const [birthday, setBirthday] = useAsyncState('请选择');
  const [showBirthdayDialog, setShowBirthdayDialog] = useAsyncState(false);
  const familyInfo = useSelector(selectFamilyInfo);

  const confirm = () => {
    addBaby(name, new Date(birthday).getTime(), sex, familyInfo.id, avatar)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        backgroundColor: colors.gray[100],
      }}>
      <TitleHeader
        title="添加宝宝"
        onBackPress={() => {
          navigation.goBack();
        }}
        headerRightPress={() => {
          confirm();
        }}
      />
      <View style={styles.item}>
        <Text style={styles.rightText}>头像</Text>
        <Avatar
          changeAvatar={true}
          size={64}
          img={avatar}
          onChangeImg={newImg => {
            setAvatar(newImg);
          }}
          round={true}></Avatar>
      </View>
      <View style={styles.item}>
        <Text style={styles.rightText}>姓名</Text>
        <Input value={[name, setName]} />
      </View>
      <Pressable
        style={styles.item}
        onPress={() => {
          setShowSexDialog(true);
        }}>
        <Text style={styles.rightText}>性别</Text>
        <Text>{sex ? (sex == 1 ? '男' : '女') : '请选择'}</Text>
      </Pressable>
      <Pressable
        style={styles.item}
        onPress={() => {
          setShowBirthdayDialog(true);
        }}>
        <Text style={styles.rightText}>生日</Text>
        <Text>{birthday}</Text>
      </Pressable>
      <SelectDialog
        isShow={showSexDialog}
        onConfirmPress={(data: any) => {
          if (data == '男孩') setSex(1);
          else setSex(2);
        }}
        data={['男孩', '女孩']}
        renderItem={(item: any) => {
          return <Text>{item}</Text>;
        }}
        onBackPress={() => {
          setShowSexDialog(false);
        }}></SelectDialog>
      <DatePicker
        isShow={showBirthdayDialog}
        onConfirmPress={data => {
          setBirthday(data);
          setShowBirthdayDialog(false);
        }}
        onBackPress={() => {
          setShowBirthdayDialog(false);
        }}></DatePicker>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: colors.gray[0],
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  rightText: {
    color: colors.font[300],
    width: 100,
  },
});

export default defaultComponentHOC(HomeAddBaby);
